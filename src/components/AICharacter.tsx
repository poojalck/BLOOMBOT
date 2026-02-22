import { motion } from "motion/react";

type Mood = "confused" | "uncertain" | "learning" | "happy" | "confident";

interface AICharacterProps {
  mood: Mood;
  message?: string;
  confidence?: number;
}

export function AICharacter({ mood, message, confidence }: AICharacterProps) {
  const moodEmojis: Record<Mood, string> = {
    confused: "😕",
    uncertain: "🤔",
    learning: "💡",
    happy: "😊",
    confident: "🎓",
  };

  const moodColors: Record<Mood, string> = {
    confused: "from-gray-400 to-gray-500",
    uncertain: "from-yellow-400 to-amber-500",
    learning: "from-blue-400 to-indigo-500",
    happy: "from-emerald-400 to-green-500",
    confident: "from-purple-400 to-indigo-600",
  };

  return (
    <div className="flex items-start gap-4 bg-white rounded-2xl shadow-lg p-6 border-2 border-indigo-200">
      <motion.div
        animate={{
          scale: mood === "learning" ? [1, 1.2, 1] : 1,
          rotate: mood === "confused" ? [-5, 5, -5, 0] : 0,
        }}
        transition={{
          duration: 0.6,
          repeat: mood === "learning" ? 2 : 0,
        }}
        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${moodColors[mood]} flex items-center justify-center text-4xl flex-shrink-0 shadow-lg`}
      >
        {moodEmojis[mood]}
      </motion.div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-gray-900">Learner AI</span>
          {confidence !== undefined && (
            <div className="flex items-center gap-2 ml-auto">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full bg-gradient-to-r ${moodColors[mood]}`}
                />
              </div>
              <span className="text-sm font-semibold text-gray-600">{confidence}%</span>
            </div>
          )}
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200"
          >
            <p className="text-gray-800 leading-relaxed">{message}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
