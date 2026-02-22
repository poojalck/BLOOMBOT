import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { CheckCircle2, Mic, Sparkles } from "lucide-react";
import { useState } from "react";
import babyBotImage from "figma:asset/8e12379dde619f341d7f010e2a0d0410ca57f2cf.png";

export function Module3Intro() {
  const navigate = useNavigate();
  const [dialogueStep, setDialogueStep] = useState(0);

  const dialogues = [
    "Have you noticed something interesting?\nYou understand things better when you teach someone.",
    "That's why teachers remember so much —\nthey keep explaining again and again.",
    "So here's a fun challenge.\nYou're going to teach what you learned…\nto someone much younger.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 overflow-y-auto relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 pb-32 relative z-10">
        {/* Compact Milestone Map */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-full px-8 py-4 border border-white/20 shadow-2xl">
            {/* Module 1 - Completed */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/80 text-sm font-medium">Module 1</span>
            </div>

            <div className="text-emerald-400 text-2xl">→</div>

            {/* Module 2 - Completed */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/80 text-sm font-medium">Module 2</span>
            </div>

            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-emerald-400 text-2xl"
            >
              →
            </motion.div>

            {/* Module 3 - Active/Unlocked */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(139, 92, 246, 0.5)",
                    "0 0 35px rgba(139, 92, 246, 1)",
                    "0 0 20px rgba(139, 92, 246, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center border-2 border-white/50 shadow-lg"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-white font-bold text-sm">Module 3</span>
            </motion.div>

            <div className="flex items-center gap-1 ml-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col items-center">
          {/* BloomBot Avatar */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 shadow-2xl flex items-center justify-center text-6xl border-4 border-white">
                🤖
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-rose-500 blur-2xl -z-10"
              />
            </motion.div>
          </motion.div>

          {/* BloomBot Dialogue */}
          <motion.div
            key={dialogueStep}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="w-full max-w-2xl mb-8"
          >
            <div className="bg-white rounded-3xl px-8 py-8 shadow-2xl">
              <p className="text-gray-900 text-xl leading-relaxed font-medium text-center whitespace-pre-line">
                {dialogues[dialogueStep]}
              </p>

              {dialogueStep < dialogues.length - 1 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={() => setDialogueStep(dialogueStep + 1)}
                  className="mt-6 mx-auto block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Introduce Baby Bot */}
          {dialogueStep >= 2 && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
                className="mb-6"
              >
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [-3, 3, -3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <div className="w-40 h-40 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-gradient-to-br from-cyan-400 to-blue-400">
                    <img
                      src={babyBotImage}
                      alt="Baby Bot"
                      className="w-full h-full object-cover scale-110"
                    />
                  </div>
                  <motion.div
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 blur-2xl -z-10"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="w-full max-w-2xl mb-8"
              >
                <div className="bg-white rounded-3xl px-8 py-6 shadow-2xl">
                  <p className="text-gray-900 text-xl leading-relaxed font-medium text-center mb-4">
                    This is our Baby Bot.
                    <br />
                    It's only 5 years old and knows almost nothing.
                  </p>
                  <p className="text-gray-900 text-xl leading-relaxed font-medium text-center">
                    Your job is to teach it by recalling what you learned —
                    <br />
                    <span className="text-purple-600 font-bold">using your own voice.</span>
                  </p>
                </div>
              </motion.div>

              {/* Start Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="w-full max-w-md"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/module-3-teach")}
                  className="w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-white px-10 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-3 border-4 border-white/30"
                >
                  <Mic className="w-7 h-7" />
                  <span>Start Teaching</span>
                  <motion.span
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                    className="text-3xl"
                  >
                    🎓
                  </motion.span>
                </motion.button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
