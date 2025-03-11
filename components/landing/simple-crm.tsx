'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export function SimpleCrmVisualization() {
  console.log('Rendering SimpleCrmVisualization');
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card border rounded-lg overflow-hidden shadow-2xl h-full"
    >
      {/* CRM Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <span className="font-medium">Patient Management</span>
        </div>
      </div>

      {/* Simple CRM Content */}
      <div className="p-4 flex flex-col items-center justify-center h-[400px] bg-gradient-to-b from-background to-muted/50">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold">CRM Visualization</h3>
          <p className="text-muted-foreground">
            This is a simplified CRM visualization for debugging purposes.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-background p-4 rounded-lg border">
                <div className="w-full h-8 bg-primary/10 rounded mb-2"></div>
                <div className="w-3/4 h-4 bg-primary/10 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}