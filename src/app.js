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
import authenticateToken from './middlewares/auth.middleware.js';


dotenv.config();

const app = express();

app.use(express.json());

const emitter = new EventEmitter();
emitter.setMaxListeners(20);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your frontend URL
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public")) // image storage folder

// middleware

// client routes
const handleRoute = (req, res) => {
  const routePath = req.originalUrl;
  res.json({ message: `Welcome to ${routePath}`});
};
const routes = ['/home', '/home/:subject'];

routes.forEach(route => {
  app.get(route, handleRoute);
});



// backend routes
// app.use("/api/v1",healthcheckrouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/material", materialRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/resource", resourceRouter);
app.use("/api/v1/lectures", lessonRouter);
app.use("/api/v1/assignment", assignmentRouter);

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An unexpected error occurred' });
});

export default app;