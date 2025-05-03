'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Stat = {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
};

type AnalyticsProps = {
  title: string;
  subtitle: string;
  stats: Stat[];
};

export function Analytics({ title, subtitle, stats = [] }: AnalyticsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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

  const countVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      }
    }
  };

  return (
    <section id="analytics" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-background/95"></div>
      <div className="absolute -z-10 top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(50%_50%_at_50%_50%,white,transparent)]">
        <svg className="absolute inset-0 h-full w-full stroke-primary/10" aria-hidden="true">
          <defs>
            <pattern id="pattern-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M.5 40V.5H40" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#pattern-grid)" />
        </svg>
      </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {Array.isArray(stats) && stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div 
                className="text-5xl font-bold mb-2 text-primary flex items-center justify-center"
                variants={countVariants}
              >
                {stat.prefix && <span>{stat.prefix}</span>}
                <span>{stat.value}</span>
                {stat.suffix && <span>{stat.suffix}</span>}
              </motion.div>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}