'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Bot, Brain, Zap, BarChart } from 'lucide-react';

export function AIFeatures() {
  const features = [
    {
      icon: Bot,
      title: 'Intelligent Conversations',
      description: 'Automate interactions with human-like responses for inquiries, bookings, and complaints.'
    },
    {
      icon: Brain,
      title: 'SMART Intention Detection',
      description: 'Accurately understand and act on customer needs in real-time.'
    },
    {
      icon: Zap,
      title: 'AI Knowledge Awareness',
      description: 'Access vast knowledge base for instant, precise answers.'
    },
    {
      icon: BarChart,
      title: 'Continuous Learning',
      description: 'Improve over time through ongoing updates and machine learning.'
    }
  ];

  const useCases = [
    {
      title: 'E-commerce Customer Service',
      description: 'Provide 24/7 assistance, resolving common issues without human intervention.'
    },
    {
      title: 'Order Management',
      description: 'Assist customers with placing, tracking, and modifying orders seamlessly.'
    },
    {
      title: 'Reservations & Bookings',
      description: 'Automate appointment scheduling and reservations for businesses.'
    },
    {
      title: 'Lead Qualification',
      description: 'Engage potential customers and qualify leads for the sales team.'
    }
  ];

  const benefits = [
    'Enhanced Efficiency: Reduces response times and operational costs',
    'Scalability: Handles up to 40,000+ conversations per month',
    'Improved Customer Satisfaction: Delivers prompt and accurate responses'
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Communication</h2>
          <p className="text-xl text-muted-foreground">Transform your customer interactions with intelligent automation</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">Use Cases</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <Card key={useCase.title} className="p-6">
                  <h4 className="font-semibold mb-2">{useCase.title}</h4>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">Key Benefits</h3>
            <Card className="p-6">
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}