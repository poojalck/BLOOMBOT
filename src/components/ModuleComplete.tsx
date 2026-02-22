import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function ModuleComplete() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-navigate to map after 3 seconds
    const timer = setTimeout(() => {
      navigate("/map?completed=1");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 flex items-center justify-center">
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => {
          const isEmoji = i % 3 === 0;
          const emojis = ["🎉", "⭐", "✨", "🌟", "🎊", "💚", "🏆"];
          return (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: -50,
                rotate: 0,
                opacity: 1,
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
                    backgroundColor: ["#10b981", "#34d399", "#6ee7b7", "#fbbf24"][
                      Math.floor(Math.random() * 4)
                    ],
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="text-center px-6 relative z-10">
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
            className="text-9xl mb-6"
          >
            🎉
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-7xl font-bold text-white mb-6 drop-shadow-lg"
        >
          Yay!
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-4xl font-bold text-white drop-shadow-md"
        >
          Module 1 Completed! 🏆
        </motion.p>

        {/* Progress dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex items-center justify-center gap-2"
        >
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
        </motion.div>
      </div>
    </div>
  );
}
