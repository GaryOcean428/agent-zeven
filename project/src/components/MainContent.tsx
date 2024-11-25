import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ActivePanel } from '../App';

interface MainContentProps {
  activePanel: ActivePanel;
  children: React.ReactNode;
}

export function MainContent({ activePanel, children }: MainContentProps) {
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="h-full flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={activePanel}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}