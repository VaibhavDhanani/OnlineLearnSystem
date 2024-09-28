import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { EventEmitter } from 'events';

import userRouter from './routes/user.routes.js';
import materialRouter from './routes/material.routes.js';
import classRouter from './routes/class.routes.js';
import resourceRouter from './routes/resource.routes.js';
import lessonRouter from './routes/lesson.routes.js';
import assignmentRouter from './routes/assignment.routes.js';
import announcementRouter from './routes/announcement.routes.js';
import sendEmail from './utils/emailService.js';


dotenv.config();
const app = express();

// Increase max listeners for EventEmitter
const emitter = new EventEmitter();
emitter.setMaxListeners(20);

// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true
}));

// Client routes
const handleRoute = (req, res) => {
  const routePath = req.originalUrl;
  res.json({ message: `Welcome to ${routePath}` });
};

const routes = ['/home', '/home/:subject', '/'];
routes.forEach(route => {
  app.get(route, handleRoute);
});

// Backend routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/materials", materialRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/resource", resourceRouter);
app.use("/api/v1/lectures", lessonRouter);
app.use("/api/v1/assignments", assignmentRouter);
app.use("/api/v1/announcement", announcementRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An unexpected error occurred' });
});

app.post("/api/v1/sendemail", async (req, res) => {
  try {
    const {to,subject,text,html} = req.body;
    if (!to ||!subject ||!text ||!html) {
      return res.status(400).json({ message: 'Missing required fields: to, subject, text, html' });
    }
    await Promise.all(to.map((student) => sendEmail(student, subject, text, html)));
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error in /send-email route:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
})

export default app;