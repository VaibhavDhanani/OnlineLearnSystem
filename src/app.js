import express from 'express';
import cors from 'cors';
import { EventEmitter } from 'events';

import userRouter from './routes/user.routes.js';
import materialRouter from './routes/material.routes.js';
import classRouter from './routes/class.routes.js';
import resourceRouter from './routes/resource.routes.js';
import lessonRouter from './routes/lesson.routes.js';
import assignmentRouter from './routes/assignment.routes.js';

const app = express();
app.use(express.json());
const emitter = new EventEmitter();
emitter.setMaxListeners(20);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
)
app.use(express.urlencoded({ extended: true}))
app.use(express.static("public")) // image storage folder

// middleware

// routes
// app.use("/api/v1",healthcheckrouter);
app.use("/api/v1/user",userRouter);

app.use("/api/v1/material",materialRouter);
app.use("/api/v1/class",classRouter);
app.use("/api/v1/resource",resourceRouter);
app.use("/api/v1/lesson",lessonRouter);
app.use("/api/v1/assignment",assignmentRouter);

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An unexpected error occurred' });
  });

// const newUser = new User({
//     username: 'john_doe',
//     email: 'john_doe@example.com',
//     password: 'securepassword123', // Note: In practice, passwords should be hashed before saving
//     gender:'male'
//   });
  
//   // Save the new user to the database
//   newUser.save()
//     .then(user => {
//       console.log('User created successfully:', user);
//     })
//     .catch(error => {
//       console.error('Error creating user:', error);
//     });

// const dummyTeacherId = new mongoose.Types.ObjectId();
// const dummyStudentId1 = new mongoose.Types.ObjectId();
// const dummyStudentId2 = new mongoose.Types.ObjectId();
// const dummyLessonId1 = new mongoose.Types.ObjectId();
// const dummyLessonId2 = new mongoose.Types.ObjectId();
// const dummyMaterialId1 = new mongoose.Types.ObjectId();
// const dummyMaterialId2 = new mongoose.Types.ObjectId();

// async function createDummyClass() {
//     const dummyClass = new Class({
//         teacher: dummyTeacherId, // assuming this ObjectId exists in your User collection
//         subject: "Mathematics",
//         students: [dummyStudentId1, dummyStudentId2], // assuming these ObjectIds exist in your User collection
//         lessons: [dummyLessonId1, dummyLessonId2], // assuming these ObjectIds exist in your Lesson collection
//         materials: [dummyMaterialId1, dummyMaterialId2] // assuming these ObjectIds exist in your Material collection
//     });

//     try {
//         const savedClass = await dummyClass.save();
//         console.log("Dummy class created:", savedClass);
//     } catch (error) {
//         console.error("Error creating dummy class:", error);
//     }
// }

// createDummyClass();


export default app;