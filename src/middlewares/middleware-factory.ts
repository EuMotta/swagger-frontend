import { NextMiddleware } from 'next/server';

/**
 * @function MiddlewareFactory
 * @summary Tipo utilitário para criar e encadear middlewares no Next.js
 *
 * Este tipo define uma função que recebe um middleware e retorna um novo middleware, permitindo a composição de middlewares em cadeia.
 *
 * @param {NextMiddleware} middleware - Middleware a ser envolvido ou modificado.
 * @returns {NextMiddleware} - Retorna um novo middleware aprimorado ou encadeado.
 */

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;
