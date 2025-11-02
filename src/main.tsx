import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import {router} from './routes.tsx'
import AuthProvider from './contexts/authContext.tsx'
import {register} from 'swiper/element/bundle'
import toast, {Toaster} from 'react-hot-toast'

register();
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

Toaster


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
    position='top-center'
    reverseOrder={false}/>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
