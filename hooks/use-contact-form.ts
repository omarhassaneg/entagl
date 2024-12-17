'use client';

import { useState, useCallback } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  website: string;
  interestedProducts: string[];
  additionalInfo: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  businessName: '',
  website: '',
  interestedProducts: [],
  additionalInfo: '',
};

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = useCallback((field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // You could add error state handling here if needed
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return {
    formData,
    handleInputChange,
    handleSubmit,
    isSubmitting,
    isSubmitted,
  };
}