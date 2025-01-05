'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MessageSquare, Instagram, Database, Mail, Phone, Bot, User, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

type Journey = 'whatsapp' | 'instagram';

interface TimelineEvent {
  type: 'customer' | 'ai' | 'system';
  icon: typeof MessageSquare;
  message: string;
  details?: string;
  delay: number;
}

const whatsappJourney: TimelineEvent[] = [
  {
    type: 'customer',
    icon: MessageSquare,
    message: "Hi! I'm interested in your services",
    delay: 0
  },
  {
    type: 'ai',
    icon: Bot,
    message: "Hello! I'd be happy to help. To better assist you, could you share your name?",
    delay: 1
  },
  {
    type: 'customer',
    icon: User,
    message: "I'm Sarah",
    delay: 2
  },
  {
    type: 'ai',
    icon: Bot,
    message: "Nice to meet you Sarah! What's the best email to reach you?",
    delay: 3
  },
  {
    type: 'customer',
    icon: User,
    message: "sarah@email.com",
    delay: 4
  },
  {
    type: 'ai',
    icon: Bot,
    message: "Thanks! And your phone number for updates?",
    delay: 5
  },
  {
    type: 'customer',
    icon: User,
    message: "+1234567890",
    delay: 6
  },
  {
    type: 'system',
    icon: Database,
    message: "Customer data saved",
    details: "Name, email, and phone collected",
    delay: 7
  },
  {
    type: 'system',
    icon: Mail,
    message: "Automated follow-up scheduled",
    details: "Welcome email + Special offer",
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
  },
  {
    type: 'system',
    icon: Database,
    message: "Conversion event recorded",
    details: "Interest + Size + Occasion data saved",
    delay: 7
  }
];
export function JourneyVisualization() {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer Journey Visualization</h2>
          <p className="text-xl text-muted-foreground">
            See how our AI handles real customer interactions across different channels
          </p>
        </motion.div>

        <div className="flex justify-center items-center gap-4 mb-12">
          <Button
            variant={selectedJourney === 'whatsapp' ? 'default' : 'ghost'}
            onClick={() => setSelectedJourney('whatsapp')}
            className="flex items-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            <span>WhatsApp Journey</span>
          </Button>
          <Button
            variant={selectedJourney === 'instagram' ? 'default' : 'ghost'}
            onClick={() => setSelectedJourney('instagram')}
            className="flex items-center gap-2"
          >
            <Instagram className="w-5 h-5" />
            <span>Instagram Journey</span>
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