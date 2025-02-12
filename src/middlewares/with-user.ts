import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { env } from '@/env';

import { MiddlewareFactory } from './middleware-factory';

export const auth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const token = await getToken({
      req: request,
      secret: env.NEXTAUTH_SECRET,
    });
    const protectedRoutes = ['/home'];
    const authRoutes = ['/entrar', '/cadastrar', '/'];
    const isProtectedRoute = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    );

    const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

    if (!token && isProtectedRoute) {
      const absoluteURL = new URL('/nao-autorizado', request.nextUrl.origin);
      return NextResponse.rewrite(absoluteURL.toString());
    }
    if (token && isAuthRoute) {
      const absoluteURL = new URL('/dashboard', request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
    return next(request, _next);
  };
};
