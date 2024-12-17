'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  Zap, 
  TrendingUp, 
  BarChart3, 
  Users,
  Clock,
  BrainCircuit
} from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';

export function BenefitsSection() {
  const { t } = useTranslations();

  const benefits = [
    {
      icon: Zap,
      title: "AI-Powered Content Creation",
      description: "Generate engaging social media content in seconds with our advanced AI technology",
      color: "text-teal-500",
    },
    {
      icon: TrendingUp,
      title: "Engagement Growth",
      description: "Boost your engagement rates with data-driven content optimization",
      color: "text-blue-500",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track your growth and optimize your strategy with detailed analytics",
      color: "text-purple-500",
    },
    {
      icon: Users,
      title: "Audience Building",
      description: "Grow your following with targeted content and engagement strategies",
      color: "text-pink-500",
    },
    {
      icon: Clock,
      title: "Time Saving",
      description: "Save hours daily with automated content creation and scheduling",
      color: "text-orange-500",
    },
    {
      icon: BrainCircuit,
      title: "Smart Automation",
      description: "Automate your social media presence while maintaining authenticity",
      color: "text-emerald-500",
    }
  ];

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
            Transform Your Social Media Presence
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leverage AI to grow your audience, save time, and increase engagement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <benefit.icon className={`h-12 w-12 ${benefit.color} mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}