import { EnvType } from './config/env';
import { jstack } from 'jstack';

interface Env {
  Bindings: EnvType;
}

export const j = jstack.init<Env>();

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const publicProcedure = j.procedure;
