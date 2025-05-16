
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export const ChatbotButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      whileHover={{ scale: 1.1 }}
      animate={{ y: isHovered ? -5 : 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <button 
        className="bg-edu-primary text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        aria-label="Open chat assistant"
      >
        <motion.div
          animate={{ rotate: isHovered ? [0, 15, -15, 0] : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <MessageCircle className="h-6 w-6" />
        </motion.div>
      </button>
      {isHovered && (
        <motion.div
          className="absolute bottom-full right-0 mb-2 bg-white px-3 py-1 rounded shadow-md text-sm whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Need help? Chat with us!
        </motion.div>
      )}
    </motion.div>
  );
};
