import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import apiService from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: 'student' | 'admin') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await apiService.getProfile();
          if (response.success && response.data?.user) {
            setUser(response.data.user);
          } else {
            // Invalid token, clear storage
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          // Invalid token, clear storage
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiService.login(email, password);
      
      if (response.success && response.data) {
        const { user, token } = response.data;
        
        setUser(user);
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: 'student' | 'admin' = 'student') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiService.register(name, email, password, role);
      
      if (response.success && response.data) {
        const { user, token } = response.data;
        
        setUser(user);
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      const response = await apiService.updateProfile(updates);
      
      if (response.success && response.data?.user) {
        const updatedUser = response.data.user;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        throw new Error(response.message || 'Profile update failed');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};