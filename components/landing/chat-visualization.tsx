'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Instagram, Mail, Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/components/providers/language-provider';

const TYPING_SPEED = 50;
const MESSAGE_DELAY = 1000;
const PLATFORM_SWITCH_DELAY = 2000;

interface Message {
  text: string;
  isAI: boolean;
  platform: string;
}

const conversationScenarios = {
  en: [
    {
      platform: 'WhatsApp',
      icon: MessageSquare,
      color: 'bg-green-500',
      messages: [
        { text: "Hi! I have a question about my upcoming rhinoplasty", isAI: false },
        { text: "Hello! I'm happy to help. What would you like to know?", isAI: true },
        { text: "What should I do to prepare for the surgery?", isAI: false },
        { text: "Here's our pre-op checklist: 1) Stop smoking 2 weeks before, 2) Avoid certain medications, 3) Arrange for someone to drive you home. Would you like me to send the full guide?", isAI: true }
      ]
    },
    {
      platform: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-500',
      messages: [
        { text: "Do you have any openings for a consultation this week?", isAI: false },
        { text: "Let me check... We have openings on Tuesday at 2 PM or Thursday at 10 AM. Would either work for you?", isAI: true },
        { text: "Thursday at 10 AM works!", isAI: false },
        { text: "Great! I've booked your consultation. You'll receive a confirmation with all details. Let me know if you have any other questions!", isAI: true }
      ]
    },
    {
      platform: 'Email',
      icon: Mail,
      color: 'bg-blue-500',
      messages: [
        { text: "I'm experiencing some swelling 3 days post-op. Is this normal?", isAI: false },
        { text: "Some swelling is normal after surgery. Is it accompanied by severe pain or fever?", isAI: true },
        { text: "No fever, just mild discomfort", isAI: false },
        { text: "That's expected. Keep your head elevated and use cold compresses. If symptoms worsen, contact us immediately. Would you like me to send post-op care instructions?", isAI: true }
      ]
    }
  ],
  tr: [
    {
      platform: 'WhatsApp',
      icon: MessageSquare,
      color: 'bg-green-500',
      messages: [
        { text: "Merhaba, yaklaşan rinoplasti ameliyatım hakkında bir sorum var", isAI: false },
        { text: "Merhaba! Yardımcı olmaktan mutluluk duyarım. Ne sormak istemiştiniz?", isAI: true },
        { text: "Ameliyata nasıl hazırlanmalıyım?", isAI: false },
        { text: "İşte ameliyat öncesi kontrol listemiz: 1) 2 hafta önce sigarayı bırakın, 2) Bazı ilaçlardan kaçının, 3) Eve götürecek birini ayarlayın. Detaylı rehberi göndermemi ister misiniz?", isAI: true }
      ]
    },
    {
      platform: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-500',
      messages: [
        { text: "Bu hafta için danışma randevunuz var mı?", isAI: false },
        { text: "Bakıyorum... Salı günü saat 14:00 veya Perşembe 10:00'da boş yerimiz var. Uygun mu?", isAI: true },
        { text: "Perşembe 10:00 uygun!", isAI: false },
        { text: "Harika! Randevunuzu oluşturdum. Tüm detayları içeren bir onay mesajı alacaksınız. Başka sorunuz varsa bana iletin!", isAI: true }
      ]
    },
    {
      platform: 'Email',
      icon: Mail,
      color: 'bg-blue-500',
      messages: [
        { text: "Ameliyattan 3 gün sonra biraz şişlik var. Bu normal mi?", isAI: false },
        { text: "Ameliyat sonrası hafif şişlik normaldir. Şiddetli ağrı veya ateş eşlik ediyor mu?", isAI: true },
        { text: "Ateş yok, sadece hafif rahatsızlık", isAI: false },
        { text: "Bu beklenen bir durum. Başınızı yüksekte tutun ve soğuk kompres uygulayın. Belirtiler kötüleşirse hemen bize ulaşın. Ameliyat sonrası bakım talimatlarını göndermemi ister misiniz?", isAI: true }
      ]
    }
  ],
  ru: [
    {
      platform: 'WhatsApp',
      icon: MessageSquare,
      color: 'bg-green-500',
      messages: [
        { text: "Здравствуйте! У меня вопрос по поводу предстоящей ринопластики", isAI: false },
        { text: "Здравствуйте! Рада вам помочь. Что вас интересует?", isAI: true },
        { text: "Как мне подготовиться к операции?", isAI: false },
        { text: "Вот наш чек-лист: 1) Прекратите курить за 2 недели, 2) Избегайте некоторых лекарств, 3) Организуйте, чтобы вас отвезли домой. Хотите, чтобы я отправил полное руководство?", isAI: true }
      ]
    },
    {
      platform: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-500',
      messages: [
        { text: "Есть ли у вас свободное время для консультации на этой неделе?", isAI: false },
        { text: "Сейчас проверю... У нас есть время во вторник в 14:00 или в четверг в 10:00. Вам подходит?", isAI: true },
        { text: "Четверг в 10:00 подходит!", isAI: false },
        { text: "Отлично! Я записал вас на консультацию. Вы получите подтверждение со всеми деталями. Если есть другие вопросы, дайте знать!", isAI: true }
      ]
    },
    {
      platform: 'Email',
      icon: Mail,
      color: 'bg-blue-500',
      messages: [
        { text: "У меня небольшая отечность через 3 дня после операции. Это нормально?", isAI: false },
        { text: "Небольшая отечность после операции - это нормально. Есть ли сильная боль или температура?", isAI: true },
        { text: "Температуры нет, только легкий дискомфорт", isAI: false },
        { text: "Это ожидаемо. Держите голову приподнятой и используйте холодные компрессы. Если симптомы ухудшатся, немедленно свяжитесь с нами. Хотите, чтобы я отправил инструкции по послеоперационному уходу?", isAI: true }
      ]
    }
  ]
};

export function ChatVisualization() {
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const { language } = useLanguage();

  const scenarios = conversationScenarios[language as keyof typeof conversationScenarios] || conversationScenarios.en;
  const scenario = scenarios[currentScenario];

  useEffect(() => {
    let messageIndex = 0;
    let timeoutId: NodeJS.Timeout | null = null;
    let isActive = true;

    const showNextMessage = () => {
      if (!isActive) return;
      
      if (messageIndex >= scenario.messages.length) {
        timeoutId = setTimeout(() => {
          if (!isActive) return;
          setCurrentMessages([]);
          setCurrentScenario((prev) => (prev + 1) % scenarios.length);
        }, PLATFORM_SWITCH_DELAY);
        return;
      }

      const currentMessage = scenario.messages[messageIndex];
      setIsTyping(true);

      timeoutId = setTimeout(() => {
        if (!isActive) return;
        setIsTyping(false);
        setCurrentMessages(prev => [...prev, { ...currentMessage, platform: scenario.platform }]);
        messageIndex++;
        timeoutId = setTimeout(showNextMessage, MESSAGE_DELAY);
      }, TYPING_SPEED * 3);
    };

    timeoutId = setTimeout(showNextMessage, MESSAGE_DELAY);

    // Clean up function
    return () => {
      isActive = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentScenario, scenario, scenarios.length, language]);

  const Icon = scenario.icon;

  return (
    <motion.div
      key={scenario.platform}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="bg-card border rounded-lg overflow-hidden shadow-2xl"
    >
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full ${scenario.color} flex items-center justify-center`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <span className="font-medium">{scenario.platform}</span>
      </div>

      {/* Chat Messages */}
      <div className="p-4 space-y-4 h-[400px] relative bg-gradient-to-b from-background to-muted/50">
        <AnimatePresence mode="popLayout">
          {currentMessages.map((message, i) => (
            <motion.div
              key={`${i}-${message.text}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
            >
              <div className="flex items-start gap-2">
                {message.isAI && (
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-primary/10">
                      <Bot className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isAI
                      ? 'bg-muted'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {message.isAI && (
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs font-medium text-primary">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
                {!message.isAI && (
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 left-4 flex items-center gap-2"
            >
              <Avatar className="w-6 h-6">
                <AvatarFallback className="bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}