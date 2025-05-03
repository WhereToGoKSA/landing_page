'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useRef } from 'react';

type NearbyAreaItem = {
  id: number;
  name: string;
  description: string;
  distance: string;
  image: string;
  link?: string; // Optional link property
};

type NearbyAreasProps = {
  areas: NearbyAreaItem[];
};

export function NearbyAreas({ areas }: NearbyAreasProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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

  // Animation variants for the description
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

  // Animation variants for grid container
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.5
      }
    }
  };

  // Animation variants for individual cards
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 15
      }
    }
  };

  // Animation variants for the image
  const imageVariants = {
    hover: {
      scale: 1.12,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Animation variants for button
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1, 
      color: 'var(--accent)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section id="nearby" className="py-16 bg-background overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-primary inline-block"
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <span className="relative">
              أماكن قريبة منك
              <motion.span 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-accent/40 rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              />
            </span>
          </motion.h2>
          
          <motion.p
            className="text-lg mb-8 max-w-2xl mx-auto"
            variants={descriptionVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            اكتشف أماكن رائعة للجلوس والاستمتاع بوقتك على مقربة منك
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={gridContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {areas.map((area) => (
            <motion.div
              key={area.id}
              className="bg-white rounded-xl overflow-hidden relative group"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-12 h-12 bg-accent/20 rounded-full z-0"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
              <motion.div 
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/10 rounded-full z-0"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
              
              <div className="relative h-48 overflow-hidden">
                <motion.div
                  className="w-full h-full"
                  variants={imageVariants}
                >
                  <Image
                    src={area.image}
                    alt={area.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="transition-all"
                  />
                </motion.div>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-bold mb-3 text-primary">{area.name}</h3>
                <p className="text-gray-700 mb-4 line-clamp-2">{area.description}</p>
                <div className="flex items-center justify-between">
                  <motion.span 
                    className="flex items-center text-accent"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <MapPin size={18} className="ml-1" />
                    <span className="text-sm">يبعد {area.distance}</span>
                  </motion.span>
                  
                  {area.link && (
                    <motion.div>
                      <Link href={area.link} target="_blank" rel="noopener noreferrer">
                        <motion.button
                          className="text-sm text-primary font-medium relative"
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={() => {
                            if (window.gtag) {
                              window.gtag('event', 'view_location', {
                                event_category: 'Location',
                                event_label: area.name,
                              });
                            }
                          }}
                        >
                          عرض الخريطة
                          <motion.span 
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                            initial={{ width: 0 }}
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.button>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}