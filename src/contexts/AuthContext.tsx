import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

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
    // Check for existing JWT token in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        // In a real app, you'd validate the token with your backend
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          
          // Update user data with latest profile info from registered users
          const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
          const updatedUserData = registeredUsers.find((u: any) => u.email === userData.email);
          if (updatedUserData) {
            userData.name = updatedUserData.name;
            userData.avatar = updatedUserData.avatar;
          }
          
          // Check if token is expired (simplified check)
          const tokenData = JSON.parse(atob(token.split('.')[1]));
          if (tokenData.exp * 1000 > Date.now()) {
            setUser(userData);
          } else {
            // Token expired, clear storage
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        // Invalid token, clear storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with proper validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate credentials (in real app, this would be done on backend)
      const validCredentials = [
        { email: 'admin@college.edu', password: 'admin123', role: 'admin', name: 'Admin User' },
        { email: 'student@college.edu', password: 'password123', role: 'student', name: 'John Doe' }
      ];
      
      // Check for registered users in localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const allValidCredentials = [...validCredentials, ...registeredUsers];
      
      const user = allValidCredentials.find(cred => cred.email === email && cred.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Create mock JWT token (in real app, this comes from backend)
      const mockToken = btoa(JSON.stringify({
        userId: Date.now().toString(),
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      }));
      
      const mockUser: User = {
        id: Date.now().toString(),
        name: user.name,
        email: user.email,
        role: user.role as 'student' | 'admin',
        avatar: user.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      };
      
      setUser(mockUser);
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: 'student' | 'admin' = 'student') => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = registeredUsers.find((u: any) => u.email === email);
      
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user and save to localStorage
      const newUserData = {
        name,
        email,
        password,
        role,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      };
      
      registeredUsers.push(newUserData);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      const mockToken = btoa(JSON.stringify({
        userId: Date.now().toString(),
        email,
        role,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      }));
      
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role,
        avatar: newUserData.avatar
      };
      
      setUser(newUser);
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update in registered users list if exists
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userIndex = registeredUsers.findIndex((u: any) => u.email === user.email);
      if (userIndex !== -1) {
        registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...updates };
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
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