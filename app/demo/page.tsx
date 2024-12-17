'use client';

import { DemoForm } from '@/components/demo/form';
import { motion } from 'framer-motion';
import { useTranslations } from '@/lib/hooks/use-translations';

export default function DemoPage() {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Let&apos;s Bring{' '}
            <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              AI to Your Business!
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how our AI Agents can boost your revenue, reduce costs, and
            enhance quality—all without the need for extra hires. Chat with us now
            to schedule demo!
          </p>
        </motion.div>

        <DemoForm />
      </div>
    </div>
  );
}