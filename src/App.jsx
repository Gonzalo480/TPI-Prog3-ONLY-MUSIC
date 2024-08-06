import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Router } from './routes/Router';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  );
}

export default App;
