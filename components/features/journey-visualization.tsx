'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { MessageSquare, Instagram, Database, Mail, Phone, Bot, User, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { useTranslations } from '../../lib/hooks/use-translations';

type Journey = 'whatsapp' | 'instagram';

interface TimelineEvent {
  type: 'customer' | 'ai' | 'system';
  icon: typeof MessageSquare;
  message: string;
  details?: string;
  delay: number;
}

export function JourneyVisualization() {
  const { t } = useTranslations();

  const whatsappJourney: TimelineEvent[] = [
    {
      type: 'customer',
      icon: MessageSquare,
      message: "Hello, I'd like to schedule a consultation for my knee pain",
      delay: 0
    },
    {
      type: 'ai',
      icon: Bot,
      message: "Thank you for reaching out. Could you share when you first noticed the symptoms?",
      delay: 1
    },
    {
      type: 'customer',
      icon: User,
      message: "About 3 weeks ago after running",
      delay: 2
    },
    {
      type: 'ai',
      icon: Bot,
      message: "Have you had any previous injuries or treatments for this?",
      delay: 3
    },
    {
      type: 'customer',
      icon: User,
      message: "No previous injuries",
      delay: 4
    },
    {
      type: 'ai',
      icon: Bot,
      message: "Please confirm your name and preferred appointment time",
      delay: 5
    },
    {
      type: 'customer',
      icon: User,
      message: "John Doe, preferably next Wednesday",
      delay: 6
    },
    {
      type: 'system',
      icon: Database,
      message: "Medical information saved",
      details: "Symptoms history and patient details recorded",
      delay: 7
    },
    {
      type: 'system',
      icon: Mail,
      message: "Appointment scheduled",
      details: "Pre-consultation forms sent via email",
      delay: 8
    }
  ];

  const instagramJourney: TimelineEvent[] = [
    {
      type: 'customer',
      icon: MessageSquare,
      message: "Hey! Love your products. Do you have the blue dress in stock?",
      delay: 0
    },
    {
      type: 'ai',
      icon: Bot,
      message: "Thanks for your interest! To help you find the perfect dress, could you tell me what size you're looking for?",
      delay: 1
    },
    {
      type: 'customer',
      icon: User,
      message: "Size M",
      delay: 2
    },
    {
      type: 'ai',
      icon: Bot,
      message: "Great! What's the occasion you're shopping for?",
      delay: 3
    },
    {
      type: 'customer',
      icon: User,
      message: "A summer wedding",
      delay: 4
    },
    {
      type: 'ai',
      icon: Bot,
      message: "Perfect! The blue dress would be ideal. We also have a special 15% off for wedding guests. Would you like to see the offer?",
      delay: 5
    },
    {
      type: 'customer',
      icon: User,
      message: "Yes, please!",
      delay: 6
    }
  ];

  const [selectedJourney, setSelectedJourney] = useState<Journey>('whatsapp');
  const [currentStep, setCurrentStep] = useState(0);
  const [currentJourney, setCurrentJourney] = useState(whatsappJourney);

  useEffect(() => {
    setCurrentJourney(selectedJourney === 'whatsapp' ? whatsappJourney : instagramJourney);
    setCurrentStep(0);
  }, [selectedJourney]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= currentJourney.length - 1) {
          setTimeout(() => {
            setSelectedJourney(current => current === 'whatsapp' ? 'instagram' : 'whatsapp');
          }, 1000);
          return 0;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [currentJourney]);

  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('features.comprehensive.sections.aiCommunication.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('features.comprehensive.sections.aiCommunication.description')}
          </p>
        </motion.div>

        <div className="flex justify-center items-center gap-4 mb-12">
          <Button
            variant={selectedJourney === 'whatsapp' ? 'default' : 'ghost'}
            onClick={() => setSelectedJourney('whatsapp')}
            className="flex items-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{t('features.comprehensive.sections.multichannel.features.2')}</span>
          </Button>
          <Button
            variant={selectedJourney === 'instagram' ? 'default' : 'ghost'}
            onClick={() => setSelectedJourney('instagram')}
            className="flex items-center gap-2"
          >
            <Instagram className="w-5 h-5" />
            <span>{t('features.comprehensive.sections.multichannel.features.0')}</span>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {currentJourney.slice(0, currentStep + 1).map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: event.type === 'customer' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`flex items-start gap-4 ${
                      event.type === 'customer' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <Avatar className={`${event.type === 'system' ? 'bg-muted' : ''}`}>
                      <AvatarFallback>
                        <event.icon className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex-1 ${event.type === 'customer' ? 'text-right' : ''}`}>
                      <div
                        className={`inline-block rounded-lg p-4 ${
                          event.type === 'customer'
                            ? 'bg-primary text-primary-foreground'
                            : event.type === 'system'
                            ? 'bg-muted'
                            : 'bg-card border'
                        }`}
                      >
                        <p className="text-sm">{event.message}</p>
                        {event.details && (
                          <p className="text-xs mt-2 text-muted-foreground">{event.details}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}