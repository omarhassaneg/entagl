'use client';

import { motion } from 'framer-motion';
import { MessageSquare, BarChart2, Clock, Send, Heart, Star } from 'lucide-react';

const gradientClasses = {
  blue: "from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10",
  purple: "from-purple-500/20 to-pink-500/20 dark:from-purple-500/10 dark:to-pink-500/10",
  orange: "from-orange-500/20 to-red-500/20 dark:from-orange-500/10 dark:to-red-500/10"
};

const iconClasses = {
  blue: "text-blue-500 dark:text-blue-400",
  purple: "text-purple-500 dark:text-purple-400",
  orange: "text-orange-500 dark:text-orange-400"
};

export const FeatureAnimation = ({ 
  children, 
  gradient 
}: { 
  children: React.ReactNode;
  gradient: keyof typeof gradientClasses;
}) => (
  <motion.div
    className={`w-full aspect-video bg-gradient-to-br ${gradientClasses[gradient]} rounded-lg flex items-center justify-center p-8 relative overflow-hidden`}
    initial={{ scale: 0.9, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="absolute inset-0 bg-grid-pattern opacity-5" />
    {children}
  </motion.div>
);

export const ContentCreationVisual = () => (
  <FeatureAnimation gradient="blue">
    <div className="relative flex flex-col items-center gap-6">
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-16 h-16 rounded-lg bg-blue-500/20 dark:bg-blue-500/10 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <MessageSquare className={`w-8 h-8 ${iconClasses.blue}`} />
        </motion.div>
        <motion.div 
          className="space-y-2"
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        >
          <motion.div className="h-2 bg-blue-500/20 dark:bg-blue-500/10 rounded-full" />
          <motion.div className="h-2 bg-blue-500/20 dark:bg-blue-500/10 rounded-full w-3/4" />
        </motion.div>
      </motion.div>
      <div className="flex gap-3">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          <Heart className="w-6 h-6 text-red-500" />
        </motion.div>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
        >
          <Star className="w-6 h-6 text-yellow-500" />
        </motion.div>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
        >
          <Send className="w-6 h-6 text-blue-500" />
        </motion.div>
      </div>
    </div>
  </FeatureAnimation>
);

export const AnalyticsVisual = () => (
  <FeatureAnimation gradient="purple">
    <div className="flex items-end gap-3 h-40">
      {[0.4, 0.8, 0.6, 1, 0.7].map((height, i) => (
        <div key={i} className="relative flex flex-col items-center gap-2">
          <motion.div
            className="absolute -top-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <BarChart2 className={`w-6 h-6 ${iconClasses.purple}`} />
          </motion.div>
          <motion.div
            className="w-12 bg-gradient-to-t from-purple-500/30 to-pink-500/30 dark:from-purple-500/20 dark:to-pink-500/20 rounded-t-lg relative group"
            initial={{ height: 0 }}
            animate={{ height: `${height * 100}%` }}
            transition={{ duration: 1, delay: i * 0.2 }}
          >
            <motion.div
              className="absolute -top-6 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {Math.round(height * 100)}%
            </motion.div>
          </motion.div>
        </div>
      ))}
    </div>
  </FeatureAnimation>
);

export const TimingVisual = () => (
  <FeatureAnimation gradient="orange">
    <div className="relative">
      <motion.div
        className="w-24 h-24 rounded-full border-4 border-orange-500/30 dark:border-orange-500/20 flex items-center justify-center relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <Clock className={`w-10 h-10 ${iconClasses.orange}`} />
        <motion.div
          className="absolute top-0 left-1/2 w-1.5 h-12 bg-gradient-to-b from-orange-500 to-red-500 origin-bottom rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-0 left-1/2 w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500 origin-bottom rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-2 bg-orange-500/30 dark:bg-orange-500/20"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-11px)`,
              transformOrigin: '50% 100%'
            }}
          />
        ))}
      </motion.div>
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-orange-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </motion.div>
    </div>
  </FeatureAnimation>
);