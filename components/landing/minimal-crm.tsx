'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, User, Clipboard, FileText } from 'lucide-react';
import { useLanguage } from '@/components/providers/language-provider';

// Patient data for different languages
const patientData = {
  en: [
    { id: 1, name: 'Sarah Johnson', condition: 'Dental Checkup', lastVisit: '2024-10-15', images: ['x-ray-1', 'dental-scan'] },
    { id: 2, name: 'Michael Chen', condition: 'Orthodontic Treatment', lastVisit: '2024-09-22', images: ['dental-scan', 'facial-profile'] },
    { id: 3, name: 'Emma Rodriguez', condition: 'Root Canal', lastVisit: '2024-10-05', images: ['x-ray-2', 'treatment-plan'] }
  ],
  tr: [
    { id: 1, name: 'Ayşe Yılmaz', condition: 'Diş Kontrolü', lastVisit: '2024-10-15', images: ['röntgen-1', 'diş-taraması'] },
    { id: 2, name: 'Mehmet Kaya', condition: 'Ortodontik Tedavi', lastVisit: '2024-09-22', images: ['diş-taraması', 'yüz-profili'] },
    { id: 3, name: 'Zeynep Demir', condition: 'Kanal Tedavisi', lastVisit: '2024-10-05', images: ['röntgen-2', 'tedavi-planı'] }
  ],
  ru: [
    { id: 1, name: 'Анна Иванова', condition: 'Осмотр зубов', lastVisit: '2024-10-15', images: ['рентген-1', 'сканирование-зубов'] },
    { id: 2, name: 'Михаил Петров', condition: 'Ортодонтическое лечение', lastVisit: '2024-09-22', images: ['сканирование-зубов', 'профиль-лица'] },
    { id: 3, name: 'Елена Смирнова', condition: 'Лечение корневых каналов', lastVisit: '2024-10-05', images: ['рентген-2', 'план-лечения'] }
  ]
};

// UI text translations
const translations = {
  en: {
    patientManagement: 'Patient Management',
    filter: 'Filter',
    addPatient: 'Add Patient',
    patientList: 'Patient List',
    activePatient: 'Active Patient',
    medicalInfo: 'Medical Information',
    condition: 'Condition:',
    lastVisit: 'Last Visit:',
    medicalImages: 'Medical Images',
    noPatient: 'No Patient Selected',
    selectPatient: 'Select a patient from the list to view their details'
  },
  tr: {
    patientManagement: 'Hasta Yönetimi',
    filter: 'Filtrele',
    addPatient: 'Hasta Ekle',
    patientList: 'Hasta Listesi',
    activePatient: 'Aktif Hasta',
    medicalInfo: 'Tıbbi Bilgiler',
    condition: 'Durum:',
    lastVisit: 'Son Ziyaret:',
    medicalImages: 'Tıbbi Görüntüler',
    noPatient: 'Hasta Seçilmedi',
    selectPatient: 'Detayları görüntülemek için listeden bir hasta seçin'
  },
  ru: {
    patientManagement: 'Управление пациентами',
    filter: 'Фильтр',
    addPatient: 'Добавить пациента',
    patientList: 'Список пациентов',
    activePatient: 'Активный пациент',
    medicalInfo: 'Медицинская информация',
    condition: 'Состояние:',
    lastVisit: 'Последний визит:',
    medicalImages: 'Медицинские изображения',
    noPatient: 'Пациент не выбран',
    selectPatient: 'Выберите пациента из списка для просмотра подробностей'
  }
};

export function MinimalCrmVisualization() {
  // State
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [highlightedPatient, setHighlightedPatient] = useState<number | null>(null);
  const [animationStep, setAnimationStep] = useState(0);
  const { language } = useLanguage();
  
  // Get the appropriate data for the current language
  const patients = patientData[language as keyof typeof patientData] || patientData.en;
  const t = translations[language as keyof typeof translations] || translations.en;
  
  // Reset selection when language changes to avoid errors
  useEffect(() => {
    setSelectedPatient(null);
    setHighlightedPatient(null);
    setAnimationStep(0);
  }, [language]);
  
  // Animation sequence
  useEffect(() => {
    let isActive = true;
    let timer: NodeJS.Timeout | null = null;
    
    const sequence = [
      // Step 0: Initial state - no patient selected
      () => {
        if (!isActive) return;
        setSelectedPatient(null);
        setHighlightedPatient(null);
      },
      // Step 1: Highlight first patient
      () => {
        if (!isActive) return;
        setHighlightedPatient(1);
      },
      // Step 2: Select first patient
      () => {
        if (!isActive) return;
        setSelectedPatient(1);
        setHighlightedPatient(null);
      },
      // Step 3: Wait with profile open
      () => {
        // Just keep the profile open
      },
      // Step 4: Highlight second patient
      () => {
        if (!isActive) return;
        setHighlightedPatient(2);
      },
      // Step 5: Select second patient
      () => {
        if (!isActive) return;
        setSelectedPatient(2);
        setHighlightedPatient(null);
      },
      // Step 6: Wait with second profile open
      () => {
        // Just keep the profile open
      },
      // Step 7: Reset to start the sequence again
      () => {
        if (!isActive) return;
        setSelectedPatient(null);
        setHighlightedPatient(null);
      }
    ];

    // Progress through animation steps
    timer = setTimeout(() => {
      if (!isActive) return;
      sequence[animationStep]();
      setAnimationStep((prev) => (prev + 1) % sequence.length);
    }, 1350); // ~1.35 seconds per step (1.5x faster than original 2 seconds)

    // More comprehensive cleanup
    return () => {
      isActive = false;
      if (timer) clearTimeout(timer);
    };
  }, [animationStep, language]); // Add language dependency

  // Find the selected patient data
  const selectedPatientData = selectedPatient
    ? patients.find(p => p.id === selectedPatient)
    : null;

  return (
    <div className="bg-card border rounded-lg overflow-hidden shadow-2xl h-full">
      {/* CRM Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <span className="font-medium">{t.patientManagement}</span>
        </div>
        <div className="flex gap-2">
          <button className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
            {t.filter}
          </button>
          <button className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground">
            {t.addPatient}
          </button>
        </div>
      </div>

      {/* CRM Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-[400px] bg-gradient-to-b from-background to-muted/50">
        {/* Patient List */}
        <div className="p-4 border-r overflow-y-auto">
          <h3 className="text-sm font-medium mb-3">{t.patientList}</h3>
          <div className="space-y-3">
            {patients.map(patient => (
              <motion.div
                key={`${language}-patient-${patient.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: highlightedPatient === patient.id ? 1.03 : 1,
                  boxShadow: highlightedPatient === patient.id
                    ? '0 0 0 2px rgba(59, 130, 246, 0.5)'
                    : 'none',
                  backgroundColor: highlightedPatient === patient.id
                    ? 'rgba(59, 130, 246, 0.1)'
                    : 'var(--background)'
                }}
                transition={{ duration: 0.2 }}
                className={`rounded-lg p-3 border cursor-pointer ${
                  selectedPatient === patient.id ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => setSelectedPatient(patient.id)}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium"
                    animate={{
                      scale: highlightedPatient === patient.id ? [1, 1.1, 1] : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-sm">{patient.name}</h3>
                    <p className="text-xs text-muted-foreground">{patient.condition}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Patient Details */}
        <div className="p-4 overflow-y-auto">
          {selectedPatientData ? (
            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 750, damping: 35 }}
                >
                  {selectedPatientData.name.split(' ').map(n => n[0]).join('')}
                </motion.div>
                <div>
                  <h3 className="font-medium">{selectedPatientData.name}</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-xs text-muted-foreground">{t.activePatient}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="border-t pt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.07 }}
              >
                <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Clipboard className="h-4 w-4 text-primary" />
                  {t.medicalInfo}
                </h4>
                <div className="space-y-2 text-sm">
                  <motion.div
                    className="flex justify-between"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.13 }}
                  >
                    <span className="text-muted-foreground">{t.condition}</span>
                    <span>{selectedPatientData.condition}</span>
                  </motion.div>
                  <motion.div
                    className="flex justify-between"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                  >
                    <span className="text-muted-foreground">{t.lastVisit}</span>
                    <span>{selectedPatientData.lastVisit}</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="border-t pt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.27 }}
              >
                <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-primary" />
                  {t.medicalImages}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedPatientData.images.map((image, index) => (
                    <motion.div
                      key={`${language}-image-${image}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.33 + index * 0.07 }}
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
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="h-full flex items-center justify-center text-center p-6"
            >
              <div className="space-y-2">
                <User className="h-10 w-10 text-muted-foreground mx-auto" />
                <h3 className="font-medium">{t.noPatient}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.selectPatient}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}