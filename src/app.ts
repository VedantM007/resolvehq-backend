import express from 'express';
import { pool } from './config/database.js';
import { validateAccessToken } from './middleware/auth.middleware.js';
import { extractAuth0Identity } from './middleware/auth-identity.middleware.js';
import { loadCurrentUser } from './middleware/load-current-user.middleware.js';
const app = express();

// Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/v1/health', async (_req, res) => {
  try {
    // Verify database connectivity
    await pool.query('SELECT 1');

    return res.status(200).json({
      success: true,
      data: {
        application: 'healthy',
        database: 'healthy'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check failed:', error);

    return res.status(503).json({
      success: false,
      data: {
        application: 'healthy',
        database: 'unavailable'
      },
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/api/v1/auth/test', validateAccessToken, (_req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Access token validated successfully'
  });
});

// Protected endpoint - requires an existing active ResolveHQ user

app.get(
  '/api/v1/auth/me',
  validateAccessToken,
  extractAuth0Identity,
  loadCurrentUser,
  (_req, res) => {
    const user = res.locals.currentUser!;

    return res.status(200).json({
      success: true,
      message: 'Authenticated user retrieved successfully',
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  }
);


export default app;