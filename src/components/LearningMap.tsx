import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { BloomBot } from "./BloomBot";
import { BookOpen, Brain, GraduationCap, Lightbulb, CheckCircle2, Lock, Sparkles, Play } from "lucide-react";
import { ModuleCelebration } from "./ModuleCelebration";

export function LearningMap() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationModule, setCelebrationModule] = useState({ name: "", number: 0 });
  const [justCompleted, setJustCompleted] = useState<number | null>(null);

  // Check if a module was just completed
  useEffect(() => {
    const completed = searchParams.get("completed");
    if (completed) {
      const moduleNum = parseInt(completed);
      setJustCompleted(moduleNum);
      
      // Show celebration
      const moduleNames = ["Learn & Apply", "Correct the AI", "Recall by Teaching", "Create & Complete"];
      setCelebrationModule({ name: moduleNames[moduleNum - 1], number: moduleNum });
      setShowCelebration(true);
    }
  }, [searchParams]);

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
    // Clear the URL param
    navigate("/map", { replace: true });
  };

  // Module configuration - dynamically update based on completion
  const getModuleStatus = (moduleId: number) => {
    if (justCompleted === null) {
      // Default state
      if (moduleId === 1) return "active";
      return "locked";
    }
    
    // Update based on what was just completed
    if (moduleId <= justCompleted) return "completed";
    if (moduleId === justCompleted + 1) return "active";
    return "locked";
  };

  const modules = [
    {
      id: 1,
      title: "Learn & Apply",
      icon: BookOpen,
      status: getModuleStatus(1),
      description: "Scroll through reels • Swipe cards to apply",
      color: "from-emerald-400 to-green-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-300",
      route: "/before-module-1",
      emoji: "📚",
    },
    {
      id: 2,
      title: "Correct the AI",
      icon: Brain,
      status: getModuleStatus(2),
      description: "Help AI learn • Fix mistakes naturally",
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      route: "/module-2-intro",
      emoji: "🤖",
    },
    {
      id: 3,
      title: "Recall by Teaching",
      icon: GraduationCap,
      status: getModuleStatus(3),
      description: "Teach a baby AI • Voice interaction",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300",
      route: "/module-3-intro",
      emoji: "👶",
    },
    {
      id: 4,
      title: "Create & Complete",
      icon: Lightbulb,
      status: getModuleStatus(4),
      description: "Fix errors • Apply knowledge creatively",
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-300",
      route: "/module-4-intro",
      emoji: "💡",
    },
  ];

  const handleModuleClick = (module: typeof modules[0]) => {
    if (module.status !== "locked") {
      navigate(module.route);
    }
  };

  const completedModules = modules.filter((m) => m.status === "completed").length;
  const progressPercentage = (completedModules / modules.length) * 100;

  return (
    <>
      <AnimatePresence>
        {showCelebration && (
          <ModuleCelebration
            moduleName={celebrationModule.name}
            moduleNumber={celebrationModule.number}
            onComplete={handleCelebrationComplete}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
          {/* Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-8xl mb-6 inline-block"
            >
              🚀
            </motion.div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">
              Your Learning Journey
            </h1>
            <p className="text-2xl text-gray-600">
              Master Photosynthesis in 4 Interactive Modules
            </p>
          </motion.div>

          {/* Overall Progress */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-20"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold text-gray-700">Journey Progress</span>
                <motion.span
                  key={progressPercentage}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                >
                  {progressPercentage}%
                </motion.span>
              </div>
              <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 relative"
                >
                  {progressPercentage > 0 && (
                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute right-0 top-0 bottom-0 w-8 bg-white/40 rounded-r-full"
                    />
                  )}
                </motion.div>
              </div>
              <div className="flex justify-between mt-3 text-sm text-gray-500">
                <span>Start</span>
                <span>Halfway</span>
                <span>Complete</span>
              </div>
            </div>
          </motion.div>

          {/* Visual Journey Path - Vertical */}
          <div className="max-w-4xl mx-auto relative">
            {/* Vertical connecting path */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-20 bottom-20 w-2 bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300 rounded-full">
              <motion.div
                initial={{ height: "0%" }}
                animate={{ height: `${(completedModules / modules.length) * 100}%` }}
                transition={{ duration: 2, delay: showCelebration ? 3 : 1, ease: "easeInOut" }}
                className="w-full bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full"
              />
            </div>

            {/* Modules */}
            <div className="space-y-32">
              {modules.map((module, index) => {
                const isLeft = index % 2 === 0;
                const isActive = module.status === "active";
                const isCompleted = module.status === "completed";
                const isLocked = module.status === "locked";

                return (
                  <motion.div
                    key={module.id}
                    initial={{ x: isLeft ? -100 : 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.3 + index * 0.2,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className="relative"
                  >
                    {/* Center dot on path */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                      <motion.div
                        animate={
                          isActive
                            ? {
                                scale: [1, 1.3, 1],
                                boxShadow: [
                                  "0 0 0 0 rgba(16, 185, 129, 0.7)",
                                  "0 0 0 20px rgba(16, 185, 129, 0)",
                                  "0 0 0 0 rgba(16, 185, 129, 0)",
                                ],
                              }
                            : {}
                        }
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className={`w-16 h-16 rounded-full border-4 border-white shadow-2xl flex items-center justify-center ${
                          isCompleted
                            ? "bg-gradient-to-br from-emerald-400 to-green-500"
                            : isActive
                            ? "bg-gradient-to-br from-emerald-400 to-teal-500"
                            : "bg-gray-300"
                        }`}
                      >
                        {isCompleted && <CheckCircle2 className="w-8 h-8 text-white" />}
                        {isActive && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="w-7 h-7 text-white" />
                          </motion.div>
                        )}
                        {isLocked && <Lock className="w-7 h-7 text-gray-500" />}
                      </motion.div>
                    </div>

                    {/* Module Card */}
                    <motion.div
                      className={`flex ${isLeft ? "justify-start pr-16" : "justify-end pl-16"} items-center`}
                      onHoverStart={() => setHoveredModule(module.id)}
                      onHoverEnd={() => setHoveredModule(null)}
                    >
                      <motion.button
                        whileHover={!isLocked ? { scale: 1.05, y: -5 } : {}}
                        whileTap={!isLocked ? { scale: 0.98 } : {}}
                        onClick={() => handleModuleClick(module)}
                        disabled={isLocked}
                        className={`relative w-96 bg-white rounded-3xl shadow-xl p-8 transition-all ${
                          isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:shadow-2xl"
                        } ${isActive ? `border-4 ${module.borderColor}` : "border-2 border-gray-100"}`}
                      >
                        {/* Glow effect for active module */}
                        {isActive && (
                          <motion.div
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                              scale: [0.95, 1.05, 0.95],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className={`absolute inset-0 ${module.bgColor} rounded-3xl -z-10 blur-xl`}
                          />
                        )}

                        {/* Module number badge */}
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white">
                          {module.id}
                        </div>

                        {/* Emoji icon */}
                        <motion.div
                          animate={isActive ? { rotate: [0, -10, 10, -10, 0] } : {}}
                          transition={{
                            duration: 0.5,
                            repeat: isActive ? Infinity : 0,
                            repeatDelay: 2,
                          }}
                          className="text-7xl mb-4"
                        >
                          {module.emoji}
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-3xl font-bold text-gray-900 mb-3">
                          {module.title}
                        </h3>

                        {/* Status Badge */}
                        <div className="mb-4">
                          {isActive && (
                            <motion.span
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className={`inline-flex items-center gap-2 bg-gradient-to-r ${module.color} text-white px-4 py-2 rounded-full text-sm font-bold shadow-md`}
                            >
                              <Play className="w-4 h-4" />
                              START HERE
                            </motion.span>
                          )}
                          {isCompleted && (
                            <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold">
                              <CheckCircle2 className="w-4 h-4" />
                              COMPLETED
                            </span>
                          )}
                          {isLocked && (
                            <span className="inline-flex items-center gap-2 bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-bold">
                              <Lock className="w-4 h-4" />
                              LOCKED
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {module.description}
                        </p>

                        {/* Hover overlay with details */}
                        <AnimatePresence>
                          {hoveredModule === module.id && !isLocked && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className={`mt-6 p-4 rounded-2xl ${module.bgColor} border-2 ${module.borderColor}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-700">
                                  Click to start →
                                </span>
                                <motion.div
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                                  <module.icon className={`w-6 h-6 text-${module.color.split("-")[1]}-500`} />
                                </motion.div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-32 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/before-module-1")}
              className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-16 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transition-shadow inline-flex items-center gap-3"
            >
              <Play className="w-8 h-8" />
              Begin Your Journey
              <Sparkles className="w-8 h-8" />
            </motion.button>
            <p className="text-gray-500 mt-6 text-lg">
              ⚡ Interactive • 🎯 Engaging • 🚀 Fun
            </p>
          </motion.div>
        </div>

        <BloomBot message="Hey! Ready to master photosynthesis? Let's make learning fun! 🌱" />
      </div>
    </>
  );
}