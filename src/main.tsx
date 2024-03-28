
import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';

import Users from './screens/users';
import Movies from './screens/movies';
import Login from './screens/login';
import { AuthProvider } from './hooks/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const router = createBrowserRouter([
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className='bg-black'>
          <RouterProvider router={router} />
          </div>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
