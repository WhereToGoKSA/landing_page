'use client';

import Image from 'next/image';
import { Facebook, Instagram, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

type SocialItem = {
  name: string;
  url: string;
};

type FooterProps = {
  appName: string;
  social: SocialItem[];
};

export function Footer({ appName, social }: FooterProps) {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.3 });
  const [year, setYear] = useState("2025"); // Default static year for server rendering

  // Client-side only update for the year
  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'facebook':
        return <Facebook size={20} />;
      case 'x':
        return <X size={20} />;
      case 'instagram':
        return <Instagram size={20} />;
      default:
        return null;
    }
  };

  // Footer container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  // Logo and description animations
  const logoVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Navigation links animations
  // const navContainerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.08,
  //       delayChildren: 0.5
  //     }
  //   }
  // };

  // const navItemVariants = {
  //   hidden: { opacity: 0, y: -10 },
  //   visible: { 
  //     opacity: 1, 
  //     y: 0,
  //     transition: {
  //       type: 'spring',
  //       stiffness: 200,
  //       damping: 12
  //     }
  //   },
  //   hover: {
  //     scale: 1.05,
  //     y: -2,
  //     color: 'var(--accent)',
  //     transition: {
  //       type: 'spring',
  //       stiffness: 300,
  //       damping: 10
  //     }
  //   }
  // };

  // Social icons animations
  const socialContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.7
      }
    }
  };

  const socialItemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotate: -10,
      scale: 0
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10
      }
    },
    hover: {
      y: -5,
      scale: 1.2,
      backgroundColor: 'var(--accent)',
      color: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Copyright animation
  const copyrightVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        duration: 0.5
      }
    }
  };

  // Decorative elements animation
  const decorVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0 
    },
    visible: { 
      opacity: 0.5, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // const navItems = [
  //   { id: 'hero', label: 'الرئيسية' },
  //   { id: 'nearby', label: 'أماكن قريبة' },
  //   { id: 'events', label: 'فعاليات' },
  //   { id: 'contact', label: 'اكتشف شخصيتك' }
  // ];

  return (
    <footer className="bg-background text-primary py-16 relative overflow-hidden" ref={footerRef}>
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/5 -z-10"
        variants={decorVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-accent/10 -z-10"
        variants={decorVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.3 }}
      />
      
      <motion.div 
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-8 md:mb-0"
            variants={logoVariants}
          >
            <a href="#" className="text-primary font-bold text-xl mb-4 inline-block relative group">
              <motion.div 
                className="absolute inset-0 rounded-lg bg-primary/5 -z-10"
                initial={{ scale: 0, borderRadius: '50%' }}
                whileHover={{ 
                  scale: 1.2, 
                  borderRadius: '10%',
                  transition: { duration: 0.4 }
                }}
              />
              <Image
                src="/logo.png"
                alt={appName}
                width={75}
                height={25}
                className="transition-all duration-300 group-hover:scale-105"
              />
            </a>
            <motion.p 
              className="mt-4 max-w-md text-primary/80"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              تطبيق جوال يقدم توصيات بأنشطة وتجارب ممتعة بناءً على تفضيلات المستخدم؛ لمساعدة المستخدمين على اكتشاف أماكن جديدة ودعم الشركات الصغيرة
            </motion.p>
          </motion.div>

          <div className="flex flex-col items-center md:items-end">
            {/* <motion.nav 
              className="mb-8"
              variants={navContainerVariants}
            >
              <ul className="flex space-x-8 space-x-reverse">
                {navItems.map((item) => (
                  <motion.li key={item.id} variants={navItemVariants}>
                    <motion.a
                      href={`#${item.id}`}
                      className="text-primary transition-colors relative py-2 px-1"
                      whileHover="hover"
                      variants={navItemVariants}
                    >
                      {item.label}
                      <motion.span 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav> */}

            <motion.div 
              className="flex space-x-4 space-x-reverse"
              variants={socialContainerVariants}
            >
              {social.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-full text-primary transition-all"
                  aria-label={item.name}
                  variants={socialItemVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  custom={index}
                >
                  {getSocialIcon(item.name)}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="border-t border-primary/10 mt-12 pt-8 text-center text-primary/70"
          variants={copyrightVariants}
        >
          <p>
            &copy; {year} {appName}. جميع الحقوق محفوظة.
          </p>
          
          {/* Animated wave decoration */}
          <motion.div 
            className="w-full h-1 mt-6 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20"
              animate={{ 
                x: ["-100%", "100%"]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 8,
                ease: "linear"
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
}