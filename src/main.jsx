import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import MainLayout from './layouts/MainLayout.jsx'
import AboutPage from './pages/AboutPage.jsx'

const router = createBrowserRouter([
  {
    element: <MainLayout />, 
    children: [
      {
        path: "/",
        element: <AboutPage/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
      <ToastContainer position='bottom-right'/>
    </RouterProvider>
  </StrictMode>,
)
