import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/jwt';
import { UserRole } from '@prisma/client';

const baseSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  fullName: z.string().min(2, 'Full name is required'),
  phoneNumber: z.string().optional(),
  role: z.nativeEnum(UserRole),
});

const clinicOwnerSchema = baseSchema.extend({
  role: z.literal(UserRole.CLINIC_OWNER),
  clinicName: z.string().min(2, 'Clinic name is required'),
  physicalAddress: z.string().min(5, 'Physical address is required'),
  provincialDistrict: z.string().min(2, 'Provincial district is required'),
  registrationNumber: z
    .string()
    .min(3, 'Clinic registration number is required')
    .regex(/^[A-Z0-9-/]+$/, 'Registration number must contain only uppercase letters, numbers, hyphens, and slashes'),
  primaryContact: z.string().optional(),
});

const practitionerSchema = baseSchema.extend({
  role: z.enum([UserRole.DOCTOR, UserRole.NURSE]),
  medicalLicenseNumber: z
    .string()
    .regex(/^[A-Z]{2}-\d{6}$/, 'License number must be format XX-123456 (e.g. ML-123456)'),
  specialization: z.string().optional(),
  clinicId: z.string().min(1, 'You must select a clinic'),
});

const patientSchema = baseSchema.extend({
  role: z.literal(UserRole.PATIENT),
  nationalIdNumber: z
    .string()
    .regex(/^\d{6}-\d{2}-\d{4}[A-Z]$/, 'National ID must be format 123456-12-1234X')
    .optional()
    .or(z.literal('')),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be YYYY-MM-DD'),
  gender: z.enum(['male', 'female', 'other']).optional(),
  emergencyContact: z.string().optional(),
});

const adminSchema = baseSchema.extend({
  role: z.literal(UserRole.ADMIN),
  adminKey: z.string().min(1, 'Admin setup key is required'),
});

const registerSchema = z.discriminatedUnion('role', [
  clinicOwnerSchema,
  practitionerSchema,
  patientSchema,
  adminSchema,
]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      return NextResponse.json(
        { error: firstError?.message || 'Validation failed' },
        { status: 400 },
      );
    }

    const data = parsed.data;

    if (data.role === UserRole.ADMIN) {
      const adminSetupKey = process.env.ADMIN_SETUP_KEY || 'ADMIN-SETUP-2024';
      if (data.adminKey !== adminSetupKey) {
        return NextResponse.json(
          { error: 'Invalid admin setup key. Contact your system administrator.' },
          { status: 403 },
        );
      }
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase().trim() },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 },
      );
    }

    if (data.role === UserRole.CLINIC_OWNER) {
      const existingClinic = await prisma.clinic.findUnique({
        where: { registrationNumber: data.registrationNumber },
      });
      if (existingClinic) {
        return NextResponse.json(
          { error: 'A clinic with this registration number already exists.' },
          { status: 409 },
        );
      }
    }

    if (data.role === UserRole.DOCTOR || data.role === UserRole.NURSE) {
      const existingLicense = await prisma.practitionerProfile.findUnique({
        where: { medicalLicenseNumber: data.medicalLicenseNumber },
      });
      if (existingLicense) {
        return NextResponse.json(
          { error: 'This medical license number is already registered.' },
          { status: 409 },
        );
      }

      const clinic = await prisma.clinic.findUnique({
        where: { id: data.clinicId },
      });
      if (!clinic) {
        return NextResponse.json(
          { error: 'Selected clinic not found. Please select an existing clinic.' },
          { status: 404 },
        );
      }
    }

    if (data.role === UserRole.PATIENT && data.nationalIdNumber) {
      const existingNationalId = await prisma.patientProfile.findUnique({
        where: { nationalIdNumber: data.nationalIdNumber },
      });
      if (existingNationalId) {
        return NextResponse.json(
          { error: 'This National ID number is already registered.' },
          { status: 409 },
        );
      }
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await prisma.$transaction(async (tx) => {
      let clinicId: string | null = null;

      if (data.role === UserRole.CLINIC_OWNER) {
        const clinic = await tx.clinic.create({
          data: {
            clinicName: data.clinicName,
            physicalAddress: data.physicalAddress,
            provincialDistrict: data.provincialDistrict,
            registrationNumber: data.registrationNumber,
            primaryContact: data.primaryContact || data.phoneNumber,
          },
        });
        clinicId = clinic.id;
      } else if (data.role === UserRole.DOCTOR || data.role === UserRole.NURSE) {
        clinicId = data.clinicId;
      }

      const newUser = await tx.user.create({
        data: {
          email: data.email.toLowerCase().trim(),
          passwordHash,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber || null,
          role: data.role,
          clinicId,
        },
      });

      if (data.role === UserRole.DOCTOR || data.role === UserRole.NURSE) {
        await tx.practitionerProfile.create({
          data: {
            userId: newUser.id,
            medicalLicenseNumber: data.medicalLicenseNumber,
            specialization: data.specialization || null,
            activeStatus: 'PENDING',
            clinicId,
          },
        });
      }

      if (data.role === UserRole.PATIENT) {
        await tx.patientProfile.create({
          data: {
            userId: newUser.id,
            nationalIdNumber: data.nationalIdNumber || null,
            dateOfBirth: new Date(data.dateOfBirth),
            gender: data.gender || null,
            emergencyContact: data.emergencyContact || null,
          },
        });
      }

      return newUser;
    });

    await createSession(user.id, user.role, user.clinicId);

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          clinicId: user.clinicId,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during registration.' },
      { status: 500 },
    );
  }
}
