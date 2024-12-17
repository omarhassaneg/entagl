'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslations } from '@/lib/hooks/use-translations';

export function PricingFAQ() {
  const { t } = useTranslations();

  const faqs = [
    {
      question: t('pricing.faq.billing.question'),
      answer: t('pricing.faq.billing.answer'),
    },
    {
      question: t('pricing.faq.channels.question'),
      answer: t('pricing.faq.channels.answer'),
    },
    {
      question: t('pricing.faq.cancel.question'),
      answer: t('pricing.faq.cancel.answer'),
    },
    {
      question: t('pricing.faq.support.question'),
      answer: t('pricing.faq.support.answer'),
    },
  ];

  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">{t('pricing.faq.title')}</h2>
          <p className="text-muted-foreground">{t('pricing.faq.subtitle')}</p>
        </motion.div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}