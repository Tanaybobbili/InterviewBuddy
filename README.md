
# InterviewBuddy Project

## Project Overview

InterviewBuddy is a full-stack web application designed for managing B2B organizations and related functionalities. The project implements a modern React frontend with Tailwind CSS for styling, integrated with a Node.js and Express backend using MySQL. It supports organization management, and cloud-based media handling via Cloudinary.

This project was developed as part of an assignment given by a company for testing purposes. The design and UI components were provided through Figma images to accurately replicate the intended interface and user experience.

## Features

- Responsive and clean UI built with React and Tailwind CSS
- Navigation with React Router for smooth page transitions
- User profile 
- Notification and support sections integrated in the header
- Backend API built with Express.js, Sequelize ORM for MySQL
- Cloud media upload and management using Cloudinary
- Environment configuration for development with dotenv
- Seamless frontend-backend integration with API base URL configuration

## Hosted Version

Access the live frontend of the project at:  
[https://interviewbuddy129.netlify.app/](https://interviewbuddy129.netlify.app/)

## Setup Instructions

### Frontend

1. Clone the repository and navigate to the `frontend` folder.
2. Install dependencies:  
   ```
   npm install
   ```
3. Create a `.env` file in the frontend directory with the following variables:  
   ```
   VITE_API_BASE_URL=http://localhost:8000
   ```
4. Start the development server:  
   ```
   npm run dev
   ```
5. The frontend will be available at `http://localhost:3000` by default.

### Backend

1. Navigate to the `backend` folder.
2. Install dependencies:  
   ```
   npm install
   ```
3. Create a `.env` file in the backend directory with the following configuration variables (replace with your actual values):  
   ```
   PORT=8000

   DB_USER=your_database_user
   DB_PASS=your_database_password
   DB_HOST=your_database_host
   DB_NAME=your_database_name

   CLOUDINARY_URL=your_cloudinary_url

   FRONTEND_URL=http://localhost:3000
   ```
4. Start the backend server:  
   ```
   npm run dev
   ```
5. Backend API will run on `http://localhost:8000` or your configured port.

## Technologies Used

- React 19.x with React Router DOM 7.x
- Tailwind CSS and Lucide React icons
- Vite build tool for frontend
- Node.js 18+ with Express 5.x for backend API
- MySQL with Sequelize ORM and MongoDB with Mongoose
- Cloudinary for media storage and management
- dotenv for environment variable management
