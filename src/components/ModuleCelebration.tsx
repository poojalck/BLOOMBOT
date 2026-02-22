import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { CheckCircle2, Star, Sparkles } from "lucide-react";

interface ModuleCelebrationProps {
  moduleName: string;
  moduleNumber: number;
  onComplete: () => void;
}

export function ModuleCelebration({ moduleName, moduleNumber, onComplete }: ModuleCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600"
    >
      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 80 }).map((_, i) => {
            const isEmoji = i % 3 === 0;
            const emojis = ["🎉", "⭐", "✨", "🌟", "🎊", "💚", "🏆", "🎯"];
            return (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  rotate: 0,
                  opacity: 1,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  y: window.innerHeight + 50,
                  rotate: Math.random() * 720 - 360,
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  ease: "easeIn",
                  delay: Math.random() * 0.5,
                }}
                className="absolute"
              >
                {isEmoji ? (
                  <span className="text-4xl">{emojis[Math.floor(Math.random() * emojis.length)]}</span>
                ) : (
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#fbbf24", "#f59e0b"][
                        Math.floor(Math.random() * 6)
                      ],
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: 3,
                ease: "easeInOut",
              }}
              className="text-9xl"
            >
              ✅
            </motion.div>
            
            {/* Glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-white rounded-full blur-3xl -z-10"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-6xl font-bold text-white mb-6 drop-shadow-lg"
        >
          Congratulations! 🎉
        </motion.h1>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white/20 backdrop-blur-md rounded-3xl px-12 py-8 inline-block border-4 border-white/40"
        >
          <p className="text-2xl text-white font-medium mb-2">
            You completed
          </p>
          <p className="text-4xl font-bold text-white drop-shadow-md">
            Module {moduleNumber}: {moduleName}
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="mt-8 flex items-center justify-center gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <Star className="w-12 h-12 text-yellow-300 fill-yellow-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <div className="flex items-center justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-3 h-3 bg-white rounded-full"
              />
            ))}
          </div>
          <p className="text-white/80 mt-4 text-lg">Returning to journey map...</p>
        </motion.div>
      </div>

      {/* Burst animations from corners */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: "easeOut",
          }}
          className={`absolute w-32 h-32 rounded-full bg-white/30 ${
            i === 0 ? "top-0 left-0" : i === 1 ? "top-0 right-0" : i === 2 ? "bottom-0 left-0" : "bottom-0 right-0"
          }`}
        />
      ))}
    </motion.div>
  );
}
