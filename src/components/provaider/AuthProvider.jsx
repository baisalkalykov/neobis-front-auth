import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('https://neobis-auth-project.up.railway.app/api/users/signUp');
        setUser(response.data.user);
      } catch (error) {
        console.error('Ошибка проверки аутентификации:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://neobis-auth-project.up.railway.app/api/users/signIn', { email, password });
      setUser(response.data.user);
    } catch (error) {
      console.error('Ошибка входа:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};