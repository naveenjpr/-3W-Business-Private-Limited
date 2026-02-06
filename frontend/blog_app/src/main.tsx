import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home.tsx'
import Regirster from './pages/Regirster.tsx'
import Login from './pages/Login.tsx'
import CreatePost from './pages/CreatePost.tsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Regirster />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/add-post",
    element: <CreatePost />,
  }
])
createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>
)
