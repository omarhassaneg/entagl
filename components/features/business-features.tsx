'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Link2, Calendar, Database, Workflow } from 'lucide-react';

export function BusinessFeatures() {
  const features = [
    {
      icon: Link2,
      title: 'CRM Integration',
      description: 'Sync with customer relationship management systems'
    },
    {
      icon: Calendar,
      title: 'Calendar Syncing',
      description: 'Automate scheduling and appointment management'
    },
    {
      icon: Database,
      title: 'Data Management',
      description: 'Update records automatically in various tools'
    },
    {
      icon: Workflow,
      title: 'Automated Workflows',
      description: 'Execute tasks based on predefined triggers'
    }
  ];

  const useCases = [
    {
      title: 'Sales Automation',
      description: 'Integrate with CRM to manage leads and customer data efficiently',
      benefits: [
        'Automated lead tracking',
        'Seamless data synchronization',
        'Enhanced sales pipeline visibility'
      ]
    },
    {
      title: 'Appointment Scheduling',
      description: 'Automate booking processes for services',
      benefits: [
        'Reduced scheduling conflicts',
        'Automated reminders',
        'Calendar integration'
      ]
    },
    {
      title: 'Data Management',
      description: 'Reduce manual data entry by automating updates',
      benefits: [
        'Improved accuracy',
        'Time savings',
        'Real-time updates'
      ]
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Business Integration</h2>
          <p className="text-xl text-muted-foreground">
            Seamlessly connect your existing tools and automate workflows
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                <p className="text-muted-foreground mb-6">{useCase.description}</p>
                <div className="space-y-3">
                  {useCase.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}