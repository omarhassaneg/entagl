'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  MessageSquare, 
  Bot, 
  Globe,
  Calendar,
  Users,
  BrainCircuit,
  Smartphone,
  BarChart3,
  Zap,
  PauseCircle,
  UserPlus,
  Sheet,
  MessagesSquare
} from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';

export function FeaturesSection() {
  const { t } = useTranslations();

  const features = [
    {
      title: "AI-Powered Communication",
      description: "Intelligent conversations across all channels with advanced intention detection",
      icon: Bot,
      features: [
        "Manage from 2,500 to 40,000+ conversations monthly",
        "Automate common interactions like inquiries, bookings, and complaints",
        "SMART Intention Detection",
        "AI Knowledge Awareness",
        "Constant Self Improvement"
      ]
    },
    {
      title: "Multichannel Integration",
      description: "Connect with customers wherever they are, across multiple platforms",
      icon: MessagesSquare,
      features: [
        "Instagram DM Integration",
        "FB Messenger DM Support",
        "WhatsApp DM Integration",
        "Telegram DM Support",
        "Website Chat Widget",
        "Email Integration"
      ]
    },
    {
      title: "Smart Features",
      description: "Enhance customer engagement with cutting-edge tools",
      icon: BrainCircuit,
      features: [
        "Multilingual Conversations",
        "Customer Information Collection",
        "24/7/365 Availability",
        "Keyword Based Conversation Starter",
        "Pause/Resume AI Capability"
      ]
    },
    {
      title: "Team Collaboration",
      description: "Efficiently manage communication with a unified team platform",
      icon: Users,
      features: [
        "Unified Chat Interface",
        "Desktop & Mobile Access",
        "Multiple User Access",
        "Live Chat Seats",
        "Conversation Assignment"
      ]
    },
    {
      title: "Business Integration",
      description: "Seamless connectivity with your existing tools and workflows",
      icon: Zap,
      features: [
        "Facebook Conversion Tracking",
        "Calendar Integration",
        "Google Sheets Updates",
        "Automated Task Management",
        "Custom Workflow Support"
      ]
    }
  ];

  const stats = [
    { value: "24/7", label: "Availability" },
    { value: "6+", label: "Languages" },
    { value: "40,000+", label: "Monthly Conversations" },
    { value: "99.9%", label: "Uptime" }
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive AI Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to automate and enhance your customer communications
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}