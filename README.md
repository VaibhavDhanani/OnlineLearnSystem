# 🎓 Educition Room

A comprehensive online learning platform that enables interaction between teachers and students, featuring course management, assignment workflows, and real-time communication - similar to Google Classroom.

## 🌟 Features

### 📚 Course Management
- **Multi-Course Support**: Teachers can create and manage multiple courses (Python, Java, etc.)
- **Course Dashboard**: Organized view of all available courses with easy navigation
- **Course-Specific Content**: Separate content management for each subject

### 📖 Lecture System
- **Video Lectures**: Support for video-based learning content
- **Lecture Organization**: Structured lecture series with timestamps

### 📝 Assignment Management
- **Assignment Creation**: Teachers can create and distribute assignments
- **File Upload**: Students can submit assignments with file attachments
- **Due Date Tracking**: Clear deadline management with visual indicators
- **Submission Status**: Real-time feedback on assignment submission status
- **PDF Viewer**: Built-in document viewer for assignment materials

### 💬 Interactive Communication
- **Announcement System**: Teachers can post course announcements
- **Reply Threading**: Organized conversation threads for better communication
- **Real-time Updates**: Live updates on new posts and replies

### 📧 Email Integration
- **Bulk Email**: Teachers can send emails to all students or selected recipients
- **Custom Messages**: Rich text email composition with subject and body
- **Student Selection**: Flexible recipient selection with individual or bulk options

### 👥 User Management
- **Role-Based Access**: Separate interfaces for teachers and students
- **Authentication**: Secure login system with user verification
- **Profile Management**: User profiles with course enrollment tracking



## 🌟 Project Glimps
<img width="1366" height="768" alt="Screenshot from 2025-07-31 21-36-12" src="https://github.com/user-attachments/assets/9b7aae27-ad74-4b85-902e-0ef7573505d8" />
<img width="1366" height="768" alt="Screenshot from 2025-07-31 21-36-27" src="https://github.com/user-attachments/assets/6c762954-d318-43e9-a157-6e4371e03ba0" />
<img width="1366" height="768" alt="Screenshot from 2025-07-31 21-36-32" src="https://github.com/user-attachments/assets/da03f8af-f328-4417-882a-87cba6e64e77" />
<img width="1366" height="768" alt="Screenshot from 2025-07-31 21-36-51" src="https://github.com/user-attachments/assets/fef91a49-582a-4a72-aec6-213940ad6efa" />
<img width="1366" height="768" alt="Screenshot from 2025-07-31 21-37-10" src="https://github.com/user-attachments/assets/9a6e5ea2-b531-4a08-9d58-fd1c1b148cc2" />
<img width="1366" height="768" alt="Screenshot from 2025-07-31 21-38-00" src="https://github.com/user-attachments/assets/d3d98b60-8b6f-4293-ae3d-5746333c1afe" />


## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI development
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **RESTful APIs** - Structured API endpoints
- **Authentication Middleware** - Secure route protection

### Database
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Object modeling for MongoDB

### File Storage & Media
- **Firebase Storage** - Cloud storage for videos, documents, and assignments
- **File Upload Handling** - Secure file upload and retrieval system

### Email Service
- **Nodemailer** - Email sending functionality
- **SMTP Integration** - Reliable email delivery system

### Additional Tools
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

## 🚀 Key Functionalities

### For Teachers:
- Create and manage multiple courses
- Upload video lectures and course materials
- Create assignments with due dates
- View and grade student submissions
- Send announcements and emails to students
- Monitor student progress and engagement

### For Students:
- Enroll in multiple courses
- Access video lectures and course materials
- Submit assignments with file uploads
- Participate in course discussions
- Receive email notifications and announcements
- Track assignment deadlines and grades

## 📱 User Interface

### Dashboard
- Clean, intuitive design with course cards
- Quick access to classes, announcements, and tools
- Responsive layout for desktop and mobile devices

### Course Pages
- Organized sections for Lessons, Assignments, and Materials
- Video player integration for seamless learning
- File preview and download capabilities

### Assignment Interface
- User-friendly submission process
- File upload with drag-and-drop support
- Real-time submission status updates

### Communication Hub
- Threaded discussion system
- Rich text formatting for posts and replies
- Email composition with recipient selection

## 🏗️ Architecture

```
Frontend (React.js)
├── Course Dashboard
├── Lecture Viewer
├── Assignment System
├── Communication Interface
└── Email Management

Backend (Node.js + Express)
├── Authentication APIs
├── Course Management APIs
├── Assignment APIs
├── Communication APIs
└── Email Service APIs

Database (MongoDB)
├── Users Collection
├── Courses Collection
├── Assignments Collection
├── Announcements Collection
└── Submissions Collection

Storage (Firebase)
├── Video Files
├── Assignment Documents
├── Course Materials
└── User Uploads
```

## 🎯 Project Goals

This Learning Management System aims to:
- **Digitize Education**: Bring traditional classroom experience online
- **Enhance Communication**: Foster better teacher-student interaction
- **Streamline Workflows**: Simplify assignment distribution and submission
- **Improve Accessibility**: Make learning materials available anytime, anywhere
- **Track Progress**: Provide insights into student engagement and performance

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EducationRoom
   ```

2. **Install dependencies**
   ```bash
   # Backend dependencies
   cd backend
   npm install
   
   # Frontend dependencies
   cd client
   npm install
   ```

3. **Environment Variables**
   ```bash
   # Create .env file with:
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FIREBASE_CONFIG=your_firebase_config
   EMAIL_USER=your_email_username
   EMAIL_PASS=your_email_password
   ```

4. **Run the application**
   ```bash
   # Start backend server
   cd backend
   npm run server
   
   # Start frontend (in another terminal)
   cd client
   npm start
   ```
