import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Brain, Sparkles, TrendingUp, Award } from "lucide-react";
import avatarImage from "figma:asset/e402b202fae395b1c1a3ad5e7a300f8f32574a45.png";

type Phase = "first-explanation" | "first-challenge" | "first-feedback" | "second-explanation" | "second-challenge" | "second-feedback" | "final-validation";

export function Module4Challenge() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("first-explanation");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [bgGradient, setBgGradient] = useState("from-indigo-50 via-purple-50 to-pink-50");

  // FIRST EXPLANATION - Contains 2 subtle mistakes:
  // 1. Says chlorophyll is stored in "mitochondria" (should be "chloroplasts")
  // 2. Says plants release "nitrogen" (should be "oxygen")
  const firstExplanation = "Photosynthesis is the process by which plants convert sunlight into chemical energy. During this process, plants absorb carbon dioxide from the air and water from the soil. The chlorophyll pigment, stored in the mitochondria, captures light energy and uses it to transform these raw materials into glucose, which serves as food for the plant. As a byproduct of this reaction, plants release nitrogen gas into the atmosphere, which is why forests are often called the 'lungs of the Earth.'";

  const firstOptions = [
    { 
      id: "a", 
      text: "Chlorophyll is stored in chloroplasts, not mitochondria",
      isCorrect: true,
      feedback: "This is where your thinking beats mine. Chloroplasts are the powerhouses for photosynthesis — I mixed them up with mitochondria."
    },
    { 
      id: "b", 
      text: "Plants don't absorb carbon dioxide during photosynthesis",
      isCorrect: false,
      feedback: "Actually, plants DO absorb CO₂ — that part was right. Look closer at the other details."
    },
    { 
      id: "c", 
      text: "Water comes from the air, not the soil",
      isCorrect: false,
      feedback: "Interesting angle, but water does come from the soil through the roots. The mistake is somewhere else."
    },
    { 
      id: "d", 
      text: "None of the above",
      isCorrect: false,
      feedback: "There's definitely something off in that explanation. Take another look — what do you notice about where chlorophyll is stored?"
    }
  ];

  // SECOND EXPLANATION - Still contains 1 mistake:
  // Plants release "nitrogen" (should be "oxygen")
  const secondExplanation = "Photosynthesis is the process by which plants convert sunlight into chemical energy. During this process, plants absorb carbon dioxide from the air and water from the soil. The chlorophyll pigment, stored in the chloroplasts, captures light energy and uses it to transform these raw materials into glucose, which serves as food for the plant. As a byproduct of this reaction, plants release nitrogen gas into the atmosphere, which is why forests are often called the 'lungs of the Earth.'";

  const secondOptions = [
    { 
      id: "a", 
      text: "Plants release oxygen, not nitrogen",
      isCorrect: true,
      feedback: "Good catch — most people miss this. Oxygen is the gas that makes forests the 'lungs of Earth,' not nitrogen."
    },
    { 
      id: "b", 
      text: "Glucose is not the food for plants",
      isCorrect: false,
      feedback: "Actually, glucose IS the sugar that plants create and use for energy. That part was correct."
    },
    { 
      id: "c", 
      text: "Chloroplasts don't capture light energy",
      isCorrect: false,
      feedback: "They absolutely do! Chloroplasts contain chlorophyll which captures light. Look at what the plant releases instead."
    },
    { 
      id: "d", 
      text: "None of the above",
      isCorrect: false,
      feedback: "There's still one subtle mistake hiding. What gas do plants release as a byproduct?"
    }
  ];

  // FINAL CORRECT EXPLANATION
  const finalExplanation = "Photosynthesis is the process by which plants convert sunlight into chemical energy. During this process, plants absorb carbon dioxide from the air and water from the soil. The chlorophyll pigment, stored in the chloroplasts, captures light energy and uses it to transform these raw materials into glucose, which serves as food for the plant. As a byproduct of this reaction, plants release oxygen gas into the atmosphere, which is why forests are often called the 'lungs of the Earth.'";

  const handleFirstSelection = (option: typeof firstOptions[0]) => {
    setSelectedOption(option.id);
    setTimeout(() => {
      setPhase("first-feedback");
    }, 500);
  };

  const handleContinueAfterFirst = () => {
    setPhase("second-explanation");
    setSelectedOption(null);
    setBgGradient("from-orange-50 via-amber-50 to-yellow-50");
  };

  const handleSecondSelection = (option: typeof secondOptions[0]) => {
    setSelectedOption(option.id);
    setTimeout(() => {
      setPhase("second-feedback");
    }, 500);
  };

  const handleFinalValidation = () => {
    setPhase("final-validation");
    setBgGradient("from-emerald-50 via-teal-50 to-cyan-50");
  };

  const currentFirstOption = firstOptions.find(o => o.id === selectedOption);
  const currentSecondOption = secondOptions.find(o => o.id === selectedOption);

  // FINAL VALIDATION SCREEN
  if (phase === "final-validation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 flex items-center justify-center relative overflow-hidden">
        {/* Celebration particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
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
              {["🏆", "⭐", "🔥", "💎", "✨"][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Trophy */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1.2 }}
            className="mb-8"
          >
            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-2xl flex items-center justify-center">
              <Award className="w-24 h-24 text-white" />
            </div>
          </motion.div>

          {/* Main Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl font-bold text-white mb-6 drop-shadow-lg"
          >
            You Did It. 🔥
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl text-white/95 mb-4 leading-relaxed"
          >
            You caught <span className="font-bold text-yellow-200">both</span> mistakes.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            That's not memorization. That's <span className="font-bold text-yellow-200">critical thinking</span>.
          </motion.p>

          {/* Final Correct Explanation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="bg-white rounded-3xl p-8 shadow-2xl mb-8 text-left"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Final, Fully Correct Explanation</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {finalExplanation}
            </p>
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
              <p className="text-emerald-900 font-bold mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                How your corrections improved this:
              </p>
              <ul className="space-y-2 text-emerald-800">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">1.</span>
                  <span><strong>Chloroplasts vs Mitochondria</strong> — You fixed the location where photosynthesis actually happens.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">2.</span>
                  <span><strong>Oxygen vs Nitrogen</strong> — You corrected the byproduct that makes forests the "lungs of Earth."</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Module Complete */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-6 mb-8 inline-block">
              <p className="text-2xl text-white font-bold">
                🎓 All 4 Modules Complete — 100% 
              </p>
            </div>

            <motion.button
              onClick={() => navigate("/final-complete")}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-emerald-600 px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transition-all"
            >
              Finish Journey 🚀
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient} transition-all duration-1000 overflow-y-auto pb-32`}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* BloomBot Companion */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="fixed top-8 left-8 z-50"
        >
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-purple-400 bg-white shadow-2xl">
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
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-xl">
            <Brain className="w-7 h-7 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Module 4: CREATE • Challenge {phase.includes("second") ? "2" : "1"}/2
            </h2>
          </div>
        </motion.div>

        {/* FIRST EXPLANATION */}
        {phase === "first-explanation" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  AI
                </div>
                <div>
                  <div className="inline-block bg-purple-100 px-4 py-1 rounded-full text-sm font-bold text-purple-700 mb-3">
                    BloomBot's Explanation
                  </div>
                  <p className="text-xl text-gray-800 leading-relaxed">
                    {firstExplanation}
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => setPhase("first-challenge")}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-6 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              I've Read It — What's Wrong? 🔍
            </motion.button>
          </motion.div>
        )}

        {/* FIRST CHALLENGE */}
        {phase === "first-challenge" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Brain className="w-7 h-7 text-purple-600" />
                What's wrong with this explanation?
              </h3>
              <p className="text-gray-600 mb-6">
                Read carefully. Don't guess — think critically.
              </p>

              <div className="space-y-3">
                {firstOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleFirstSelection(option)}
                    whileHover={{ scale: 1.01, x: 5 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full text-left px-6 py-5 bg-gray-50 border-2 border-gray-300 rounded-xl text-lg text-gray-800 font-medium hover:bg-purple-50 hover:border-purple-400 transition-all"
                  >
                    <span className="font-bold text-purple-600 mr-3">{option.id.toUpperCase()}.</span>
                    {option.text}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* FIRST FEEDBACK */}
        {phase === "first-feedback" && currentFirstOption && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className={`rounded-3xl shadow-2xl p-8 ${
              currentFirstOption.isCorrect 
                ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300" 
                : "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300"
            }`}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <img
                    src={avatarImage}
                    alt="BloomBot"
                    className="w-12 h-12 object-cover scale-110"
                  />
                </div>
                <div className="flex-1">
                  <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-3 ${
                    currentFirstOption.isCorrect 
                      ? "bg-emerald-200 text-emerald-800" 
                      : "bg-amber-200 text-amber-800"
                  }`}>
                    {currentFirstOption.isCorrect ? "Exactly Right 🎯" : "Not Quite"}
                  </div>
                  <p className="text-xl text-gray-800 leading-relaxed mb-4">
                    {currentFirstOption.feedback}
                  </p>

                  {currentFirstOption.isCorrect && (
                    <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200">
                      <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        <strong className="text-emerald-700">Updated explanation:</strong>
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {secondExplanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {currentFirstOption.isCorrect ? (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={handleContinueAfterFirst}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-6 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                  Continue to Challenge 2 →
                </motion.button>
              ) : (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => {
                    setPhase("first-challenge");
                    setSelectedOption(null);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-6 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                  Try Again 🔄
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* SECOND EXPLANATION */}
        {phase === "second-explanation" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 border-2 border-orange-300 rounded-3xl shadow-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-orange-600" />
                <p className="text-xl font-bold text-orange-900">
                  Good progress! But there's still one mistake hiding...
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  AI
                </div>
                <div>
                  <div className="inline-block bg-orange-100 px-4 py-1 rounded-full text-sm font-bold text-orange-700 mb-3">
                    Revised Explanation
                  </div>
                  <p className="text-xl text-gray-800 leading-relaxed">
                    {secondExplanation}
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => setPhase("second-challenge")}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-6 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              Find the Remaining Mistake 🎯
            </motion.button>
          </motion.div>
        )}

        {/* SECOND CHALLENGE */}
        {phase === "second-challenge" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Brain className="w-7 h-7 text-orange-600" />
                What's still wrong?
              </h3>
              <p className="text-gray-600 mb-6">
                One subtle mistake remains. Read the byproduct section carefully.
              </p>

              <div className="space-y-3">
                {secondOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleSecondSelection(option)}
                    whileHover={{ scale: 1.01, x: 5 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full text-left px-6 py-5 bg-gray-50 border-2 border-gray-300 rounded-xl text-lg text-gray-800 font-medium hover:bg-orange-50 hover:border-orange-400 transition-all"
                  >
                    <span className="font-bold text-orange-600 mr-3">{option.id.toUpperCase()}.</span>
                    {option.text}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* SECOND FEEDBACK */}
        {phase === "second-feedback" && currentSecondOption && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className={`rounded-3xl shadow-2xl p-8 ${
              currentSecondOption.isCorrect 
                ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300" 
                : "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300"
            }`}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <img
                    src={avatarImage}
                    alt="BloomBot"
                    className="w-12 h-12 object-cover scale-110"
                  />
                </div>
                <div className="flex-1">
                  <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-3 ${
                    currentSecondOption.isCorrect 
                      ? "bg-emerald-200 text-emerald-800" 
                      : "bg-amber-200 text-amber-800"
                  }`}>
                    {currentSecondOption.isCorrect ? "Perfect! 🏆" : "Not Quite"}
                  </div>
                  <p className="text-xl text-gray-800 leading-relaxed">
                    {currentSecondOption.feedback}
                  </p>
                </div>
              </div>

              {currentSecondOption.isCorrect ? (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={handleFinalValidation}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-6 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                  See Final Results 🎉
                </motion.button>
              ) : (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => {
                    setPhase("second-challenge");
                    setSelectedOption(null);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-6 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                  Try Again 🔄
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}