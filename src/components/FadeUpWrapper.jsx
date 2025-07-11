import { motion } from 'framer-motion';

const FadeUpWrapper = ({ 
  children, 
  delay = 0, 
  duration = 0.6,
  distance = 60,
  className = "",
  ...props 
}) => {
  const fadeUpVariants = {
    hidden: {
      opacity: 0,
      y: distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth animation
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUpVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeUpWrapper;