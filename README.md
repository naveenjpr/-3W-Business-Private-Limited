# 3W Blog - Full Stack Blog Application

A premium, feature-rich blog application designed for modern content sharing. Built with a robust MERN-inspired stack (MongoDB, Express, React, Node.js), this application offers a seamless user experience for bloggers and readers alike.

## 🚀 Key Features

-   **User Authentication**: Secure login and registration system using JWT and Bcrypt.
-   **Post Management**: Full CRUD (Create, Read, Update, Delete) functionality for blog posts.
-   **Image Uploads**: Integration with Cloudinary for high-performance image hosting.
-   **Interactive Comments**: Engaging comment system for every blog post.
-   **Responsive Design**: Stunning UI built with React and Bootstrap, ensuring compatibility across all devices.
-   **Toast Notifications**: Real-time feedback using React Toastify.
-   **Dynamic Routing**: Smooth navigation with React Router.

## 🛠️ Technology Stack

### Frontend
-   **Core**: React 19, TypeScript
-   **Build Tool**: Vite
-   **Styling**: Bootstrap 5, React-Bootstrap
-   **State Management/Hooks**: React Hooks
-   **Icons**: React Icons
-   **Networking**: Axios

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express 5
-   **Database**: MongoDB (Mongoose ODM)
-   **Authentication**: JSON Web Tokens (JWT), Bcrypt
-   **File Storage**: Cloudinary (via Multer)

## 📁 Project Structure

```text
3w/
├── backend/            # Express server and business logic
│   ├── src/            # Source code (routes, controllers, models)
│   └── server.js       # Entry point
└── frontend/
    └── blog_app/       # React application (Vite + TypeScript)
        ├── src/        # Application components, hooks, and views
        └── public/     # Static assets
```

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js (v18+)
-   MongoDB account (Atlas or Local)
-   Cloudinary account for image storage

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd 3w
```

### Step 2: Backend Configuration
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root of the `backend` folder and add your credentials:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    CLOUD_NAME=your_cloudinary_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_secret
    ```
4.  Start the server:
    ```bash
    npm start
    ```

### Step 3: Frontend Configuration
1.  Navigate to the frontend directory:
    ```bash
    cd ../frontend/blog_app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## 🌐 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/backend/auth/register` | User registration |
| POST | `/api/backend/auth/login` | User login |
| POST | `/api/backend/post/view` | Fetch all posts |
| POST | `/api/backend/post/add` | Create a new post (Multi-part/form-data) |
| POST | `/api/backend/post/like` | Like a specific post |
| POST | `/api/backend/comment/add` | Add a comment to a post |

## 🎨 UI/UX Highlights
-   **Premium Aesthetics**: Modern typography and clean layouts.
-   **Interactive Elements**: Smooth transitions and hover effects.
-   **Image Previews**: Dynamic previews for blog post thumbnails.

---
Built with ❤️ by the 3W Development Team.
