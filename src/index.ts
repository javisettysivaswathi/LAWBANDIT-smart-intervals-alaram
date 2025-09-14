import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static frontend
app.use(express.static(path.join(__dirname, '../FRONTEND')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../FRONTEND/index.html'));
});

// ❌ Don’t call app.listen()
// ✅ Export for Vercel serverless
export default app;
