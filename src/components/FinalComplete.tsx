import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { CheckCircle2, BookOpen, Share2, RotateCcw } from "lucide-react";
import avatarImage from "figma:asset/e402b202fae395b1c1a3ad5e7a300f8f32574a45.png";

export function FinalComplete() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-y-auto relative">
      {/* Celebration particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              rotate: Math.random() * 360,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: -100,
              rotate: Math.random() * 720,
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              delay: Math.random() * 3,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
              ease: "linear"
            }}
            className="absolute text-4xl"
          >
            {["🌟", "✨", "🎉", "🎊", "💫", "🏆", "👏", "🎯"][Math.floor(Math.random() * 8)]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        {/* Milestone Map - All Completed */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-xl rounded-full px-8 py-4 border border-white/30 shadow-2xl">
            {[1, 2, 3, 4].map((num, index) => (
              <div key={num} className="flex items-center gap-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(16, 185, 129, 0)",
                        "0 0 0 8px rgba(16, 185, 129, 0.3)",
                        "0 0 0 0 rgba(16, 185, 129, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg"
                  >
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>
                <span className="text-white font-bold text-sm">Module {num}</span>
                {num < 4 && (
                  <div className="text-emerald-300 text-2xl ml-2">→</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* BloomBot Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8, delay: 0.5 }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img 
                src={avatarImage} 
                alt="BloomBot" 
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <motion.div 
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 blur-3xl -z-10" 
            />
          </motion.div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-lg">
            🎉 Journey Complete! 🎉
          </h1>
          <p className="text-3xl text-white/90 mb-8">
            All Modules Mastered
          </p>
        </motion.div>

        {/* BloomBot's Final Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 150 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bg-white rounded-3xl px-10 py-8 shadow-2xl">
            <div className="space-y-4 text-gray-900 text-xl leading-relaxed text-center">
              <p className="font-bold text-2xl">
                You didn't just study.
              </p>
              <p>
                You <span className="text-blue-600 font-bold">understood</span>,{" "}
                <span className="text-purple-600 font-bold">applied</span>,{" "}
                <span className="text-pink-600 font-bold">corrected</span>,{" "}
                <span className="text-emerald-600 font-bold">taught</span>, and{" "}
                <span className="text-orange-600 font-bold">created</span>.
              </p>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                That's true learning. ✨
              </p>
            </div>
          </div>
        </motion.div>

        {/* Achievement Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            { icon: "📖", title: "Learn", color: "from-blue-400 to-blue-600" },
            { icon: "🎯", title: "Apply", color: "from-purple-400 to-purple-600" },
            { icon: "🔍", title: "Correct", color: "from-pink-400 to-pink-600" },
            { icon: "🎓", title: "Teach", color: "from-emerald-400 to-emerald-600" },
          ].map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7 + index * 0.1, type: "spring", stiffness: 200 }}
              className={`bg-gradient-to-br ${achievement.color} rounded-2xl p-6 shadow-xl`}
            >
              <div className="text-center">
                <div className="text-5xl mb-3">{achievement.icon}</div>
                <h3 className="text-white text-xl font-bold">{achievement.title}</h3>
                <div className="mt-3">
                  <CheckCircle2 className="w-8 h-8 text-white mx-auto" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="bg-white text-purple-600 px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
          >
            <RotateCcw className="w-6 h-6" />
            Restart Learning
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert("Notes feature coming soon!")}
            className="bg-white text-purple-600 px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
          >
            <BookOpen className="w-6 h-6" />
            View Notes
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert("Share feature coming soon!")}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
          >
            <Share2 className="w-6 h-6" />
            Share Progress
          </motion.button>
        </motion.div>

        {/* Final Flourish */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-center mt-12"
        >
          <p className="text-white/80 text-lg">
            Built with 💜 by BloomBot Learning Platform
          </p>
        </motion.div>
      </div>
    </div>
  );
}