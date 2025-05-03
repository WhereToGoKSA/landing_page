'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled status for header background
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Update active section based on scroll position
      const sections = ['contact', 'events', 'nearby', 'hero'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Disable scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [scrolled, isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Animation variants
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.7
      }
    }
  };

  const navLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: custom * 0.1
      }
    }),
    hover: { 
      scale: 1.1,
      y: -2,
      color: 'var(--accent)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: 300 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: 300,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const menuButtonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.9 }
  };

  const navItems = [
    { id: 'hero', label: 'الرئيسية' },
    { id: 'nearby', label: 'أماكن قريبة' },
    { id: 'events', label: 'فعاليات' },
    { id: 'contact', label: 'اكتشف شخصيتك' }
  ];

  return (
    <motion.header
      className={`fixed top-0 right-0 left-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 30,
              delay: 0.2
            }
          }}
        >
          <a href="#" className="text-primary font-bold text-xl relative overflow-hidden group">
            <motion.div
              className="absolute inset-0 bg-accent/10 rounded-lg -z-10"
              initial={{ scale: 0, borderRadius: '50%' }}
              whileHover={{ 
                scale: 1.5, 
                borderRadius: '10%',
                transition: { duration: 0.4 }
              }}
            />
            <Image
              src="https://placehold.co/150x50"
              alt="علـى ويــن؟"
              width={150}
              height={50}
              priority
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 space-x-reverse">
          {navItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className={`py-2 px-3 font-medium rounded-md transition-colors relative ${
                activeSection === item.id 
                  ? 'text-accent' 
                  : 'text-primary'
              }`}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={navLinkVariants}
            >
              {activeSection === item.id && (
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  layoutId="activeSection"
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30
                  }}
                />
              )}
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.div 
          className="md:hidden"
          variants={menuButtonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <button
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="text-accent p-2 rounded-full bg-white/30 backdrop-blur-sm shadow-sm"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-40"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: '100vh',
              width: '100vw'
            }}
          >
            <div className="container mx-auto px-6 pt-24">
              <nav className="flex flex-col space-y-6 items-center">
                {navItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-xl font-medium py-3 px-6 rounded-lg transition-colors ${
                      activeSection === item.id 
                        ? 'text-accent bg-accent/10' 
                        : 'text-primary hover:text-accent'
                    }`}
                    onClick={toggleMenu}
                    variants={menuItemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                {/* Exit/Close Button */}
                <motion.button
                  className="mt-4 text-xl font-medium py-3 px-6 rounded-lg text-white bg-accent transition-colors"
                  onClick={toggleMenu}
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.05, backgroundColor: 'var(--primary)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  إغلاق
                </motion.button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}