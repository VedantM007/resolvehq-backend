import type { Request, Response, NextFunction } from 'express';
import type { Auth0Identity } from '../types/auth.types.js';

export const extractAuth0Identity = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const payload = req.auth?.payload;

  if (!payload || typeof payload.iss !== 'string' || typeof payload.sub !== 'string') {  //early return if payload is missing or invalid
    res.status(401).json({
      success: false,
      message: 'Invalid authentication identity'
    });
    return;
  }

  const identity: Auth0Identity = {
    issuer: payload.iss,
    subject: payload.sub
  };

  if (typeof payload.email === 'string') {
    identity.email = payload.email;
  }

  if (typeof payload.email_verified === 'boolean') {
    identity.emailVerified = payload.email_verified;
  }

  res.locals.auth0Identity = identity;

  next();
};