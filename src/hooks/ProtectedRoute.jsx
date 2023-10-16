import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { redirect } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (!authContext.isAuthenticated) {
    return redirect('/login')
  }

  return children;
};

export default ProtectedRoute;
