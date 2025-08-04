import { useState, useEffect } from 'react';
import { Notification } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Load from localStorage for demo
      const savedNotifications = localStorage.getItem(`notifications_${user?.id}`);
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      } else {
        // Create some sample notifications for demo
        const sampleNotifications: Notification[] = [
          {
            id: '1',
            title: 'Welcome to Campus Resolve Portal',
            message: 'Your account has been successfully created. You can now submit and track complaints.',
            type: 'success',
            timestamp: new Date().toISOString(),
            read: false
          },
          {
            id: '2',
            title: 'Security Notice',
            message: 'Your data is protected with bank-level security. All communications are encrypted.',
            type: 'info',
            timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            read: false
          }
        ];
        setNotifications(sampleNotifications);
        localStorage.setItem(`notifications_${user?.id}`, JSON.stringify(sampleNotifications));
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    
    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      localStorage.setItem(`notifications_${user?.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => {
      const updated = prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      );
      localStorage.setItem(`notifications_${user?.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(notification => ({ ...notification, read: true }));
      localStorage.setItem(`notifications_${user?.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    isLoading,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead
  };
};