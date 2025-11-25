document.body.style.margin = '0';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './App';
import ValeraList from './components/ValeraList';
import ValeraStats from './components/ValeraStats';
import AuthForm from './components/AuthForm';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: 'login', element: <AuthForm isLogin={true} /> },
      { path: 'register', element: <AuthForm isLogin={false} /> },
      { 
        path: 'valera', 
        element: (
          <ProtectedRoute>
            <ValeraList />
          </ProtectedRoute>
        ) 
      },
      { 
        path: 'valera/:id', 
        element: (
          <ProtectedRoute>
            <ValeraStats />
          </ProtectedRoute>
        ) 
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);