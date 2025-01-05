'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Users, MessageSquare, UserPlus, ArrowLeftRight } from 'lucide-react';
import Image from 'next/image';

export function TeamFeatures() {
  const features = [
    {
      icon: MessageSquare,
      title: 'Unified Chat Interface',
      description: 'Centralize all conversations for easy team access'
    },
    {
      icon: Users,
      title: 'Multi-User Access',
      description: 'Support multiple team members managing interactions'
    },
    {
      icon: ArrowLeftRight,
      title: 'Live Chat Integration',
      description: 'Enable real-time human intervention when needed'
    },
    {
      icon: UserPlus,
      title: 'Conversation Assignment',
      description: 'Distribute inquiries to appropriate team members'
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
                alt="Team Collaboration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/50 to-transparent" />
            </div>
            
            <div className="absolute -bottom-8 -left-8 bg-card p-8 rounded-2xl shadow-xl border max-w-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">Team Activity</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your team is efficiently managing customer interactions with improved coordination and response times.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Team Collaboration</h2>
              <p className="text-xl text-muted-foreground">
                Empower your team with tools for efficient customer service management
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6">
                    <feature.icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Use Cases</h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Customer Service Teams</h4>
                  <p className="text-sm text-muted-foreground">
                    Collaborate effectively to manage high volumes of inquiries and maintain quality service.
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Sales Departments</h4>
                  <p className="text-sm text-muted-foreground">
                    Assign leads to specific sales representatives for personalized follow-up and conversion.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}