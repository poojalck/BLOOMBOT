import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";

export function Module3Transition() {
  const navigate = useNavigate();
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowSubtext(true), 2000);
    setTimeout(() => navigate("/module-4-intro"), 5000);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center relative overflow-hidden">
      {/* Confetti particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -20,
              rotate: 0,
              opacity: 1
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 20 : 1000,
              rotate: Math.random() * 360,
              opacity: 0
            }}
            transition={{
              duration: Math.random() * 2 + 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-3xl"
          >
            {["🎉", "✨", "⭐", "💚", "🌟"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      {/* Green glow pulse */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-96 h-96 bg-emerald-300 rounded-full blur-3xl"
      />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, delay: 0.3 }}
          className="w-32 h-32 mx-auto mb-8 bg-white rounded-full shadow-2xl flex items-center justify-center"
        >
          <CheckCircle2 className="w-20 h-20 text-emerald-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-6xl font-bold text-white mb-4"
        >
          🎉 Module 3 Completed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          You taught the concept — that means you truly understand it.
        </motion.p>

        {showSubtext && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center justify-center gap-2 text-xl text-white/80"
          >
            <Sparkles className="w-5 h-5" />
            <span>One final step remains…</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}