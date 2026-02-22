import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import avatarImage from "figma:asset/e402b202fae395b1c1a3ad5e7a300f8f32574a45.png";
import learnerAiImage from "figma:asset/ab7143514fec570bec2a6973927ba7437a3318a0.png";

type Phase = "round1-question" | "round1-feedback" | "round2-question" | "round2-feedback" | "complete";

export function Module2CorrectAI() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("round1-question");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // ROUND 1: Paragraph with mistake about oxygen/CO2
  const round1Para = "Photosynthesis is the process where plants convert sunlight into energy. During this process, plants absorb oxygen from the air and water from the soil. The chlorophyll in their leaves captures sunlight and uses it to transform these materials into glucose. As a byproduct, plants release carbon dioxide into the atmosphere.";
  
  const round1Options = [
    { id: "a", text: "Plants absorb CO₂ and release O₂, not the reverse", isCorrect: true },
    { id: "b", text: "Chlorophyll is not in the leaves", isCorrect: false },
    { id: "c", text: "Plants don't make glucose", isCorrect: false },
    { id: "d", text: "No corrections needed", isCorrect: false },
  ];

  // ROUND 2: Paragraph with mistake about chloroplasts
  const round2Para = "Photosynthesis is the process where plants convert sunlight into energy. During this process, plants absorb carbon dioxide from the air and water from the soil. The chlorophyll in their mitochondria captures sunlight and uses it to transform these materials into glucose. As a byproduct, plants release oxygen into the atmosphere.";
  
  const round2Options = [
    { id: "a", text: "Chlorophyll is in chloroplasts, not mitochondria", isCorrect: true },
    { id: "b", text: "Plants don't absorb water from soil", isCorrect: false },
    { id: "c", text: "Sunlight isn't converted to energy", isCorrect: false },
    { id: "d", text: "No corrections needed", isCorrect: false },
  ];

  const handleRound1Selection = (option: typeof round1Options[0]) => {
    setSelectedOption(option.id);
    setTimeout(() => {
      setPhase("round1-feedback");
    }, 300);
  };

  const handleRound1Continue = () => {
    setSelectedOption(null);
    setPhase("round2-question");
  };

  const handleRound2Selection = (option: typeof round2Options[0]) => {
    setSelectedOption(option.id);
    setTimeout(() => {
      setPhase("round2-feedback");
    }, 300);
  };

  const handleComplete = () => {
    setPhase("complete");
  };

  const currentRound1Option = round1Options.find(o => o.id === selectedOption);
  const currentRound2Option = round2Options.find(o => o.id === selectedOption);

  if (phase === "complete") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center relative overflow-hidden">
        {/* Celebration particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
                rotate: Math.random() * 360,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                y: -100,
                rotate: Math.random() * 720,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 2,
                ease: "linear"
              }}
              className="absolute text-4xl"
            >
              {["🌟", "✨", "🎉", "💫", "🌿"][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-2xl">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-white shadow-2xl flex items-center justify-center">
              <CheckCircle2 className="w-20 h-20 text-emerald-500" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold text-white mb-6 drop-shadow-lg"
          >
            Module 2 Complete
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-white/95 mb-10 leading-relaxed"
          >
            You just corrected an AI twice. That's real understanding.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={() => navigate("/map")}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-emerald-600 px-12 py-6 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all"
          >
            Back to Learning Map 🗺️
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-y-auto pb-32">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* BloomBot floating companion */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="fixed top-8 left-8 z-50"
        >
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-emerald-400 bg-white shadow-2xl">
            <img
              src={avatarImage}
              alt="BloomBot"
              className="w-full h-full object-cover scale-110"
            />
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Module 2: Correct the AI
            </h2>
          </div>
        </motion.div>

        {/* ROUND 1 - QUESTION */}
        {phase === "round1-question" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* AI Explanation */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-indigo-400 bg-indigo-50 shadow-lg flex-shrink-0">
                  <img
                    src={learnerAiImage}
                    alt="AI"
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
                <div className="flex-1">
                  <div className="inline-block bg-indigo-100 px-3 py-1 rounded-full text-sm font-bold text-indigo-700 mb-3">
                    AI Explanation
                  </div>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {round1Para}
                  </p>
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <p className="text-lg font-medium text-gray-900 mb-4">
                What corrections do you see in this explanation?
              </p>
              <div className="space-y-3">
                {round1Options.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleRound1Selection(option)}
                    whileHover={{ scale: 1.01, x: 5 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full text-left px-6 py-4 bg-white border-2 border-gray-300 rounded-xl text-base text-gray-800 hover:border-indigo-400 hover:bg-indigo-50 transition-all"
                  >
                    <span className="font-bold text-indigo-600 mr-3">{option.id.toUpperCase()}.</span>
                    {option.text}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ROUND 1 - FEEDBACK */}
        {phase === "round1-feedback" && currentRound1Option && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* AI Response */}
            <div className={`rounded-3xl shadow-2xl p-8 ${
              currentRound1Option.isCorrect 
                ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300" 
                : "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300"
            }`}>
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-indigo-400 bg-white shadow-lg flex-shrink-0">
                  <img
                    src={learnerAiImage}
                    alt="AI"
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
                <div className="flex-1">
                  {currentRound1Option.isCorrect ? (
                    <div>
                      <div className="inline-block bg-emerald-200 px-3 py-1 rounded-full text-sm font-bold text-emerald-800 mb-3">
                        Correct
                      </div>
                      <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                        You're right. Let me correct that.
                      </p>
                      <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200">
                        <p className="text-base text-gray-700 leading-relaxed">
                          Photosynthesis is the process where plants convert sunlight into energy. During this process, plants absorb <strong>carbon dioxide</strong> from the air and water from the soil. The chlorophyll in their leaves captures sunlight and uses it to transform these materials into glucose. As a byproduct, plants release <strong>oxygen</strong> into the atmosphere.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="inline-block bg-amber-200 px-3 py-1 rounded-full text-sm font-bold text-amber-800 mb-3">
                        Not quite
                      </div>
                      <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                        That's not the issue. Here's the corrected version:
                      </p>
                      <div className="bg-white rounded-2xl p-6 border-2 border-amber-200">
                        <p className="text-base text-gray-700 leading-relaxed">
                          Photosynthesis is the process where plants convert sunlight into energy. During this process, plants absorb <strong>carbon dioxide</strong> from the air and water from the soil. The chlorophyll in their leaves captures sunlight and uses it to transform these materials into glucose. As a byproduct, plants release <strong>oxygen</strong> into the atmosphere.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={handleRound1Continue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-8 py-5 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all text-white ${
                  currentRound1Option.isCorrect
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600"
                    : "bg-gradient-to-r from-amber-500 to-orange-600"
                }`}
              >
                Continue →
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ROUND 2 - QUESTION */}
        {phase === "round2-question" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* AI Explanation */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-purple-400 bg-purple-50 shadow-lg flex-shrink-0">
                  <img
                    src={learnerAiImage}
                    alt="AI"
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
                <div className="flex-1">
                  <div className="inline-block bg-purple-100 px-3 py-1 rounded-full text-sm font-bold text-purple-700 mb-3">
                    AI Explanation
                  </div>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {round2Para}
                  </p>
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
              <p className="text-lg font-medium text-gray-900 mb-4">
                What corrections do you see in this explanation?
              </p>
              <div className="space-y-3">
                {round2Options.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleRound2Selection(option)}
                    whileHover={{ scale: 1.01, x: 5 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full text-left px-6 py-4 bg-white border-2 border-gray-300 rounded-xl text-base text-gray-800 hover:border-purple-400 hover:bg-purple-50 transition-all"
                  >
                    <span className="font-bold text-purple-600 mr-3">{option.id.toUpperCase()}.</span>
                    {option.text}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ROUND 2 - FEEDBACK */}
        {phase === "round2-feedback" && currentRound2Option && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* AI Response */}
            <div className={`rounded-3xl shadow-2xl p-8 ${
              currentRound2Option.isCorrect 
                ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300" 
                : "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300"
            }`}>
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-purple-400 bg-white shadow-lg flex-shrink-0">
                  <img
                    src={learnerAiImage}
                    alt="AI"
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
                <div className="flex-1">
                  {currentRound2Option.isCorrect ? (
                    <div>
                      <div className="inline-block bg-emerald-200 px-3 py-1 rounded-full text-sm font-bold text-emerald-800 mb-3">
                        Correct
                      </div>
                      <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                        Exactly. Chloroplasts, not mitochondria. Here's the final version:
                      </p>
                      <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200">
                        <p className="text-base text-gray-700 leading-relaxed">
                          Photosynthesis is the process where plants convert sunlight into energy. During this process, plants absorb carbon dioxide from the air and water from the soil. The chlorophyll in their <strong>chloroplasts</strong> captures sunlight and uses it to transform these materials into glucose. As a byproduct, plants release oxygen into the atmosphere.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="inline-block bg-amber-200 px-3 py-1 rounded-full text-sm font-bold text-amber-800 mb-3">
                        Not quite
                      </div>
                      <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                        The mistake was chloroplasts vs mitochondria. Here's the corrected version:
                      </p>
                      <div className="bg-white rounded-2xl p-6 border-2 border-amber-200">
                        <p className="text-base text-gray-700 leading-relaxed">
                          Photosynthesis is the process where plants convert sunlight into energy. During this process, plants absorb carbon dioxide from the air and water from the soil. The chlorophyll in their <strong>chloroplasts</strong> captures sunlight and uses it to transform these materials into glucose. As a byproduct, plants release oxygen into the atmosphere.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={handleComplete}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-5 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
              >
                Complete Module 2 ✨
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}