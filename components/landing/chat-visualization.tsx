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
        { text: "Hi! I'd like to make a dinner reservation", isAI: false },
        { text: "I'll help you with that right away! What time would you prefer?", isAI: true },
        { text: "Around 8 PM for 4 people", isAI: false },
        { text: "Perfect! I've confirmed a table for 4 at 8 PM. Would you like me to send you the confirmation details?", isAI: true }
      ]
    },
    {
      platform: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-500',
      messages: [
        { text: "Do you have any appointments available tomorrow?", isAI: false },
        { text: "Let me check our schedule. We have slots at 2 PM and 4 PM tomorrow.", isAI: true },
        { text: "2 PM works for me!", isAI: false },
        { text: "Great! I've booked you for 2 PM tomorrow. I'll send you a confirmation message with all the details.", isAI: true }
      ]
    },
    {
      platform: 'Email',
      icon: Mail,
      color: 'bg-blue-500',
      messages: [
        { text: "I need to track my order #12345", isAI: false },
        { text: "I've found your order. It's currently out for delivery.", isAI: true },
        { text: "What's the estimated delivery time?", isAI: false },
        { text: "Your package will arrive between 2-4 PM today. Would you like me to send you the tracking link?", isAI: true }
      ]
    }
  ],
  tr: [
    {
      platform: 'WhatsApp',
      icon: MessageSquare,
      color: 'bg-green-500',
      messages: [
        { text: "Merhaba! Akşam yemeği için rezervasyon yaptırmak istiyorum", isAI: false },
        { text: "Size hemen yardımcı olayım! Hangi saati tercih edersiniz?", isAI: true },
        { text: "Akşam 8 civarı, 4 kişi için", isAI: false },
        { text: "Harika! 4 kişilik masanızı saat 20:00 için onayladım. Rezervasyon detaylarını gönderebilir miyim?", isAI: true }
      ]
    },
    {
      platform: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-500',
      messages: [
        { text: "Yarın için müsait randevunuz var mı?", isAI: false },
        { text: "Programı kontrol edeyim. Yarın için saat 14:00 ve 16:00'da boş yerimiz var.", isAI: true },
        { text: "14:00 bana uyar!", isAI: false },
        { text: "Harika! Yarın saat 14:00 için randevunuzu oluşturdum. Tüm detayları içeren bir onay mesajı gönderiyorum.", isAI: true }
      ]
    },
    {
      platform: 'Email',
      icon: Mail,
      color: 'bg-blue-500',
      messages: [
        { text: "#12345 numaralı siparişimi takip etmek istiyorum", isAI: false },
        { text: "Siparişinizi buldum. Şu anda dağıtımda.", isAI: true },
        { text: "Tahmini teslimat saati nedir?", isAI: false },
        { text: "Paketiniz bugün 14:00-16:00 arasında teslim edilecek. Takip linkini göndermemi ister misiniz?", isAI: true }
      ]
    }
  ],
  ru: [
    {
      platform: 'WhatsApp',
      icon: MessageSquare,
      color: 'bg-green-500',
      messages: [
        { text: "Здравствуйте! Хочу забронировать столик на ужин", isAI: false },
        { text: "Я помогу вам прямо сейчас! Какое время вы предпочитаете?", isAI: true },
        { text: "Около 8 вечера на 4 человека", isAI: false },
        { text: "Отлично! Я подтвердил столик на 4 человека на 20:00. Хотите, чтобы я отправил детали бронирования?", isAI: true }
      ]
    },
    {
      platform: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-500',
      messages: [
        { text: "Есть ли свободное время для записи на завтра?", isAI: false },
        { text: "Сейчас проверю расписание. У нас есть свободное время в 14:00 и 16:00.", isAI: true },
        { text: "14:00 мне подходит!", isAI: false },
        { text: "Отлично! Я записал вас на 14:00 завтра. Сейчас отправлю сообщение с подтверждением и всеми деталями.", isAI: true }
      ]
    },
    {
      platform: 'Email',
      icon: Mail,
      color: 'bg-blue-500',
      messages: [
        { text: "Хочу отследить мой заказ #12345", isAI: false },
        { text: "Я нашел ваш заказ. Он сейчас в доставке.", isAI: true },
        { text: "Какое ожидаемое время доставки?", isAI: false },
        { text: "Ваша посылка будет доставлена сегодня между 14:00 и 16:00. Хотите, чтобы я отправил ссылку для отслеживания?", isAI: true }
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
    let timeoutId: NodeJS.Timeout;

    const showNextMessage = () => {
      if (messageIndex >= scenario.messages.length) {
        timeoutId = setTimeout(() => {
          setCurrentMessages([]);
          setCurrentScenario((prev) => (prev + 1) % scenarios.length);
        }, PLATFORM_SWITCH_DELAY);
        return;
      }

      const currentMessage = scenario.messages[messageIndex];
      setIsTyping(true);

      timeoutId = setTimeout(() => {
        setIsTyping(false);
        setCurrentMessages(prev => [...prev, { ...currentMessage, platform: scenario.platform }]);
        messageIndex++;
        timeoutId = setTimeout(showNextMessage, MESSAGE_DELAY);
      }, TYPING_SPEED * 3);
    };

    timeoutId = setTimeout(showNextMessage, MESSAGE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [currentScenario, scenario, scenarios.length]);

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