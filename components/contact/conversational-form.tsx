'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from '@/lib/hooks/use-translations';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { z } from 'zod';
import { Button } from '@/components/ui/button';

interface FormData {
  firstName: string;
  email: string;
  phone: string;
  businessName?: string;
  businessWebsite?: string;
  additionalInfo?: string;
}

const validationSchema = {
  email: z.string().email('Invalid email format'),
  website: z.string().url('Invalid URL format').optional().or(z.literal('')),
};

export function ConversationalForm() {
  const { t } = useTranslations();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    email: '',
    phone: '',
    businessName: '',
    businessWebsite: '',
    additionalInfo: '',
  });
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  const questions = [
    {
      key: 'firstName',
      question: t('contact.form.firstName'),
      type: 'text',
      required: true,
    },
    {
      key: 'email',
      question: t('contact.form.email'),
      type: 'email',
      required: true,
    },
    {
      key: 'phone',
      question: t('contact.form.phone'),
      type: 'phone',
      required: true,
    },
    {
      key: 'businessName',
      question: t('contact.form.businessName'),
      type: 'text',
      required: false,
    },
    {
      key: 'businessWebsite',
      question: t('contact.form.businessWebsite'),
      type: 'url',
      required: false,
    },
    {
      key: 'additionalInfo',
      question: t('contact.form.additionalInfo'),
      type: 'textarea',
      required: false,
    },
  ];

  const validateField = (key: string, value: string) => {
    setError('');
    if (key === 'email') {
      try {
        validationSchema.email.parse(value);
      } catch (err) {
        setError('Invalid email format');
        return false;
      }
    } else if (key === 'businessWebsite' && value) {
      try {
        validationSchema.website.parse(value);
      } catch (err) {
        setError('Invalid URL format');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    const currentQuestion = questions[step];
    const currentValue = formData[currentQuestion.key as keyof FormData] as string;
    
    // Allow skipping optional fields
    if (!currentQuestion.required && !currentValue) {
      if (step < questions.length - 1) {
        setStep(step + 1);
        setError('');
      } else {
        handleSubmit();
      }
      return;
    }

    if (currentQuestion.type === 'url' && currentValue) {
      try {
        const url = new URL(currentValue);
        if (!url.protocol.startsWith('http')) {
          throw new Error('Invalid protocol');
        }
      } catch {
        setError('Please enter a valid website URL');
        return;
      }
    }

    if (currentQuestion.required && !currentValue) {
      setError('This field is required');
      return;
    }

    if (!validateField(currentQuestion.key, currentValue)) {
      return;
    }

    if (step < questions.length - 1) {
      setStep(step + 1);
      setError('');
    } else {
      handleSubmit();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !error) {
      e.preventDefault();
      handleNext();
    }
  };

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData({ ...formData, [key]: value });
    if (error) {
      validateField(key, value);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://hook.us1.make.com/yyqy6vn8ysaijlm457aixb5psqofdfyz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact-us-request',
          ...formData,
        }),
      });

      if (response.ok) {
        setStep(questions.length);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const renderInput = (question: typeof questions[0]) => {
    const value = formData[question.key as keyof FormData] || '';
    const commonProps = {
      className: 'w-full bg-transparent border-b-2 border-primary/20 focus:border-primary outline-none text-2xl py-2 transition-colors mb-4',
      onKeyPress: handleKeyPress,
    };

    if (question.type === 'phone') {
      return (
        <div className="space-y-4">
          <PhoneInput
            autoFocus
            value={value as string}
            onChange={(phone) => setFormData({ ...formData, [question.key]: phone || '' })}
            onKeyDown={(e: any) => {
              if (e.key === 'Enter' && !error) {
                e.preventDefault();
                handleNext();
              }
            }}
            className="text-2xl"
          />
          <div className="md:hidden">
            <Button
              onClick={handleNext}
              disabled={!value || !!error}
              className="w-full"
            >
              {t('common.next')}
            </Button>
          </div>
        </div>
      );
    }

    if (question.type === 'textarea') {
      return (
        <Textarea
          autoFocus
          {...commonProps}
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => setFormData({ ...formData, [question.key]: e.target.value })}
          rows={4}
        />
      );
    }

    if (question.type === 'url') {
      return (
        <div className="flex items-center">
          <span className="text-2xl text-muted-foreground mr-1">https://</span>
          <Input
            {...commonProps}
            autoFocus
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={value.replace(/^https?:\/\//, '')}
            onChange={(e) => {
              const input = e.target.value;
              const fullUrl = input ? `https://${input.replace(/^https?:\/\//, '')}` : '';
              handleChange(question.key as keyof FormData, fullUrl);
            }}
            aria-invalid={!!error}
          />
        </div>
      );
    }

    return (
      <Input
        {...commonProps}
        autoFocus
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type={question.type}
        value={value}
        onChange={(e) => handleChange(question.key as keyof FormData, e.target.value)}
        aria-invalid={!!error}
      />
    );
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {step < questions.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-medium mb-8">
                {questions[step].question}
              </h2>
              <div className="space-y-2">
                {renderInput(questions[step])}
                {error && (
                  <p className="text-sm text-destructive">
                    {error}
                  </p>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {step + 1} / {questions.length} · Press Enter ↵
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-3xl font-medium mb-4">
                {t('contact.form.thankYou')}
              </h2>
              <p className="text-muted-foreground">
                {t('contact.form.confirmation')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}