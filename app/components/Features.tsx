'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Compass, 
  CalendarCheck, 
  Star, 
  Bell, 
  Map, 
  Share2 
} from 'lucide-react';

type Feature = {
  icon: string;
  title: string;
  description: string;
};

type FeaturesProps = {
  title: string;
  subtitle: string;
  features: Feature[];
};

export function Features({ title, subtitle, features }: FeaturesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Main container animations
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

  // Text and heading animations
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

  // Card animations
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        delay: i * 0.15
      },
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      borderColor: "var(--accent)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  // Icon animations
  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -30,
      opacity: 0 
    },
    visible: (i: number) => ({
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: i * 0.15 + 0.2
      }
    }),
    hover: {
      scale: 1.15,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  const decorVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 0.6, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  // Get the appropriate Lucide icon for each feature
  const getLucideIcon = (index: number, title: string) => {
    // Match icons based on title or index
    if (title.includes("اكتشاف")) return <Compass size={42} className='text-white' />;
    if (title.includes("أحداث") || title.includes("فعاليات")) return <CalendarCheck size={42} className='text-white' />;
    if (title.includes("تقييمات")) return <Star size={42} className='text-white' />;
    if (title.includes("تنبيهات") || title.includes("إشعارات")) return <Bell size={42} className='text-white' />;
    if (title.includes("خرائط")) return <Map size={42} className='text-white' />;
    if (title.includes("مشاركة")) return <Share2 size={42}  className='text-white '/>;
    
    // Fallback if no match
    const fallbackIcons = [Compass, CalendarCheck, Star, Bell, Map, Share2];
    const FallbackIcon = fallbackIcons[index % fallbackIcons.length];
    return <FallbackIcon size={42} />;
  };

  // Generate unique SVG pattern for each feature
  const getUniqueSvgPattern = (index: number) => {
    // Different patterns for each feature
    const patterns = [
      // Pattern 1: Curved lines
      <svg key="pattern1" width="80" height="80" viewBox="0 0 80 80" className="absolute bottom-0 right-0 text-accent/20">
        <motion.path 
          d="M80 0C80 44.1828 44.1828 80 0 80" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.5 }}
        />
        <motion.path 
          d="M80 20C80 54.1828 54.1828 80 20 80" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.5 }}
        />
        <motion.path 
          d="M80 40C80 64.1828 64.1828 80 40 80" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.5 }}
        />
      </svg>,
      
      // Pattern 2: Grid pattern
      <svg key="pattern2" width="80" height="80" viewBox="0 0 80 80" className="absolute bottom-0 right-0 text-accent/20">
        <motion.path 
          d="M20 0V80M40 0V80M60 0V80M0 20H80M0 40H80M0 60H80" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.5 }}
        />
      </svg>,
      
      // Pattern 3: Radial lines
      <svg key="pattern3" width="80" height="80" viewBox="0 0 80 80" className="absolute bottom-0 right-0 text-accent/20">
        <motion.path 
          d="M40 40L80 80M40 40L0 80M40 40L0 0M40 40L80 0" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.5 }}
        />
      </svg>,
      
      // Pattern 4: Circles
      <svg key="pattern4" width="80" height="80" viewBox="0 0 80 80" className="absolute bottom-0 right-0 text-accent/20">
        <motion.circle 
          cx="40" 
          cy="40" 
          r="38" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.5 }}
        />
        <motion.circle 
          cx="40" 
          cy="40" 
          r="25" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.5 }}
        />
        <motion.circle 
          cx="40" 
          cy="40" 
          r="12" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.5 }}
        />
      </svg>,
      
      // Pattern 5: Zigzag
      <svg key="pattern5" width="80" height="80" viewBox="0 0 80 80" className="absolute bottom-0 right-0 text-accent/20">
        <motion.path 
          d="M0 60L20 20L40 60L60 20L80 60" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.5 }}
        />
        <motion.path 
          d="M0 40L20 0L40 40L60 0L80 40" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.5 }}
        />
      </svg>,
      
      // Pattern 6: Dots
      <svg key="pattern6" width="80" height="80" viewBox="0 0 80 80" className="absolute bottom-0 right-0 text-accent/20">
        <motion.path 
          d="M10 10 L10 10 M30 10 L30 10 M50 10 L50 10 M70 10 L70 10 M20 30 L20 30 M40 30 L40 30 M60 30 L60 30 M10 50 L10 50 M30 50 L30 50 M50 50 L50 50 M70 50 L70 50 M20 70 L20 70 M40 70 L40 70 M60 70 L60 70" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.5 }}
        />
      </svg>
    ];
    
    return patterns[index % patterns.length];
  };

  // Create pairs of features for alternating layout
  const featurePairs = [];
  for (let i = 0; i < features.length; i += 2) {
    featurePairs.push(features.slice(i, i + 2));
  }

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background decorative elements with more visual presence */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 to-background"></div>
      
      {/* Add animated pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <motion.div 
          className="absolute inset-0"
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: '100% 100%' }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 20%, var(--accent) 0%, transparent 10%), radial-gradient(circle at 70% 60%, var(--primary) 0%, transparent 8%), radial-gradient(circle at 40% 80%, var(--accent) 0%, transparent 12%)',
            backgroundSize: '100% 100%',
          }}
        />
      </div>
      
      {/* Grid pattern overlay - moved to only cover the right side of the screen */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 -z-10 opacity-30">
        <svg className="absolute inset-0 h-full w-full stroke-primary/10" aria-hidden="true">
          <defs>
            <pattern id="features-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M.5 60V.5H60" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#features-grid)" />
        </svg>
      </div>
      
      <motion.div 
        className="absolute top-40 left-40 w-72 h-72 rounded-full bg-accent/10 blur-3xl -z-10"
        variants={decorVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary/15 blur-3xl -z-10"
        variants={decorVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.3 }}
      />

      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-4xl md:text-5xl font-bold mb-6 text-accent relative inline-block"
          >
            {title}
            <motion.span 
              className="absolute -bottom-5 left-0 right-0 h-1.5 bg-gradient-to-r from-primary/40 via-accent to-primary/40 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg max-w-2xl mx-auto text-primary/90">
            {subtitle}
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {featurePairs.map((pair, pairIndex) => (
            <div 
              key={pairIndex}
              className={`flex flex-col ${pairIndex % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 mb-20 last:mb-0`}
            >
              {pair.map((feature, index) => {
                const globalIndex = pairIndex * 2 + index;
                return (
                  <motion.div
                    key={globalIndex}
                    className="lg:flex-1 relative group"
                    custom={globalIndex}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    {/* Visible gradient glow effect even without hover */}
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 rounded-2xl opacity-40 group-hover:opacity-100 blur-sm group-hover:blur transition-all duration-300" />
                    
                    {/* Add diagonal accent stripe */}
                    <div className="absolute top-0 right-0 w-20 h-40 bg-accent/10 -rotate-45 translate-x-10 -translate-y-10 rounded-full blur-md" />
                    
                    <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 h-full flex flex-col items-center lg:items-start shadow-xl shadow-primary/5">
                      {/* Unique SVG background pattern */}
                      <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden opacity-50">
                        {getUniqueSvgPattern(globalIndex)}
                      </div>
                      
                      {/* Feature icon with attractive gradient background but white icons */}
                      <motion.div 
                        className="w-24 h-24 mb-8 relative"
                        variants={iconVariants}
                        custom={globalIndex}
                        whileHover="hover"
                      >
                        {/* Restore original gradient layers for visual appeal */}
                        <div className="absolute inset-0 scale-[0.85] bg-gradient-to-tr from-primary/20 to-accent/20 opacity-30 rounded-2xl rotate-6 group-hover:rotate-12 transition-all duration-300" />
                        <div className="absolute inset-0 scale-[0.9] bg-gradient-to-tr from-primary/30 to-accent/30 opacity-40 rounded-2xl rotate-3 group-hover:rotate-6 transition-all duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-accent/50 rounded-2xl shadow-lg flex items-center justify-center">
                          {/* Remove backdrop-blur-sm but keep the container for structure */}
                          <div className="absolute inset-1 bg-black/10 rounded-xl flex items-center justify-center" />
                          {getLucideIcon(globalIndex, feature.title)}
                        </div>
                      </motion.div>
                      
                      <motion.h3 
                        className="text-2xl font-bold mb-4 text-center lg:text-right bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: globalIndex * 0.15 + 0.3 }}
                      >
                        {feature.title}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-center lg:text-right text-primary/90 leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: globalIndex * 0.15 + 0.4 }}
                      >
                        {feature.description}
                      </motion.p>
                      
                      {/* Add a small pill badge for visual interest */}
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full px-3 py-1 text-xs backdrop-blur-sm border border-white/10">
                        مميزة
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}