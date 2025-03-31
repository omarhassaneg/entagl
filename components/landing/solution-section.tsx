'use client';

import { motion } from 'framer-motion';
import { useTranslations } from '@/lib/hooks/use-translations';
import { useLanguage } from '@/components/providers/language-provider';
import { Card } from '@/components/ui/card';
import { Check, Clock, Calendar, MessageSquare, FileText, User, Bell } from 'lucide-react';

export function SolutionSection() {
  const { t } = useTranslations();
  const { language } = useLanguage();

  // Define the supported languages
  type SupportedLanguage = 'en' | 'ru' | 'tr';

  // Visualization text content localized for each language
  const localizedTexts: Record<SupportedLanguage, any> = {
    en: {
      chat: {
        patient: "Patient",
        patientMessage: "Hello, I'm having some discomfort after the procedure. Is this normal?",
        doctorTitle: "Dr. Smith (AI Assistant)",
        doctorMessage: "Some mild discomfort is normal for 24-48 hours. If you have severe pain or bleeding, please contact us immediately.",
        todayAt: "Today"
      },
      patientRecord: {
        patientName: "Sarah Johnson",
        patientId: "Patient ID",
        completeRecord: "Complete Record",
        lastVisit: "Last Visit",
        nextAppointment: "Next Appointment",
        medicalHistory: "Medical History",
        recentMessages: "Recent Messages",
        appointmentHistory: "Appointment History",
        date1: "March 15, 2025",
        date2: "April 10, 2025"
      },
      calendar: {
        scheduleOptimization: "Schedule Optimization",
        month: "March 2025",
        days: {
          mon: "Mon",
          tue: "Tue",
          wed: "Wed",
          thu: "Thu",
          fri: "Fri"
        },
        consultation: "Consultation - Dr. Wilson",
        followUp: "Follow-up - Dr. Smith",
        newPatient: "New Patient - Dr. Wilson",
        time1: "9:00 AM - 10:00 AM",
        time2: "11:30 AM - 12:00 PM",
        time3: "2:30 PM - 3:30 PM"
      },
      documentation: {
        clinicalDocumentation: "Clinical Documentation",
        patient: "Patient",
        patientName: "Robert Thompson",
        assessment: "Assessment",
        automaticallyGenerated: "Automatically Generated"
      }
    },
    ru: {
      chat: {
        patient: "Пациент",
        patientMessage: "Здравствуйте, у меня некоторый дискомфорт после процедуры. Это нормально?",
        doctorTitle: "Др. Соколов (ИИ Ассистент)",
        doctorMessage: "Легкий дискомфорт в течение 24-48 часов нормален. Если у вас сильная боль или кровотечение, пожалуйста, немедленно свяжитесь с нами.",
        todayAt: "Сегодня"
      },
      patientRecord: {
        patientName: "Елена Смирнова",
        patientId: "ID Пациента",
        completeRecord: "Полная Запись",
        lastVisit: "Последний Визит",
        nextAppointment: "Следующая Запись",
        medicalHistory: "История Болезни",
        recentMessages: "Недавние Сообщения",
        appointmentHistory: "История Приемов",
        date1: "15 марта, 2025",
        date2: "10 апреля, 2025"
      },
      calendar: {
        scheduleOptimization: "Оптимизация Расписания",
        month: "Март 2025",
        days: {
          mon: "Пн",
          tue: "Вт",
          wed: "Ср",
          thu: "Чт",
          fri: "Пт"
        },
        consultation: "Консультация - Др. Иванов",
        followUp: "Контрольный осмотр - Др. Соколов",
        newPatient: "Новый Пациент - Др. Иванов",
        time1: "9:00 - 10:00",
        time2: "11:30 - 12:00",
        time3: "14:30 - 15:30"
      },
      documentation: {
        clinicalDocumentation: "Клиническая Документация",
        patient: "Пациент",
        patientName: "Александр Петров",
        assessment: "Оценка",
        automaticallyGenerated: "Автоматически Сгенерировано"
      }
    },
    tr: {
      chat: {
        patient: "Hasta",
        patientMessage: "Merhaba, işlem sonrası biraz rahatsızlık hissediyorum. Bu normal mi?",
        doctorTitle: "Dr. Demir Yapay Zeka Asistan",
        doctorMessage: "24-48 saat boyunca hafif rahatsızlık normaldir. Şiddetli ağrı veya kanama olursa lütfen hemen bizimle iletişime geçin.",
        todayAt: "Bugün"
      },
      patientRecord: {
        patientName: "Ayşe Yılmaz",
        patientId: "Hasta ID",
        completeRecord: "Tam Kayıt",
        lastVisit: "Son Ziyaret",
        nextAppointment: "Sonraki Randevu",
        medicalHistory: "Tıbbi Geçmiş",
        recentMessages: "Son Mesajlar",
        appointmentHistory: "Randevu Geçmişi",
        date1: "15 Mart, 2025",
        date2: "10 Nisan, 2025"
      },
      calendar: {
        scheduleOptimization: "Program Optimizasyonu",
        month: "Mart 2025",
        days: {
          mon: "Pzt",
          tue: "Sal",
          wed: "Çar",
          thu: "Per",
          fri: "Cum"
        },
        consultation: "Konsültasyon - Dr. Aydın",
        followUp: "Kontrol - Dr. Demir",
        newPatient: "Yeni Hasta - Dr. Aydın",
        time1: "9:00 - 10:00",
        time2: "11:30 - 12:00",
        time3: "14:30 - 15:30"
      },
      documentation: {
        clinicalDocumentation: "Klinik Belgelendirme",
        patient: "Hasta",
        patientName: "Mehmet Yıldırım",
        assessment: "Değerlendirme",
        automaticallyGenerated: "Otomatik Oluşturuldu"
      }
    }
  };

  // Get the appropriate texts based on current language, defaulting to English
  const currentLang = (language as SupportedLanguage) in localizedTexts ? (language as SupportedLanguage) : 'en';
  const visualizationTexts = localizedTexts[currentLang];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.solution.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('landing.solution.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 24/7 Patient Engagement Hub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl overflow-hidden shadow-sm border"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{t('landing.solution.features.chat.title')}</h3>
              <p className="text-muted-foreground mb-4">{t('landing.solution.features.chat.description')}</p>
            </div>
            
            <div className="p-6 bg-muted/40 relative h-[300px] flex items-center justify-center">
              <div className="relative w-full max-w-sm mx-auto">
                {/* Patient Message */}
                <motion.div
                  className="absolute left-0 top-0 w-[70%] bg-card rounded-lg shadow-md p-3 border"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{visualizationTexts.chat.patient}</p>
                      <p className="text-xs text-muted-foreground">{visualizationTexts.chat.todayAt}, 10:15 AM</p>
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-2 text-sm">
                    {visualizationTexts.chat.patientMessage}
                  </div>
                </motion.div>
                
                {/* Doctor Response */}
                <motion.div
                  className="absolute right-0 bottom-0 w-[70%] bg-card rounded-lg shadow-md p-3 border"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", delay: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{visualizationTexts.chat.doctorTitle}</p>
                      <p className="text-xs text-muted-foreground">{visualizationTexts.chat.todayAt}, 10:16 AM</p>
                    </div>
                  </div>
                  <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-2 text-sm">
                    {visualizationTexts.chat.doctorMessage}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Unified Patient Record System */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl overflow-hidden shadow-sm border"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{t('landing.solution.features.availability.title')}</h3>
              <p className="text-muted-foreground mb-4">{t('landing.solution.features.availability.description')}</p>
            </div>
            
            <div className="p-6 bg-muted/40 relative h-[300px] flex items-center justify-center">
              {/* Patient Record Interface */}
              <motion.div
                className="w-full max-w-sm bg-card rounded-lg shadow-md p-4 border"
                animate={{ scale: [1, 1.01, 1] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <User className="h-5 w-5 text-purple-500 dark:text-purple-300" />
                    </div>
                    <div>
                      <p className="font-medium">{visualizationTexts.patientRecord.patientName}</p>
                      <p className="text-xs text-muted-foreground">{visualizationTexts.patientRecord.patientId}: #27859</p>
                    </div>
                  </div>
                  <div className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground text-xs px-2 py-1 rounded font-medium">
                    {visualizationTexts.patientRecord.completeRecord}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="border rounded p-3">
                    <p className="text-xs text-muted-foreground mb-1">{visualizationTexts.patientRecord.lastVisit}</p>
                    <p className="text-sm font-medium">{visualizationTexts.patientRecord.date1}</p>
                  </div>
                  <div className="border rounded p-3">
                    <p className="text-xs text-muted-foreground mb-1">{visualizationTexts.patientRecord.nextAppointment}</p>
                    <p className="text-sm font-medium">{visualizationTexts.patientRecord.date2}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    <span className="text-sm">{visualizationTexts.patientRecord.medicalHistory}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-green-500 dark:text-green-400" />
                    <span className="text-sm">{visualizationTexts.patientRecord.recentMessages}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                    <span className="text-sm">{visualizationTexts.patientRecord.appointmentHistory}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Intelligent Schedule Optimization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl overflow-hidden shadow-sm border"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{t('landing.solution.features.multilingual.title')}</h3>
              <p className="text-muted-foreground mb-4">{t('landing.solution.features.multilingual.description')}</p>
            </div>
            
            <div className="p-6 bg-muted/40 relative h-[300px] flex items-center justify-center">
              {/* Calendar Interface */}
              <motion.div
                className="w-full max-w-sm bg-card rounded-lg shadow-md border"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
              >
                <div className="border-b p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                    <span className="font-medium">{visualizationTexts.calendar.scheduleOptimization}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{visualizationTexts.calendar.month}</div>
                </div>
                
                <div className="grid grid-cols-5 gap-2 p-3">
                  <div className="text-center p-2">
                    <p className="text-xs text-muted-foreground">{visualizationTexts.calendar.days.mon}</p>
                    <p className="text-sm font-medium">18</p>
                  </div>
                  <div className="text-center p-2">
                    <p className="text-xs text-muted-foreground">{visualizationTexts.calendar.days.tue}</p>
                    <p className="text-sm font-medium">19</p>
                  </div>
                  <div className="text-center p-2 bg-primary/10 dark:bg-primary/20 rounded-md">
                    <p className="text-xs text-primary dark:text-primary-foreground">{visualizationTexts.calendar.days.wed}</p>
                    <p className="text-sm font-medium text-primary dark:text-primary-foreground">20</p>
                  </div>
                  <div className="text-center p-2">
                    <p className="text-xs text-muted-foreground">{visualizationTexts.calendar.days.thu}</p>
                    <p className="text-sm font-medium">21</p>
                  </div>
                  <div className="text-center p-2">
                    <p className="text-xs text-muted-foreground">{visualizationTexts.calendar.days.fri}</p>
                    <p className="text-sm font-medium">22</p>
                  </div>
                </div>
                
                <div className="p-3 space-y-2">
                  <motion.div 
                    className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md p-2 flex items-center justify-between"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
                  >
                    <div>
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">{visualizationTexts.calendar.consultation}</p>
                      <p className="text-xs text-green-600 dark:text-green-400">{visualizationTexts.calendar.time1}</p>
                    </div>
                    <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                  </motion.div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-md p-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{visualizationTexts.calendar.followUp}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{visualizationTexts.calendar.time2}</p>
                  </div>
                  
                  <motion.div
                    className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-2 flex items-center justify-between"
                    animate={{ x: [0, -3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", delay: 0.5 }}
                  >
                    <div>
                      <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">{visualizationTexts.calendar.newPatient}</p>
                      <p className="text-xs text-yellow-600 dark:text-yellow-400">{visualizationTexts.calendar.time3}</p>
                    </div>
                    <Bell className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Clinical Documentation Automation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl overflow-hidden shadow-sm border"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{t('landing.solution.features.cost.title')}</h3>
              <p className="text-muted-foreground mb-4">{t('landing.solution.features.cost.description')}</p>
            </div>
            
            <div className="p-6 bg-muted/40 relative h-[300px] flex items-center justify-center">
              {/* Documentation Interface */}
              <motion.div
                className="w-full max-w-sm bg-card rounded-lg shadow-md border"
                animate={{ scale: [1, 1.01, 1] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", delay: 1 }}
              >
                <div className="border-b p-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  <span className="font-medium">{visualizationTexts.documentation.clinicalDocumentation}</span>
                </div>
                
                <div className="p-4 space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{visualizationTexts.documentation.patient}</p>
                    <p className="text-sm font-medium">{visualizationTexts.documentation.patientName}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{visualizationTexts.documentation.assessment}</p>
                    <div className="bg-muted rounded-md p-2">
                      <motion.div 
                        className="h-3 bg-primary/30 dark:bg-primary/40 rounded-full mb-1.5 w-0"
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                      />
                      <motion.div 
                        className="h-3 bg-primary/30 dark:bg-primary/40 rounded-full mb-1.5 w-0"
                        animate={{ width: ["0%", "85%"] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, delay: 0.3 }}
                      />
                      <motion.div 
                        className="h-3 bg-primary/30 dark:bg-primary/40 rounded-full mb-1.5 w-0"
                        animate={{ width: ["0%", "70%"] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, delay: 0.6 }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-md px-3 py-1.5 text-xs font-medium text-primary dark:text-primary-foreground flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5" />
                      <span>{visualizationTexts.documentation.automaticallyGenerated}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <FileText className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}