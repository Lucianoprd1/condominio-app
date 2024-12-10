// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axiosConfig';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  // Verify token on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const response = await API.get('/me');
      if (response.data) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await API.post('/login', { email, password });
      const { user } = response.data;
      
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      setErrors(error.response?.data?.message || 'Error al iniciar sesión');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await API.post('/logout');
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      Cookies.remove('token');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    errors,
    login,
    logout,
    setIsAuthenticated,
    setUser,
    setErrors
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};