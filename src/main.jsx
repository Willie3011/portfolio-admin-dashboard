import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Homepage from './pages/Homepage.jsx';
import ProjectsPage from "./pages/ProjectsPage.jsx";
import SkillsPage from "./pages/SkillsPage.jsx";
import SocialPage from "./pages/SocialPage.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LoginPage from './pages/LoginPage.jsx'
import LoginLayout from './layouts/LoginLayout.jsx'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <ProtectedRoute>
      <MainLayout />
      </ProtectedRoute>,
    children: [
      {
        path: "",
        element: <Homepage />
      },
      {
        path: "projects",
        element: <ProjectsPage />
      },
      {
        path: "skills",
        element: <SkillsPage />
      },
      {
        path: "socials",
        element: <SocialPage />
      }
    ]
  },
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      {
        path: "/",
        element: <LoginPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <App />
        <ToastContainer position='top-right' />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
