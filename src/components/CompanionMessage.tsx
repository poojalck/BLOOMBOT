import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import avatarImage from "figma:asset/e402b202fae395b1c1a3ad5e7a300f8f32574a45.png";

interface CompanionMessageProps {
  messages: string[];
  cta: string;
  onContinue: () => void;
  showAvatar?: boolean;
}

export function CompanionMessage({ messages, cta, onContinue, showAvatar = true }: CompanionMessageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-start justify-start px-6 py-12 overflow-y-auto">
      {/* Companion Avatar - Top Left like a chat */}
      {showAvatar && (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: -50 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mb-8"
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img 
                src={avatarImage} 
                alt="BloomBot" 
                className="w-full h-full object-cover scale-110"
              />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 blur-xl opacity-50 -z-10" />
            {/* Talking indicator */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Chat-style messages */}
      <div className="w-full max-w-2xl space-y-4 mb-8">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.4 + 0.3,
              type: "spring",
              stiffness: 200
            }}
            className="flex items-start gap-3"
          >
            {/* Speech bubble */}
            <div className="relative bg-white rounded-3xl rounded-tl-sm px-6 py-4 shadow-xl max-w-lg">
              <p className="text-gray-800 text-lg leading-relaxed">
                {message}
              </p>
              {/* Tail */}
              <div className="absolute -left-2 top-3 w-4 h-4 bg-white transform rotate-45" />
            </div>
            
            {/* Typing indicator for next message */}
            {index === messages.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  delay: (messages.length) * 0.4 + 0.5,
                  duration: 1,
                  repeat: Infinity,
                }}
                className="flex gap-1 items-center mt-2"
              >
                <div className="w-2 h-2 bg-white/60 rounded-full" />
                <div className="w-2 h-2 bg-white/60 rounded-full" />
                <div className="w-2 h-2 bg-white/60 rounded-full" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: messages.length * 0.4 + 0.7 }}
        className="w-full max-w-2xl"
      >
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-white px-8 py-5 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3"
        >
          <span>{cta}</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ✨
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0.1,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-2 h-2 bg-white rounded-full blur-sm"
          />
        ))}
      </div>
    </div>
  );
}