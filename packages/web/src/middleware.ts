import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from '@/lib/jwt';

const roleHomepages: Record<string, string> = {
  ADMIN: '/dashboard',
  CLINIC_OWNER: '/dashboard',
  DOCTOR: '/dashboard',
  NURSE: '/dashboard',
  PATIENT: '/dashboard',
};

const roleRestrictedPaths: { prefix: string; allowedRoles: string[] }[] = [
  { prefix: '/admin', allowedRoles: ['ADMIN'] },
  { prefix: '/patients', allowedRoles: ['ADMIN', 'CLINIC_OWNER', 'DOCTOR', 'NURSE'] },
  { prefix: '/pharmacy', allowedRoles: ['ADMIN', 'CLINIC_OWNER', 'DOCTOR'] },
  { prefix: '/laboratory', allowedRoles: ['ADMIN', 'CLINIC_OWNER', 'DOCTOR', 'NURSE'] },
  { prefix: '/appointments', allowedRoles: ['ADMIN', 'CLINIC_OWNER', 'DOCTOR', 'NURSE', 'PATIENT'] },
  { prefix: '/analytics', allowedRoles: ['ADMIN', 'CLINIC_OWNER'] },
];

const publicPaths = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = publicPaths.some((p) => pathname.startsWith(p));
  const isStatic =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname === '/';

  if (isPublic || isStatic) {
    return NextResponse.next();
  }

  const session = await verifySession();

  if (!session) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  for (const rule of roleRestrictedPaths) {
    if (pathname.startsWith(rule.prefix) && !rule.allowedRoles.includes(session.role)) {
      const home = roleHomepages[session.role] || '/dashboard';
      return NextResponse.redirect(new URL(home, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
