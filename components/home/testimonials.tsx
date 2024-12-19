'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';
import { cn } from '@/lib/utils';
import Swiper from 'swiper';
import { Navigation, EffectCreative } from 'swiper/modules';
import 'swiper/css';

export function Testimonials() {
  const { t } = useTranslations();
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    swiperInstance.current = new Swiper(swiperRef.current, {
      modules: [Navigation, EffectCreative],
      slidesPerView: 1,
      effect: 'creative',
      creativeEffect: {
        prev: {
          translate: ['-120%', 0, -500],
          opacity: 0,
        },
        next: {
          translate: ['120%', 0, -500],
          opacity: 0,
        },
      },
      speed: 1000,
      navigation: {
        nextEl: '.testimonial-next',
        prevEl: '.testimonial-prev',
      },
    });

    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy();
      }
    };
  }, []);

  const testimonials = [
    {
      quote: t('home.testimonials.quote1'),
      author: t('home.testimonials.author1'),
      position: t('home.testimonials.position1'),
      company: 'Webflow',
      video: '/videos/testimonial1.mp4'
    },
    {
      quote: t('home.testimonials.quote2'),
      author: t('home.testimonials.author2'),
      position: t('home.testimonials.position2'),
      company: 'Relume',
      video: '/videos/testimonial2.mp4'
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={swiperRef} className="overflow-hidden">
          <div className="swiper-wrapper">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="swiper-slide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Video Section */}
                  <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden shadow-2xl">
                    <button 
                      className="absolute inset-0 w-full h-full flex items-center justify-center group"
                      aria-label={t('home.testimonials.playVideo')}
                    >
                      <div className="w-20 h-20 rounded-full flex items-center justify-center bg-background/10 group-hover:bg-background/20 transition-all duration-300">
                        <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-foreground ml-1" />
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Text Content */}
                  <div>
                    <div className="flex mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="mb-8">
                      <p className="text-2xl font-medium mb-8">
                        "{testimonial.quote}"
                      </p>
                      <footer className="flex items-center gap-8">
                        <div>
                          <cite className="font-semibold not-italic block">
                            {testimonial.author}
                          </cite>
                          <span className="text-muted-foreground">{testimonial.position}</span>
                        </div>
                        <div className="bg-muted px-6 py-2 rounded-lg">
                          <span className="font-medium">{testimonial.company}</span>
                        </div>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-end gap-3 mt-8">
            <button 
              className="testimonial-prev w-12 h-12 rounded-full border-2 border-muted flex items-center justify-center hover:border-foreground transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={t('home.testimonials.previous')}
            >
              <ChevronLeft className={cn(
                "w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors"
              )} />
            </button>
            <button 
              className="testimonial-next w-12 h-12 rounded-full border-2 border-muted flex items-center justify-center hover:border-foreground transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={t('home.testimonials.next')}
            >
              <ChevronRight className={cn(
                "w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors"
              )} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}