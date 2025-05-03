'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay, { AutoplayType } from 'embla-carousel-autoplay';

type EventItem = {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  link?: string;
};

type EventsProps = {
  events: EventItem[];
  categories: string[];
  exploreCta: string;
};

export function Events({ events, categories, exploreCta }: EventsProps) {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const autoplay = useRef<AutoplayType | null>(null);

  const autoplayPlugin = useMemo(() => Autoplay(
    { delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }
  ), []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', direction: 'rtl', draggable: false } as EmblaOptionsType,
    [autoplayPlugin]
  );

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const filteredEvents = activeCategory === 'الكل'
    ? events
    : events.filter(event => event.category === activeCategory);

  const stopAndResetAutoplay = useCallback(() => {
    if (!emblaApi || !autoplay.current) return;
    autoplay.current.stop();
  }, [emblaApi]);

  const startAutoplay = useCallback(() => {
    if (!emblaApi || !autoplay.current) return;
    if (!autoplay.current.isPlaying()) {
      autoplay.current.play();
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    stopAndResetAutoplay();
    emblaApi.scrollPrev();
  }, [emblaApi, stopAndResetAutoplay]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    stopAndResetAutoplay();
    emblaApi.scrollNext();
  }, [emblaApi, stopAndResetAutoplay]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    autoplay.current = emblaApi.plugins().autoplay as AutoplayType;
    if (!autoplay.current) {
      return;
    }

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('pointerDown', stopAndResetAutoplay);

    const rafId = requestAnimationFrame(() => {
      if (emblaApi) {
        emblaApi.reInit();
        if (autoplay.current) {
          startAutoplay();
        }
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (emblaApi) {
        emblaApi.off('select', onSelect);
        emblaApi.off('reInit', onSelect);
        emblaApi.off('pointerDown', stopAndResetAutoplay);
      }
    };
  }, [emblaApi, onSelect, filteredEvents, startAutoplay, stopAndResetAutoplay]);

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 0.2
      }
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 20,
        delay: 0.4
      }
    }
  };

  const categoryContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.6
      }
    }
  };

  const categoryButtonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    },
    tap: { scale: 0.95 }
  };

  const eventCardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
      }
    },
    hover: {
      y: -10,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    }
  };

  const calendarVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: [0, -10, 5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      backgroundColor: 'var(--primary)',
      color: 'white',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section id="events" className="py-20 bg-background overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-primary"
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            استكشف الفعاليات
          </motion.h2>
          
          <motion.p
            className="text-lg mb-10 max-w-2xl mx-auto"
            variants={descriptionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            تعرف على أحدث الفعاليات والمناسبات في مدينتك
          </motion.p>
        </div>

        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-10 relative"
          variants={categoryContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={categoryButtonVariants}
              whileTap="tap"
              className={`px-5 py-2.5 rounded-full whitespace-nowrap font-medium text-sm transition-all relative ${
                activeCategory === category
                  ? 'text-white bg-primary'
                  : 'bg-secondary text-primary hover:bg-primary/10'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
              {activeCategory === category && (
                <motion.span
                  className="absolute inset-0 bg-accent rounded-full -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence>
          {filteredEvents.length > 0 && (
            <motion.div
              className="flex justify-center items-center gap-4 mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.1 }}
            >
              <motion.button
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                className="p-2 rounded-full bg-secondary hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                whileTap={{ scale: 0.9 }}
                aria-label="Previous Event"
              >
                <ChevronRight size={20} className="text-primary" />
              </motion.button>
              <motion.button
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                className="p-2 rounded-full bg-secondary hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                whileTap={{ scale: 0.9 }}
                aria-label="Next Event"
              >
                <ChevronLeft size={20} className="text-primary" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden embla"
            ref={emblaRef}
            onMouseLeave={startAutoplay}
          >
            {filteredEvents.length === 0 ? (
              <motion.div 
                className="w-full py-10 text-center text-primary/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                لا توجد فعاليات في هذه الفئة حالياً
              </motion.div>
            ) : (
              <motion.div
                className="embla__container flex gap-6 pb-6"
              >
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="embla__slide min-w-[300px] max-w-[320px] bg-white rounded-xl overflow-hidden flex-shrink-0 relative group cursor-grab"
                    variants={eventCardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    custom={index}
                    whileHover="hover"
                  >
                    <div className="relative h-[200px] overflow-hidden">
                      <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.07 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="transition-all"
                        />
                      </motion.div>
                      
                      <motion.div
                        className="absolute top-4 right-4 px-3 py-1 bg-accent/90 text-white text-xs font-medium rounded-full backdrop-blur-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        {event.category}
                      </motion.div>
                      
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    
                    <div className="p-6 relative">
                      <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">
                        {event.title}
                      </h3>
                      
                      <motion.div 
                        className="flex items-center mb-5 text-gray-600"
                        variants={calendarVariants}
                        initial="initial"
                        whileHover="hover"
                      >
                        <Calendar size={16} className="ml-2 text-accent" />
                        <span className="text-sm">{event.date}</span>
                      </motion.div>
                      
                      {event.link ? (
                        <Link href={event.link} target="_blank" rel="noopener noreferrer">
                          <motion.button
                            className="flex items-center justify-center w-full bg-secondary text-primary py-2.5 px-4 rounded-lg font-medium relative overflow-hidden"
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                          >
                            <span className="relative z-10 flex items-center">
                              {exploreCta}
                              <motion.span
                                initial={{ x: 0 }}
                                whileHover={{ x: 3 }}
                                transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.6 }}
                              >
                                <ArrowUpRight size={16} className="mr-1 relative" />
                              </motion.span>
                            </span>
                          </motion.button>
                        </Link>
                      ) : (
                        <motion.button
                          className="flex items-center justify-center w-full bg-gray-100 text-gray-400 py-2.5 px-4 rounded-lg font-medium relative overflow-hidden cursor-not-allowed"
                          initial="initial"
                          animate={{ scale: 1 }}
                        >
                          <span className="relative z-10 flex items-center">
                            قريباً
                          </span>
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}