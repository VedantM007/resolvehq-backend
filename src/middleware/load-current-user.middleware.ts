import type { Request, Response, NextFunction } from 'express';

import { pool } from '../config/database.js';
import type { ResolveHQUser } from '../types/user.types.js';

export const loadCurrentUser = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const identity = res.locals.auth0Identity;

    if (!identity) {
      res.status(401).json({
        success: false,
        message: 'Authentication identity not found'
      });
      return;
    }

    const result = await pool.query<ResolveHQUser>(
      `
        SELECT
          u.id,
          u.first_name AS "firstName",
          u.last_name AS "lastName",
          u.email,
          r.name AS role,
          u.profile_picture_key AS "profilePictureKey",
          u.is_active AS "isActive"
        FROM users u
        INNER JOIN roles r ON r.id = u.role_id
        WHERE
          u.auth0_issuer = $1
          AND u.auth0_subject = $2
        LIMIT 1
      `,
      [identity.issuer, identity.subject]
    );

    const user = result.rows[0];

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'ResolveHQ user account not found'
      });
      return;
    }

    if (!user.isActive) {
      res.status(403).json({
        success: false,
        message: 'Your ResolveHQ account is inactive'
      });
      return;
    }

    res.locals.currentUser = user;

    next();
  } catch (error) {
    next(error);
  }
};