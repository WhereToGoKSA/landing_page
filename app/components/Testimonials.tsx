'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
};

type TestimonialsProps = {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
};

export function Testimonials({ title, subtitle, testimonials }: TestimonialsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    }
  };

  // Handle navigation
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Generate stars for rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    ));
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-background/90 to-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4 text-accent">
            {title}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg max-w-2xl mx-auto">
            {subtitle}
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            key={activeIndex}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-lg border border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                  <Image 
                    src={activeTestimonial.image} 
                    alt={activeTestimonial.name} 
                    width={96} 
                    height={96}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/96x96?text=${activeTestimonial.name[0]}`;
                    }}
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-right">
                <div className="flex justify-center md:justify-end mb-4">
                  {renderStars(activeTestimonial.rating)}
                </div>
                <blockquote className="text-xl italic mb-6 leading-relaxed">&quot;{activeTestimonial.quote}&quot;</blockquote>
                <div>
                  <p className="font-bold text-lg">{activeTestimonial.name}</p>
                  <p className="text-gray-400 text-sm">{activeTestimonial.role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={goToPrev}
              className="bg-primary/10 hover:bg-primary/20 text-primary rounded-full w-12 h-12 flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-primary' : 'bg-gray-400/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={goToNext}
              className="bg-primary/10 hover:bg-primary/20 text-primary rounded-full w-12 h-12 flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}