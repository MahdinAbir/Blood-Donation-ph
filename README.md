# 🩸 BloodConnect - Blood Donation Web Application

A full-stack MERN-based blood donation platform built to connect donors and recipients with ease. BloodConnect allows users to register as donors, volunteers, or admins, create and manage donation requests, publish blogs, and spread awareness about the importance of donating blood.

---

### 🔗 Live Site

👉 [BloodConnect Live Website] https://donate-blood-d33a2.web.app/

---

### 🔐 Credentials for Testing

- **Admin Email:** `arham@gmail.com`  
- **Admin Password:** `Abir2609`

---

## 🚀 Project Overview

**BloodConnect** was developed with the vision of promoting lifesaving blood donations through a secure, responsive, and role-based web platform. The system provides essential features for managing donation requests, donor activity, user roles, and public awareness through blogging.

---

## 🌟 Key Features (25+)

### 🔒 Authentication & Security
- Firebase Authentication (email/password + Google Sign-In)
- JWT-based route protection using Firebase Admin SDK
- Role-based route restriction (Admin, Donor, Volunteer)
- Secure API endpoints with custom `verifyToken` middleware

### 👤 User Roles & Permissions
- **Admin:** Manage users, approve roles, publish blogs
- **Donor:** Create/manage donation requests, view donation history
- **Volunteer:** View requests, assist in communication
- Blocked users are prevented from accessing private routes

### 📝 Blog System
- Admin can create blogs with rich text formatting (Jodit Editor)
- Published blogs displayed publicly on the homepage
- Colorful, decorative public blog and detailed blog pages

### 🧪 Donation Request Management
- Donors can:
  - Create, edit, delete blood donation requests
  - Change request status to `inprogress`, `done`, or `cancel`
  - View their last 3 requests in the dashboard home
- Requests are filtered by logged-in user

### 🧠 Smart Search System
- Public search page to find donors using:
  - Blood group
  - District
  - Upazila
- Dynamic district-upazila filtering using `districts.json` & `upazilas.json`

### 📊 Admin Panel
- View all users with pagination
- Assign roles: donor, volunteer, admin
- Block/unblock users
- Manage all donation requests and blogs

### 🌐 Frontend
- Built using **React + Vite**
- State management with **TanStack Query**
- **Framer Motion** animations
- **Tailwind CSS** for responsive UI
- SweetAlert2 for confirmation modals and alerts

### 🖥️ Backend
- Node.js + Express.js server
- MongoDB for database
- JWT-based API access control
- Firebase Admin SDK for token verification
- CORS + dotenv + middleware setup

---

## ⚙️ Tech Stack

| Frontend | Backend | Tools |
|----------|---------|-------|
| React.js (Vite) | Express.js | Firebase Auth |
| Tailwind CSS | MongoDB (Atlas) | Firebase Admin SDK |
| Framer Motion | JWT | SweetAlert2 |
| Axios | dotenv | Jodit Rich Text Editor |
| TanStack Query | CORS | Vercel (Deploy) |

---

## 🩸 Key Features of BloodConnect


1. **Role-Based Access Control:**  
   Separate dashboards for **Admin**, **Donor**, and **Volunteer** roles with protected routes.

2. **JWT & Firebase Authentication:**  
   Secure login and registration with email/password and Google Sign-In.

3. **Donation Request System:**  
   Donors can create, edit, delete, and update the status of blood donation requests (pending, in-progress, done, canceled).

4. **Advanced Search Page:**  
   Users can search for donors based on blood group, district, and upazila dynamically.

5. **Live Blog System:**  
   Blogs created by Admin are shown publicly with decorative design and detailed blog view pages.

6. **User Management by Admin:**  
   Admin can see all users, assign roles, block/unblock accounts, and manage site-wide access.

7. **Secure API with verifyToken Middleware:**  
   Ensures only authenticated users with valid Firebase tokens can access or modify protected data.

8. **Donation History:**  
   Donors can view their 3 latest donation requests on their dashboard homepage.

9. **Responsive UI with Theme Toggle:**  
   Beautiful mobile-friendly design with Light/Dark theme toggle for enhanced UX.

10. **Framer Motion & Tailwind CSS Design:**  
    Smooth animations, professional layout, and modern styling for all components.