import express from 'express';

const app = express();

// Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/v1/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'ResolveHQ API is running',
    timestamp: new Date().toISOString()
  });
});

export default app;