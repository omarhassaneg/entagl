'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MessageSquare, Instagram, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

export function MultiChannelFeatures() {
  const platforms = [
    {
      icon: Instagram,
      name: 'Instagram & Facebook',
      description: 'Manage social media interactions seamlessly'
    },
    {
      icon: MessageSquare,
      name: 'WhatsApp & Telegram',
      description: 'Handle messaging app communications'
    },
    {
      icon: Mail,
      name: 'Email Integration',
      description: 'Coordinate email correspondence'
    },
    {
      icon: Phone,
      name: 'Website Chat',
      description: 'Embed live chat on your website'
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Multichannel Integration</h2>
            <p className="text-xl text-muted-foreground">
              Unify all your customer communications in one powerful platform
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6">
                    <platform.icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">{platform.name}</h3>
                    <p className="text-sm text-muted-foreground">{platform.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="p-6 bg-muted">
              <h3 className="text-xl font-semibold mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span>Increased reach across multiple platforms</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span>Consistent messaging across all channels</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span>Unified dashboard for all communications</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984"
                alt="Multichannel Integration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/50 to-transparent" />
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-card p-8 rounded-2xl shadow-xl border max-w-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">Unified Communications Active</span>
              </div>
              <p className="text-sm text-muted-foreground">
                All your customer interactions are being managed efficiently through our integrated platform.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}