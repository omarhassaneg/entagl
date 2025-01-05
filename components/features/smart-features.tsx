'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Globe, Clock, Bot, Database } from 'lucide-react';

export function SmartFeatures() {
  const features = [
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Engage with customers in their preferred language'
    },
    {
      icon: Database,
      title: 'Customer Data Collection',
      description: 'Gather insights to personalize interactions'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Always-on customer support access'
    },
    {
      icon: Bot,
      title: 'Human-AI Collaboration',
      description: 'Seamless transition between AI and human agents'
    }
  ];

  const useCases = [
    {
      title: 'Global Customer Base',
      description: 'Serve international clients in multiple languages'
    },
    {
      title: 'Lead Generation',
      description: 'Collect and qualify leads through automated interactions'
    },
    {
      title: 'Proactive Engagement',
      description: 'Initiate conversations based on user behavior'
    }
  ];

  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Smart Features</h2>
          <p className="text-xl text-muted-foreground">
            Advanced capabilities that enhance customer engagement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full">
                <h3 className="text-xl font-semibold mb-4">{useCase.title}</h3>
                <p className="text-muted-foreground">{useCase.description}</p>
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-2">Benefits:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm">Personalized customer experience</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm">Increased engagement rates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm">Higher conversion rates</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}