'use client';

import { motion } from 'framer-motion';

export function SocialProof() {
  const stats = [
    { value: '10,000+', label: 'Active Users' },
    { value: '5M+', label: 'Posts Generated' },
    { value: '85%', label: 'Time Saved' },
    { value: '3x', label: 'Engagement Growth' },
  ];

  const logos = [
    'TechCrunch',
    'Forbes',
    'Wired',
    'VentureBeat',
    'The Verge'
  ];

  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
          {logos.map((logo) => (
            <div
              key={logo}
              className="text-xl font-semibold text-muted-foreground"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}