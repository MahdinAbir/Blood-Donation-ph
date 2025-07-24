import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
import Router from './Router/Router.jsx'
import AuthProvider from './Authentication/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> <ToastContainer position='top-center' /> 
    
     <RouterProvider router={Router} > </RouterProvider> 

     </AuthProvider>
  </StrictMode>,
)
