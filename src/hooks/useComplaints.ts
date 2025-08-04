import { useState, useEffect } from 'react';
import { Complaint } from '../types';

export const useComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Start with empty complaints array - no initial data
    // In a real app, this would fetch from your backend API
    const loadComplaints = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if there are any saved complaints in localStorage (for demo purposes)
        const savedComplaints = localStorage.getItem('complaints');
        if (savedComplaints) {
          setComplaints(JSON.parse(savedComplaints));
        } else {
          // Start with empty array - no default data
          setComplaints([]);
        }
      } catch (error) {
        console.error('Failed to load complaints:', error);
        setComplaints([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadComplaints();
  }, []);

  const addComplaint = (complaint: Omit<Complaint, 'id' | 'submittedAt'>) => {
    const newComplaint: Complaint = {
      ...complaint,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };
    setComplaints(prev => [newComplaint, ...prev]);
    
    // Save to localStorage for demo persistence
    const updatedComplaints = [newComplaint, ...complaints];
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
  };

  const updateComplaint = (id: string, updates: Partial<Complaint>) => {
    setComplaints(prev => {
      const updated = prev.map(complaint => 
        complaint.id === id ? { ...complaint, ...updates } : complaint
      );
      
      // Save to localStorage for demo persistence
      localStorage.setItem('complaints', JSON.stringify(updated));
      return updated;
    });
  };

  return {
    complaints,
    isLoading,
    addComplaint,
    updateComplaint
  };
};