import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import avatarImage from "figma:asset/e402b202fae395b1c1a3ad5e7a300f8f32574a45.png";

interface BloomBotProps {
  message: string;
  position?: "bottom" | "top";
}

export function BloomBot({ message, position = "bottom" }: BloomBotProps) {
  const [isVisible, setIsVisible] = useState(true);

  const positionClasses = position === "top" 
    ? "fixed top-6 right-6 z-50 flex items-start gap-3 max-w-xs" 
    : "fixed bottom-6 right-6 z-50 flex items-end gap-3 max-w-xs";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className={positionClasses}
        >
          {/* Message Bubble */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl px-4 py-3 shadow-lg border-2 border-emerald-200"
          >
            <p className="text-sm text-gray-700">{message}</p>
          </motion.div>

          {/* BloomBot Avatar */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex-shrink-0"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg border-3 border-white">
              <span className="text-3xl">🤖</span>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 blur-lg opacity-40 -z-10" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}