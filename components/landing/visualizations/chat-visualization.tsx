'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MessageSquare, User } from 'lucide-react';

export function ChatVisualization() {
  return (
    <motion.div
      className="relative h-[300px] w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-lg" />
      
      <motion.div
        className="absolute top-8 left-8 w-64"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Patient</span>
          </div>
          <div className="mt-2 space-y-2">
            <div className="h-3 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        </Card>
      </motion.div>

      <motion.div
        className="absolute top-24 right-8 w-64"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-teal-500" />
            <span className="text-sm font-medium">Clinic</span>
          </div>
          <div className="mt-2 space-y-2">
            <div className="h-3 bg-muted rounded w-full" />
            <div className="h-3 bg-muted rounded w-2/3" />
          </div>
        </Card>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-72"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Conversation History</span>
          </div>
          <div className="mt-2 space-y-2">
            <div className="h-3 bg-muted rounded w-full" />
            <div className="h-3 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}