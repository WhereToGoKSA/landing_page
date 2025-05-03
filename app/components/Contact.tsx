'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';



declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: { [key: string]: unknown } 
    ) => void;
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

type ContactProps = {
  title: string;
};

export function Contact({ title }: ContactProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const scriptId = 'tally-embed-script';
    const existingScript = document.getElementById(scriptId);
    const tallyUrl = "https://tally.so/widgets/embed.js";

    const loadTally = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
      } else {
        document.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((iframe) => {
          const tallySrc = iframe.getAttribute('data-tally-src');
          if (tallySrc) {
            (iframe as HTMLIFrameElement).src = tallySrc;
          }
        });
      }
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = tallyUrl;
      script.id = scriptId;
      script.onload = loadTally;
      script.onerror = () => console.error('Failed to load Tally script.');
      document.body.appendChild(script);
    } else {
      loadTally();
    }
  }, []);

  // Animation variants for the section title
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

  // Animation variants for the embed container
  const embedContainerVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 0.5
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-background overflow-hidden relative" ref={sectionRef}>
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-32 left-10 w-32 h-32 rounded-full bg-primary/5 -z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 0.8 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-accent/10 -z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 0.6 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-primary inline-block"
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <span className="relative">
              {title}
              <motion.span 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-accent/40 rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              />
            </span>
          </motion.h2>
        </div>

        <motion.div 
          className="max-w-2xl mx-auto relative"
          variants={embedContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <iframe 
            data-tally-src="https://tally.so/embed/3qNK7Y?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
            loading="lazy" 
            width="100%" 
            height={276} // Changed height to number
            frameBorder="0" 
            marginHeight={0} // Changed to number
            marginWidth={0} // Changed to number
            title="Contact form"
            style={{ display: 'block' }}
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}