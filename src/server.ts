import express, { Request, Response } from 'express';
import path from 'path';

const app = express();

// Serve frontend files
app.use(express.static(path.join(__dirname, 'FRONTEND')));

// Parse JSON requests
app.use(express.json());

// Optional API endpoint
app.post('/api/logAlarm', (req: Request, res: Response) => {
  const { message, timestamp } = req.body;
  console.log(`Alarm triggered at ${timestamp}: ${message}`);
  res.json({ status: 'success' });
});

// Serve index.html for root
app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'FRONTEND', 'index.html'));
});

// Export app for Vercel
export default app;
