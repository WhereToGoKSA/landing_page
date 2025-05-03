'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion'; // Import Variants
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAnalytics } from '../hooks/useAnalytics';

type HeroProps = {
  appName: string;
  tagline: string;
  description: string;
  ctaText: string;
};

export function Hero({ appName, tagline, description, ctaText }: HeroProps) {
  const [isInView, setIsInView] = useState(false);
  const { trackCTAClick, trackSocialShare } = useAnalytics();
  
  useEffect(() => {
    // Set animation to start after a short delay when component mounts
    const timer = setTimeout(() => setIsInView(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Text animation variants with staggered children
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
    hidden: { opacity: 0, y: 30 },
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

  // Image animation variants with floating effect
  const imageVariants: Variants = { // Explicitly type the variants
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse", // This should now be correctly typed
        ease: "easeInOut",
      },
    },
  };

  // Button hover animation
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  // Background circles animation
  const circleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 0.8, 
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:py-36 bg-gradient-to-b from-background to-background/95 overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/10 -z-10"
        initial="hidden"
        animate="visible"
        variants={circleVariants}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-accent/10 -z-10"
        initial="hidden"
        animate="visible"
        variants={circleVariants}
        transition={{ delay: 0.3 }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-secondary/10 -z-10"
        initial="hidden"
        animate="visible"
        variants={circleVariants}
        transition={{ delay: 0.6 }}
      />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image (Left in RTL) */}
          <motion.div
            className="lg:flex-1 order-2 lg:order-1 mt-10 lg:mt-0"
            initial="hidden"
            animate={isInView ? ["visible", "float"] : "hidden"}
            variants={imageVariants}
          >
            <div className="relative">
              {/* Multiple decorative background elements for depth */}
              <motion.div 
                className="absolute -z-10 rounded-full bg-primary/20 w-[90%] h-[90%] right-0 bottom-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 0.6, 
                  scale: 1,
                  rotate: 10
                }}
                transition={{ 
                  duration: 1.5,
                  delay: 0.3,
                  ease: "easeOut"
                }}
              />
              <motion.div 
                className="absolute -z-10 rounded-full bg-accent/10 w-[70%] h-[70%] left-0 top-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 0.4, 
                  scale: 1,
                  rotate: -5
                }}
                transition={{ 
                  duration: 1.2,
                  delay: 0.5,
                  ease: "easeOut"
                }}
              />
              
              {/* Phone mockup with shadow */}
              <div className="relative mx-auto max-w-[320px]">
                <div className="absolute inset-0 rounded-[3rem] shadow-2xl shadow-primary/20 transform translate-x-2 translate-y-4 -z-10" />
                <Image
                  src="https://placehold.co/400x600"
                  alt="تطبيق على وين"
                  width={400}
                  height={600}
                  className="rounded-[2.5rem] shadow-lg z-10 relative"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Text (Right in RTL) */}
          <motion.div 
            className="lg:flex-1 order-1 lg:order-2 text-center lg:text-right"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-accent arabic-text bg-clip-text text-transparent bg-gradient-to-l from-accent to-accent/80">
                {appName}
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-2xl md:text-3xl font-medium mb-6 text-primary">
                {tagline}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-lg mb-8 leading-relaxed arabic-text max-w-2xl mx-auto lg:mr-0">
                {description}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                className="bg-primary hover:bg-accent text-white font-medium py-3 px-8 rounded-full transition-colors text-lg shadow-md shadow-primary/20"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => trackCTAClick(ctaText, 'hero')}
              >
                {ctaText}
              </motion.button>
            </motion.div>
            
            {/* Mobile app stores */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="#" className="inline-block" onClick={() => trackCTAClick('App Store', 'hero')}>
                <Image 
                  src="https://placehold.co/150x50?text=App+Store" 
                  alt="App Store" 
                  width={150} 
                  height={50}
                  className="h-12 w-auto"
                />
              </Link>
              <Link href="#" className="inline-block" onClick={() => trackCTAClick('Play Store', 'hero')}>
                <Image 
                  src="https://placehold.co/150x50?text=Play+Store" 
                  alt="Play Store" 
                  width={150} 
                  height={50}
                  className="h-12 w-auto"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}