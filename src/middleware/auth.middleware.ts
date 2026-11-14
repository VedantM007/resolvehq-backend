import { auth } from 'express-oauth2-jwt-bearer';
import { env } from '../config/env.js';

export const validateAccessToken = auth({
  issuerBaseURL: `https://${env.AUTH0_DOMAIN}`,
  audience: env.AUTH0_AUDIENCE
});