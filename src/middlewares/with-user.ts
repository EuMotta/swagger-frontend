import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { env } from '@/env';

import { MiddlewareFactory } from './middleware-factory';

/**
 * @function auth
 * @summary Middleware para gerenciar a autenticação de rotas protegidas e públicas no Next.js
 *
 * Este middleware verifica se o usuário possui um token válido para acessar rotas protegidas.
 * - Redireciona usuários não autenticados para "/nao-autorizado" em rotas protegidas.
 * - Redireciona usuários autenticados para "/dashboard" em rotas de autenticação.
 *
 * @param {NextMiddleware} next - Próximo middleware na cadeia.
 * @returns {NextMiddleware} - Middleware de autenticação.
 */

export const auth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const token = await getToken({
      req: request,
      secret: env.NEXTAUTH_SECRET,
    });

    const protectedRoutes = ['/users'];
    const authRoutes = ['/entrar', '/cadastrar', '/'];
    const isProtectedRoute = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    );

    const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

    if (!token && isProtectedRoute) {
      const absoluteURL = new URL('/unauthorized', request.nextUrl.origin);
      return NextResponse.rewrite(absoluteURL.toString());
    }

    if (token && isAuthRoute) {
      const absoluteURL = new URL('/users', request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }

    return next(request, _next);
  };
};
