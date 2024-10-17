import { motion } from 'framer-motion'

const NeonButton = ({ children, className = '' }) => (
    <motion.button
      className={`relative px-6 py-3 font-bold text-white rounded-lg overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  )

  export default NeonButton