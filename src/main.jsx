import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import MainLayout from './layouts/MainLayout.jsx'
import Homepage from './pages/Homepage.jsx';
import ProjectsPage from "./pages/ProjectsPage.jsx";
import SkillsPage from "./pages/SkillsPage.jsx";
import SocialPage from "./pages/SocialPage.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "/projects",
        element: <ProjectsPage />
      },
      {
        path: "/skills",
        element: <SkillsPage />
      },
      {
        path: "/socials",
        element: <SocialPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <App />
        <ToastContainer position='bottom-right' />
      </RouterProvider>
    </QueryClientProvider>
  </StrictMode>,
)
