import dotenv from 'dotenv';
dotenv.config({ path: './.config.env' });

import express from 'express';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import { fileURLToPath } from 'url';

const app = express();

// Middleware to handle CORS

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware

app.use(express.json());

connectDB();

// Routes

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', (req, res, next) => {
  // res.setHeader(
  //   'Access-Control-Allow-Origin',
  //   // 'http://localhost:5173'
  //   // 'https://mern-resume-builder.vercel.app'
  // );
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Server uploads folder
// app.use(
//   '/uploads',
//   express.static(path.dirname('uploads'), {
//     setHeaders: (res, path) => {
//       res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
//     },
//   })
// );
