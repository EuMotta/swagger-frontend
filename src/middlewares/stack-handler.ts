import { NextMiddleware, NextResponse } from 'next/server';

import { MiddlewareFactory } from './middleware-factory';

/**
 * @function stackMiddlewares
 * @summary Função para juntar e encadear múltiplos middlewares no Next.js
 *
 * Esta função permite combinar uma lista de middlewares em uma única cadeia, executando-os na ordem fornecida.
 *
 * @param {MiddlewareFactory[]} functions - Array de funções do tipo `MiddlewareFactory` a serem encadeadas.
 * @param {number} [index=0] - Índice atual do middleware a ser executado (utilizado para recursão interna).
 * @returns {NextMiddleware} - Middleware combinado que executa cada função na sequência.
 */

export function stackMiddlewares(
  functions: MiddlewareFactory[] = [],
  index = 0,
): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}
