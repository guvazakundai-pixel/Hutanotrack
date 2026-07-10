import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';

  const clinics = await prisma.clinic.findMany({
    where: query
      ? {
          OR: [
            { clinicName: { contains: query, mode: 'insensitive' } },
            { provincialDistrict: { contains: query, mode: 'insensitive' } },
            { registrationNumber: { contains: query, mode: 'insensitive' } },
          ],
        }
      : undefined,
    select: {
      id: true,
      clinicName: true,
      physicalAddress: true,
      provincialDistrict: true,
      registrationNumber: true,
    },
    orderBy: { clinicName: 'asc' },
    take: 50,
  });

  return NextResponse.json({ clinics });
}
