import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { Brain, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import avatarImage from "figma:asset/e402b202fae395b1c1a3ad5e7a300f8f32574a45.png";
import learnerAiImage from "figma:asset/ab7143514fec570bec2a6973927ba7437a3318a0.png";

export function Module2Intro() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 0,
      speaker: "bloombot",
      message: "Now we flip the role.\n\nYou won't learn from AI.\n✨ You'll correct AI. ✨",
    },
    {
      id: 1,
      speaker: "bloombot",
      message: "Meet our learner AI. 🤖\n\nIt tries... but doesn't always get things right.\n\nYour job? Spot mistakes. Fix logic. Fill gaps.",
      showLearnerAI: true,
    },
    {
      id: 2,
      type: "final",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStart = () => {
    navigate("/module-2-correct");
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-3xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {currentStepData.type !== "final" && (
            <motion.div
              key={currentStep}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="space-y-8"
            >
              {/* BloomBot Message */}
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 rounded-full overflow-hidden shadow-2xl border-4 border-purple-300 bg-white flex-shrink-0"
                >
                  <img
                    src={avatarImage}
                    alt="BloomBot"
                    className="w-full h-full object-cover scale-110"
                  />
                </motion.div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative bg-white rounded-3xl px-8 py-6 shadow-2xl max-w-xl"
                >
                  <p className="text-2xl text-gray-800 leading-relaxed whitespace-pre-line">
                    {currentStepData.message}
                  </p>
                </motion.div>
              </div>

              {/* Learner AI - show when appropriate */}
              {currentStepData.showLearnerAI && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center"
                >
                  <div className="relative">
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-amber-300 bg-white"
                    >
                      <img
                        src={learnerAiImage}
                        alt="Learner AI"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    {/* Confused emoji */}
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, -10, 10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute -top-4 -right-4 text-5xl"
                    >
                      🤔
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Continue Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-5 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-shadow inline-flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Final Step - Ready to Start */}
          {currentStepData.type === "final" && (
            <motion.div
              key="final"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="text-center space-y-8"
            >
              {/* Icons */}
              <div className="flex items-center justify-center gap-8">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-purple-300 bg-white"
                >
                  <img
                    src={avatarImage}
                    alt="BloomBot"
                    className="w-full h-full object-cover scale-110"
                  />
                </motion.div>

                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="text-7xl"
                >
                  ⚡
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-amber-300 bg-white"
                >
                  <img
                    src={learnerAiImage}
                    alt="Learner AI"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-6xl font-bold text-white mb-4">
                  Ready to Correct?
                </h2>
                <p className="text-2xl text-purple-200">
                  Let's help our AI learn! 🚀
                </p>
              </div>

              {/* Start Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 text-gray-900 px-16 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transition-shadow inline-flex items-center gap-3"
              >
                <Brain className="w-8 h-8" />
                Let's Start
                <Sparkles className="w-8 h-8" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Dots */}
        {currentStepData.type !== "final" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 mt-8"
          >
            {steps.slice(0, -1).map((step, index) => (
              <div
                key={step.id}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? "w-8 bg-emerald-400"
                    : index < currentStep
                    ? "w-2 bg-emerald-300"
                    : "w-2 bg-white/30"
                }`}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
