'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from '@/lib/hooks/use-translations';
import { useLanguage } from '@/components/providers/language-provider';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const QUESTION_KEYS = [
  {
    key: 'firstName',
    type: 'text',
    required: true,
    translationKey: 'contact.form.firstName'
  },
  {
    key: 'email',
    type: 'email',
    required: true,
    translationKey: 'contact.form.email'
  },
  {
    key: 'phone',
    type: 'phone',
    required: true,
    translationKey: 'contact.form.phone'
  },
  {
    key: 'businessName',
    type: 'text',
    required: true,
    translationKey: 'contact.form.businessName'
  },
  {
    key: 'businessWebsite',
    type: 'url',
    required: true,
    translationKey: 'contact.form.businessWebsite'
  },
  {
    key: 'additionalInfo',
    type: 'textarea',
    required: false,
    translationKey: 'contact.form.additionalInfo'
  }
];

interface FormData {
  firstName: string;
  email: string;
  phone: string;
  businessName: string;
  businessWebsite: string;
  additionalInfo?: string;
}

const validationSchema = {
  email: z.string().email('Invalid email format'),
  website: z.string().url('Invalid URL format').optional().or(z.literal('')),
};

export function ConversationalForm() {
  const { t } = useTranslations();
  const { language } = useLanguage();
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

  // Memoize translated questions
  const questions = useMemo(() => 
    QUESTION_KEYS.map(q => ({
      ...q,
      question: t(q.translationKey)
    }))
  , [t]);

  // Reset form when language changes
  useEffect(() => {
    setStep(0);
    setFormData({
      firstName: '',
      email: '',
      phone: '',
      businessName: '',
      businessWebsite: '',
      additionalInfo: '',
    });
    setError('');
  }, [language]);

  // Focus input on step change
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  const currentQuestion = questions[step];

  const validateField = (key: string, value: string) => {
    setError('');
    if (key === 'email') {
      try {
        validationSchema.email.parse(value);
      } catch (err) {
        setError('Invalid email format');
        return false;
      }
    } else if (key === 'businessWebsite') {
      try {
        // Ensure URL has protocol
        let urlToValidate = value;
        if (!/^https?:\/\//i.test(value)) {
          urlToValidate = `https://${value}`;
        }
        
        const url = new URL(urlToValidate);
        if (!url.hostname.includes('.')) {
          throw new Error('Invalid domain');
        }
        
        // Update form data with properly formatted URL
        setFormData(prev => ({
          ...prev,
          [key]: urlToValidate
        }));
        
      } catch (err) {
        setError('Invalid URL format');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    const currentValue = formData[currentQuestion.key as keyof FormData] as string;
    
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

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setError('');
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
      setError('');
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
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(t('contact.form.error'));
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
              {step > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t('common.back')}
                </Button>
              )}
              <h2 className="text-3xl font-medium">
                {currentQuestion.question}
              </h2>
              <div className="space-y-2">
                {renderInput(currentQuestion)}
                {error && (
                  <p className="text-sm text-destructive">
                    {error}
                  </p>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {step + 1} / {questions.length} · {t('common.pressEnter')}
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