'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, User, Clipboard, FileText, Plus, Filter } from 'lucide-react';

// Patient data
const patients = [
  {
    id: 1,
    name: 'Sarah Johnson',
    initials: 'SJ',
    condition: 'Dental Checkup',
    category: 'leads',
    lastVisit: '2024-10-15',
    notes: 'Regular cleaning and examination',
    images: ['x-ray-1', 'dental-scan']
  },
  {
    id: 2,
    name: 'Michael Chen',
    initials: 'MC',
    condition: 'Orthodontic Treatment',
    category: 'progress',
    lastVisit: '2024-09-22',
    notes: 'Braces adjustment needed',
    images: ['dental-scan', 'facial-profile']
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    initials: 'ER',
    condition: 'Root Canal',
    category: 'followup',
    lastVisit: '2024-10-05',
    notes: 'Follow-up on healing progress',
    images: ['x-ray-2', 'treatment-plan']
  }
];

// Categories
const categories = [
  { id: 'leads', name: 'New Leads', color: 'bg-blue-500' },
  { id: 'progress', name: 'In Progress', color: 'bg-amber-500' },
  { id: 'followup', name: 'Follow Up', color: 'bg-purple-500' },
  { id: 'completed', name: 'Completed', color: 'bg-green-500' }
];

export function EnhancedCrmVisualization() {
  // State
  const [activeTab, setActiveTab] = useState('leads');
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [highlightedPatient, setHighlightedPatient] = useState<number | null>(null);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // Refs for positioning
  const patientRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Animation sequence
  useEffect(() => {
    const sequence = [
      // Step 0: Initial state - no patient selected
      () => {
        setSelectedPatient(null);
        setHighlightedPatient(null);
        setShowCursor(false);
      },
      // Step 1: Show cursor and move to first patient
      () => {
        setShowCursor(true);
        const patientEl = patientRefs.current[0];
        if (patientEl) {
          const rect = patientEl.getBoundingClientRect();
          setCursorPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          });
        }
        setHighlightedPatient(1);
      },
      // Step 2: Click on first patient
      () => {
        setSelectedPatient(1);
        setShowCursor(false);
      },
      // Step 3: Wait with profile open
      () => {
        // Just keep the profile open
      },
      // Step 4: Show cursor and move to second patient
      () => {
        setShowCursor(true);
        const patientEl = patientRefs.current[1];
        if (patientEl) {
          const rect = patientEl.getBoundingClientRect();
          setCursorPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          });
        }
        setHighlightedPatient(2);
      },
      // Step 5: Click on second patient
      () => {
        setSelectedPatient(2);
        setShowCursor(false);
      },
      // Step 6: Wait with second profile open
      () => {
        // Just keep the profile open
      },
      // Step 7: Reset to start the sequence again
      () => {
        setSelectedPatient(null);
        setHighlightedPatient(null);
        setShowCursor(false);
      }
    ];

    // Progress through animation steps
    const timer = setTimeout(() => {
      sequence[animationStep]();
      setAnimationStep((prev) => (prev + 1) % sequence.length);
    }, 2000); // 2 seconds per step

    return () => clearTimeout(timer);
  }, [animationStep]);

  // Get the selected patient data
  const selectedPatientData = selectedPatient
    ? patients.find(p => p.id === selectedPatient)
    : null;

  return (
    <div className="bg-card border rounded-lg overflow-hidden shadow-2xl h-full relative">
      {/* Cursor animation */}
      {showCursor && (
        <motion.div
          className="absolute w-4 h-4 z-50 pointer-events-none"
          animate={{ x: cursorPosition.x, y: cursorPosition.y }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{ left: -8, top: -8 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              fill="white"
              stroke="black"
              strokeWidth="1"
              d="M1,1 L8,13 L10,8 L15,6 Z"
            />
          </svg>
        </motion.div>
      )}

      {/* CRM Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <span className="font-medium">Patient Management</span>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xs px-2 py-1 rounded bg-primary/10 text-primary flex items-center gap-1"
          >
            <Filter className="h-3 w-3" />
            <span>Filter</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground flex items-center gap-1"
          >
            <Plus className="h-3 w-3" />
            <span>Add Patient</span>
          </motion.button>
        </div>
      </div>

      {/* CRM Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-[400px] bg-gradient-to-b from-background to-muted/50">
        {/* Categories */}
        <div className="p-4 border-r overflow-y-auto">
          <div className="space-y-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(category => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 text-xs rounded-full ${
                    activeTab === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                  onClick={() => setActiveTab(category.id)}
                >
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${category.color}`} />
                    <span>{category.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Patient Cards */}
            <div className="space-y-3">
              {patients
                .filter(patient => patient.category === activeTab)
                .map((patient, index) => (
                <motion.div
                  key={patient.id}
                  ref={el => patientRefs.current[index] = el}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: highlightedPatient === patient.id ? 1.03 : 1,
                    boxShadow: highlightedPatient === patient.id
                      ? '0 0 0 2px rgba(59, 130, 246, 0.5)'
                      : 'none'
                  }}
                  transition={{ duration: 0.3 }}
                  className={`bg-background rounded-lg p-3 border shadow-sm cursor-pointer ${
                    selectedPatient === patient.id ? 'border-primary' : ''
                  }`}
                  onClick={() => setSelectedPatient(patient.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {patient.initials}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{patient.name}</h3>
                      <p className="text-xs text-muted-foreground">{patient.condition}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Details */}
        <div className="p-4 overflow-y-auto">
          <AnimatePresence mode="wait">
            {selectedPatientData ? (
              <motion.div
                key={`patient-${selectedPatientData.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {selectedPatientData.initials}
                  </motion.div>
                  <div>
                    <h3 className="font-medium">{selectedPatientData.name}</h3>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${
                        categories.find(c => c.id === selectedPatientData.category)?.color
                      }`} />
                      <span className="text-xs text-muted-foreground">
                        {categories.find(c => c.id === selectedPatientData.category)?.name}
                      </span>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="border-t pt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Clipboard className="h-4 w-4 text-primary" />
                    Medical Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Condition:</span>
                      <span>{selectedPatientData.condition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Visit:</span>
                      <span>{selectedPatientData.lastVisit}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-muted-foreground">Notes:</span>
                      <motion.p
                        className="mt-1 text-sm bg-muted/50 p-2 rounded"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {selectedPatientData.notes}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="border-t pt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Medical Images
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedPatientData.images.map((image, index) => (
                      <motion.div
                        key={image}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="bg-muted/50 rounded p-2 text-center"
                      >
                        <div className="bg-primary/10 rounded h-12 flex items-center justify-center mb-1">
                          <FileText className="h-6 w-6 text-primary/40" />
                        </div>
                        <span className="text-xs">{image}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="no-selection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center text-center p-6"
              >
                <div className="space-y-2">
                  <User className="h-10 w-10 text-muted-foreground mx-auto" />
                  <h3 className="font-medium">No Patient Selected</h3>
                  <p className="text-sm text-muted-foreground">
                    Select a patient from the list to view their details
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}