import type { Auth0Identity } from './auth.types.js';
import type { ResolveHQUser } from './user.types.js';

declare global {
  namespace Express {
    interface Locals {
      auth0Identity?: Auth0Identity;
      currentUser?: ResolveHQUser;
    }
  }
}

export {};