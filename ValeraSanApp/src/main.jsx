document.body.style.margin = '0';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './App';
import ValeraList from './components/ValeraList';
import ValeraStats from './components/ValeraStats';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/valera" replace /> },
      { path: 'valera', element: <ValeraList /> },
      { path: 'valera/:id', element: <ValeraStats /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
