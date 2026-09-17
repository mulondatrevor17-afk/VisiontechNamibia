import React from 'react';
import { motion, useScroll, useSpring, Variants } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  delay?: number;
  scale?: number;
  blur?: boolean;
  once?: boolean;
  className?: string;
  viewportAmount?: number | 'some' | 'all';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  distance = 35,
  duration = 0.6,
  delay = 0,
  scale = 1,
  blur = false,
  once = true,
  className = '',
  viewportAmount = 0.15,
}) => {
  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      case 'none':
        return {};
      default:
        return { y: distance };
    }
  };

  const initialValues = {
    opacity: 0,
    ...getOffset(),
    ...(scale !== 1 ? { scale } : {}),
    ...(blur ? { filter: 'blur(8px)' } : {}),
  };

  const animateValues = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  };

  return (
    <motion.div
      initial={initialValues}
      whileInView={animateValues}
      viewport={{ once, amount: viewportAmount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger Container for list & grid items
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
  once?: boolean;
  viewportAmount?: number | 'some' | 'all';
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerChildren = 0.12,
  delayChildren = 0.05,
  className = '',
  once = true,
  viewportAmount = 0.1,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: viewportAmount }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger Item child component
interface StaggerItemProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  scale?: number;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  direction = 'up',
  distance = 30,
  scale = 0.96,
  className = '',
}) => {
  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      case 'none':
        return {};
      default:
        return { y: distance };
    }
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      ...getOffset(),
      scale,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

// Top Scroll Progress Bar Component
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#38bdf8] via-purple-500 to-emerald-400 z-50 origin-left shadow-[0_0_10px_#38bdf8]"
      style={{ scaleX }}
    />
  );
};
