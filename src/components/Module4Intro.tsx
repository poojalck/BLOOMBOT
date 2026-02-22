import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Sparkles, Lock, Unlock } from "lucide-react";
import avatarImage from "figma:asset/e402b202fae395b1c1a3ad5e7a300f8f32574a45.png";

export function Module4Intro() {
  const navigate = useNavigate();
  const [showUnlock, setShowUnlock] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowUnlock(true), 1000);
    setTimeout(() => setShowMessage(true), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center relative overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: typeof window !== 'undefined' ? window.innerHeight : 1000,
              scale: 0
            }}
            animate={{
              y: -100,
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute text-4xl"
          >
            {["⚡", "🔥", "💡", "🎯", "✨"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      {/* Glow effect */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.5, 1], opacity: [0, 0.4, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute w-[600px] h-[600px] bg-purple-400 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Module 3 Celebration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-emerald-500 text-white px-8 py-4 rounded-full shadow-2xl mb-6">
            <Sparkles className="w-6 h-6" />
            <span className="text-xl font-bold">Module 3 Complete!</span>
          </div>
          <p className="text-2xl text-white/90 leading-relaxed">
            You taught the concept. That means you <span className="font-bold text-yellow-300">truly understand it</span>.
          </p>
        </motion.div>

        {/* Lock Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={showUnlock ? { scale: 0, opacity: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Lock className="w-16 h-16 text-white" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={showUnlock ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center shadow-2xl"
            >
              <Unlock className="w-16 h-16 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Module 4 Reveal */}
        {showUnlock && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Module 4: CREATE
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-300 to-orange-400 mx-auto mb-8 rounded-full" />
          </motion.div>
        )}

        {/* BloomBot Message */}
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8"
          >
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-400 shadow-xl flex-shrink-0">
                <img
                  src={avatarImage}
                  alt="BloomBot"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div className="flex-1 text-left">
                <div className="inline-block bg-purple-100 px-4 py-1 rounded-full text-sm font-bold text-purple-700 mb-3">
                  BloomBot
                </div>
                <p className="text-xl text-gray-800 leading-relaxed mb-3">
                  Alright. You've learned, corrected, and taught.
                </p>
                <p className="text-xl text-gray-800 leading-relaxed mb-3">
                  Now comes the real test: <span className="font-bold text-purple-700">Can you catch MY mistakes?</span>
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  I'm going to explain photosynthesis. Your job is to <span className="font-bold">identify what's wrong</span> and <span className="font-bold">fix it</span>.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Start Button */}
        {showMessage && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 }}
            onClick={() => navigate("/module-4-challenge")}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 text-gray-900 px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all"
          >
            I'm Ready — Challenge Me 🔥
          </motion.button>
        )}
      </div>
    </div>
  );
}