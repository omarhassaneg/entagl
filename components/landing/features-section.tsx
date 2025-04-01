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

  // Helper function to ensure we get an array of strings from translation
  const getFeaturesList = (key: string): string[] => {
    const features = t(key);
    return Array.isArray(features) ? features : [];
  };

  const features = [
    {
      title: t('features.comprehensive.sections.aiCommunication.title'),
      description: t('features.comprehensive.sections.aiCommunication.description'),
      icon: Bot,
      features: getFeaturesList('features.comprehensive.sections.aiCommunication.features')
    },
    {
      title: t('features.comprehensive.sections.multichannel.title'),
      description: t('features.comprehensive.sections.multichannel.description'),
      icon: MessagesSquare,
      features: getFeaturesList('features.comprehensive.sections.multichannel.features')
    },
    {
      title: t('features.comprehensive.sections.smartFeatures.title'),
      description: t('features.comprehensive.sections.smartFeatures.description'),
      icon: BrainCircuit,
      features: getFeaturesList('features.comprehensive.sections.smartFeatures.features')
    },
    {
      title: t('features.comprehensive.sections.teamCollaboration.title'),
      description: t('features.comprehensive.sections.teamCollaboration.description'),
      icon: Users,
      features: getFeaturesList('features.comprehensive.sections.teamCollaboration.features')
    },
    {
      title: t('features.comprehensive.sections.businessIntegration.title'),
      description: t('features.comprehensive.sections.businessIntegration.description'),
      icon: Zap,
      features: getFeaturesList('features.comprehensive.sections.businessIntegration.features')
    }
  ];

  const stats = [
    { value: "24/7", label: t('features.comprehensive.stats.availability') },
    { value: "12+", label: t('features.comprehensive.stats.languages') },
    { value: "40,000+", label: t('features.comprehensive.stats.conversations') },
    { value: "99.9%", label: t('features.comprehensive.stats.uptime') }
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.comprehensive.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('features.comprehensive.subtitle')}
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