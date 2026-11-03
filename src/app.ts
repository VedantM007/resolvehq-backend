import express from 'express';
import { pool } from './config/database.js';

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

export default app;