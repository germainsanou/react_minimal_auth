import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  user: null,
  setIsAuthenticated: () => { }
});

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, setIsAuthenticated, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider.');
  }

  return authContext;
};
