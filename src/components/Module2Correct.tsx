import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2, XCircle, ArrowRight, X, Lock, Star, Lightbulb, Sparkles } from "lucide-react";
import { AICharacter } from "./AICharacter";

type ErrorType = "factual" | "logic" | "missing" | "imprecise";
type Mood = "confused" | "uncertain" | "learning" | "happy" | "confident";

interface MCQOption {
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

interface ErrorInfo {
  sentenceIndex: number;
  type: ErrorType;
  problem: string;
  mcqQuestion: string;
  options: MCQOption[];
  aiReaction: string;
}

interface LevelData {
  title: string;
  difficulty: string;
  stars: number;
  description: string;
  sentences: string[];
  errors: ErrorInfo[];
  expertVersion: string;
  initialConfidence: number;
}

const levels: LevelData[] = [
  {
    title: "Level 1 • Photosynthesis",
    difficulty: "Easy",
    stars: 1,
    description: "Find the obvious errors",
    initialConfidence: 30,
    sentences: [
      "Plants make food through photosynthesis.",
      "They use sunlight, water, and oxygen to create glucose.",
      "This process happens in the mitochondria.",
      "Plants release carbon dioxide as a waste product.",
    ],
    errors: [
      {
        sentenceIndex: 1,
        type: "factual",
        problem: "Wrong input gas",
        mcqQuestion: "The AI wrote 'oxygen' as an input. What should it be?",
        options: [
          { text: "Oxygen (O₂) - keep it the same", isCorrect: false },
          { text: "Carbon dioxide (CO₂)", isCorrect: true, explanation: "Plants take IN carbon dioxide during photosynthesis, not oxygen!" },
          { text: "Nitrogen (N₂)", isCorrect: false },
          { text: "Hydrogen (H₂)", isCorrect: false },
        ],
        aiReaction: "Oh! Plants use CO₂, not oxygen. Oxygen is what they release!",
      },
      {
        sentenceIndex: 2,
        type: "factual",
        problem: "Wrong organelle",
        mcqQuestion: "Where does photosynthesis actually happen?",
        options: [
          { text: "Mitochondria", isCorrect: false },
          { text: "Nucleus", isCorrect: false },
          { text: "Chloroplast", isCorrect: true, explanation: "Chloroplasts contain chlorophyll and are where photosynthesis occurs!" },
          { text: "Cell membrane", isCorrect: false },
        ],
        aiReaction: "Got it! Chloroplasts have chlorophyll. Mitochondria are for respiration!",
      },
      {
        sentenceIndex: 3,
        type: "factual",
        problem: "Wrong output gas",
        mcqQuestion: "What do plants release as a waste product?",
        options: [
          { text: "Carbon dioxide (CO₂)", isCorrect: false },
          { text: "Oxygen (O₂)", isCorrect: true, explanation: "Oxygen is the waste product of photosynthesis!" },
          { text: "Nitrogen (N₂)", isCorrect: false },
          { text: "Water vapor (H₂O)", isCorrect: false },
        ],
        aiReaction: "Ah! Plants release oxygen, not CO₂. That's why forests are called Earth's lungs!",
      },
    ],
    expertVersion:
      "Plants make food through photosynthesis. They use sunlight, water, and carbon dioxide to create glucose. This process happens in the chloroplasts. Plants release oxygen as a waste product.",
  },
  {
    title: "Level 2 • Photosynthesis",
    difficulty: "Medium",
    stars: 2,
    description: "Requires careful reading",
    initialConfidence: 50,
    sentences: [
      "Photosynthesis occurs in the chloroplasts when plants absorb sunlight.",
      "Light energy splits water molecules, releasing oxygen.",
      "The plant then uses this energy directly to convert carbon dioxide into glucose through chemical reactions.",
    ],
    errors: [
      {
        sentenceIndex: 2,
        type: "logic",
        problem: "Missing intermediate step",
        mcqQuestion: "The AI said energy is used 'directly'. What's wrong with this?",
        options: [
          { text: "Nothing - energy is used directly", isCorrect: false },
          { text: "Energy is stored in ATP and NADPH first, not used directly", isCorrect: true, explanation: "Light doesn't directly make glucose—it creates energy currency (ATP and NADPH) first!" },
          { text: "Energy comes from glucose, not light", isCorrect: false },
          { text: "Plants don't use energy for this", isCorrect: false },
        ],
        aiReaction: "Ohh! There's an intermediate step. Light → ATP/NADPH → Glucose. Not direct!",
      },
      {
        sentenceIndex: 2,
        type: "imprecise",
        problem: "Vague term 'chemical reactions'",
        mcqQuestion: "What specific process converts CO₂ to glucose?",
        options: [
          { text: "Chemical reactions (keep it vague)", isCorrect: false },
          { text: "The Calvin cycle", isCorrect: true, explanation: "The Calvin cycle is the specific name for CO₂ fixation into glucose!" },
          { text: "Cellular respiration", isCorrect: false },
          { text: "Glycolysis", isCorrect: false },
        ],
        aiReaction: "Calvin cycle! That's the specific name. Being precise matters!",
      },
    ],
    expertVersion:
      "Photosynthesis occurs in the chloroplasts when plants absorb sunlight. During light-dependent reactions, light energy splits water molecules, releasing oxygen and creating ATP and NADPH. These energy carriers then power the Calvin cycle, where carbon dioxide is fixed into glucose.",
  },
  {
    title: "Level 3 • Photosynthesis",
    difficulty: "Advanced",
    stars: 3,
    description: "Find what's incomplete or imprecise",
    initialConfidence: 60,
    sentences: [
      "Photosynthesis occurs in two stages in the chloroplast.",
      "The light-dependent reactions use photons to split water, producing oxygen and energy carriers.",
      "The Calvin cycle then fixes CO₂ into glucose using these carriers.",
      "This process is essential for plant survival.",
    ],
    errors: [
      {
        sentenceIndex: 1,
        type: "imprecise",
        problem: "Didn't name the energy carriers",
        mcqQuestion: "What are the specific energy carriers produced?",
        options: [
          { text: "Just call them 'energy carriers'", isCorrect: false },
          { text: "ATP and NADPH", isCorrect: true, explanation: "Naming the specific molecules shows precise understanding!" },
          { text: "Glucose and starch", isCorrect: false },
          { text: "ADP and NADP+", isCorrect: false },
        ],
        aiReaction: "ATP and NADPH! Being specific makes the explanation clearer!",
      },
      {
        sentenceIndex: 1,
        type: "missing",
        problem: "No mention of photosystems",
        mcqQuestion: "What key structures are missing from this explanation?",
        options: [
          { text: "Nothing important is missing", isCorrect: false },
          { text: "Photosystem I and II working together", isCorrect: true, explanation: "The two photosystems work in sequence to convert light energy!" },
          { text: "The cell wall", isCorrect: false },
          { text: "The vacuole", isCorrect: false },
        ],
        aiReaction: "Two photosystems! They work together in the electron transport chain!",
      },
      {
        sentenceIndex: 2,
        type: "missing",
        problem: "No enzyme mentioned",
        mcqQuestion: "What crucial enzyme catalyzes CO₂ fixation?",
        options: [
          { text: "No need to mention enzymes", isCorrect: false },
          { text: "ATP synthase", isCorrect: false },
          { text: "RuBisCO", isCorrect: true, explanation: "RuBisCO is the most abundant enzyme on Earth and key to CO₂ fixation!" },
          { text: "DNA polymerase", isCorrect: false },
        ],
        aiReaction: "RuBisCO! The most abundant enzyme on Earth. That's a key detail!",
      },
    ],
    expertVersion:
      "Photosynthesis occurs in two stages in the chloroplast. The light-dependent reactions involve Photosystem II and I, which use photons to split water molecules, releasing oxygen and creating ATP and NADPH. The Calvin cycle then uses the enzyme RuBisCO to fix CO₂ into 3-carbon compounds, which are eventually converted into glucose using the ATP and NADPH.",
  },
];

export function Module2Correct() {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [currentScreen, setCurrentScreen] = useState<"select" | "intro" | "annotate" | "mcq" | "learning" | "summary" | "expert">("select");
  const [correctedErrors, setCorrectedErrors] = useState<number[]>([]);
  const [selectedSentence, setSelectedSentence] = useState<number | null>(null);
  const [currentError, setCurrentError] = useState<ErrorInfo | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [aiMood, setAiMood] = useState<Mood>("confused");

  const level = levels[currentLevel];
  const confidence = level.initialConfidence + (correctedErrors.length / level.errors.length) * (95 - level.initialConfidence);

  const handleStartLevel = (levelIndex: number) => {
    if (levelIndex === 0 || completedLevels.includes(levelIndex - 1)) {
      setCurrentLevel(levelIndex);
      setCorrectedErrors([]);
      setCurrentScreen("intro");
      setAiMood("confused");
    }
  };

  const handleSentenceClick = (index: number) => {
    const error = level.errors.find((e) => e.sentenceIndex === index);
    if (error && !correctedErrors.includes(index)) {
      setSelectedSentence(index);
      setCurrentError(error);
      setAiMood("uncertain");
      setCurrentScreen("mcq");
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption !== null && currentError) {
      setShowResult(true);
      const isCorrect = currentError.options[selectedOption].isCorrect;
      if (isCorrect) {
        setAiMood("learning");
        setTimeout(() => {
          setCorrectedErrors([...correctedErrors, currentError.sentenceIndex]);
          setCurrentScreen("learning");
        }, 1500);
      } else {
        setAiMood("confused");
      }
    }
  };

  const handleContinueAfterLearning = () => {
    if (correctedErrors.length >= level.errors.length - 1) {
      setAiMood("happy");
      setCurrentScreen("summary");
    } else {
      setAiMood("uncertain");
      setCurrentScreen("annotate");
    }
  };

  const handleCompleteLevel = () => {
    if (!completedLevels.includes(currentLevel)) {
      setCompletedLevels([...completedLevels, currentLevel]);
    }
    if (currentLevel === levels.length - 1) {
      navigate("/map?completed=2");
    } else {
      setCurrentScreen("select");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-y-auto pb-32">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Module 2: Correct the AI</span>
            <span className="text-sm text-gray-500">
              {completedLevels.length}/{levels.length} Levels
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${(completedLevels.length / levels.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* LEVEL SELECT */}
          {currentScreen === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Choose Your Challenge</h1>
                <p className="text-lg text-gray-600">Help the AI learn from its mistakes</p>
              </div>

              <div className="space-y-4">
                {levels.map((lvl, index) => {
                  const isUnlocked = index === 0 || completedLevels.includes(index - 1);
                  const isCompleted = completedLevels.includes(index);

                  return (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => isUnlocked && handleStartLevel(index)}
                      className={`relative bg-white rounded-3xl shadow-lg p-6 border-2 transition-all ${
                        isUnlocked
                          ? "border-indigo-200 hover:border-indigo-400 cursor-pointer hover:shadow-xl"
                          : "border-gray-200 opacity-50 cursor-not-allowed"
                      } ${isCompleted ? "border-emerald-300 bg-emerald-50" : ""}`}
                    >
                      {!isUnlocked && (
                        <div className="absolute top-4 right-4">
                          <Lock className="w-6 h-6 text-gray-400" />
                        </div>
                      )}

                      {isCompleted && (
                        <div className="absolute top-4 right-4">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                            lvl.stars === 1
                              ? "bg-emerald-100"
                              : lvl.stars === 2
                              ? "bg-amber-100"
                              : "bg-orange-100"
                          }`}
                        >
                          {Array.from({ length: lvl.stars }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                lvl.stars === 1
                                  ? "text-emerald-600 fill-emerald-600"
                                  : lvl.stars === 2
                                  ? "text-amber-600 fill-amber-600"
                                  : "text-orange-600 fill-orange-600"
                              }`}
                            />
                          ))}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{lvl.title}</h3>
                          <span
                            className={`text-sm font-semibold px-3 py-1 rounded-full inline-block mb-2 ${
                              lvl.stars === 1
                                ? "bg-emerald-100 text-emerald-700"
                                : lvl.stars === 2
                                ? "bg-amber-100 text-amber-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {lvl.difficulty}
                          </span>
                          <p className="text-gray-600">{lvl.description}</p>
                        </div>
                      </div>

                      {isUnlocked && (
                        <div className="mt-4 flex justify-end">
                          <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-indigo-700">
                            {isCompleted ? "Play Again" : "Start"}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {completedLevels.length === levels.length && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white text-center"
                >
                  <h2 className="text-3xl font-bold mb-3">🎉 All Levels Complete!</h2>
                  <p className="text-lg mb-6">You've taught the AI so much!</p>
                  <button
                    onClick={() => navigate("/map?completed=2")}
                    className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50"
                  >
                    Complete Module 2
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* INTRO SCREEN */}
          {currentScreen === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-6">
                <AICharacter
                  mood="confused"
                  confidence={level.initialConfidence}
                  message="I tried explaining photosynthesis but I think I messed up... Can you help me find my mistakes?"
                />
              </div>

              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{level.title}</h1>
                <p className="text-gray-600">{level.description}</p>
              </div>

              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-3xl shadow-xl p-8 mb-6 border-2 border-blue-200"
              >
                <div className="mb-4">
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                    🤖 Learner AI's Explanation
                  </span>
                </div>

                <div className="text-xl leading-relaxed text-gray-800 space-y-4">
                  {level.sentences.map((sentence, index) => {
                    const hasError = level.errors.some((e) => e.sentenceIndex === index);
                    return (
                      <p
                        key={index}
                        className={hasError ? "relative" : ""}
                        style={hasError ? { textDecoration: "underline wavy", textDecorationColor: "#fbbf24", textUnderlineOffset: "4px" } : {}}
                      >
                        {sentence}
                      </p>
                    );
                  })}
                </div>
              </motion.div>

              <div className="bg-amber-50 rounded-2xl p-6 mb-6 border-2 border-amber-200">
                <p className="text-gray-700 text-center">
                  <strong>Errors to find:</strong> {level.errors.length} • <strong>Difficulty:</strong> {level.difficulty}
                </p>
              </div>

              <button
                onClick={() => setCurrentScreen("annotate")}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-5 rounded-2xl text-xl font-semibold shadow-lg hover:shadow-xl"
              >
                Help the AI Fix This →
              </button>
            </motion.div>
          )}

          {/* ANNOTATE SCREEN */}
          {currentScreen === "annotate" && (
            <motion.div
              key="annotate"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <div className="mb-6">
                <AICharacter mood={aiMood} confidence={Math.round(confidence)} message="Which part did I get wrong? Tap on a sentence to teach me!" />
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-8 mb-24">
                <div className="space-y-6">
                  {level.sentences.map((sentence, index) => {
                    const hasError = level.errors.some((e) => e.sentenceIndex === index);
                    const isFixed = correctedErrors.includes(index);

                    return (
                      <motion.div
                        key={index}
                        whileHover={hasError && !isFixed ? { scale: 1.01 } : {}}
                        whileTap={hasError && !isFixed ? { scale: 0.99 } : {}}
                        onClick={() => hasError && !isFixed && handleSentenceClick(index)}
                        className={`p-6 rounded-2xl border-2 transition-all ${
                          isFixed
                            ? "bg-emerald-50 border-emerald-300"
                            : hasError
                            ? "bg-yellow-50 border-yellow-300 cursor-pointer hover:border-yellow-400"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <p className="text-lg text-gray-800 leading-relaxed">{sentence}</p>
                        {isFixed && (
                          <div className="mt-3 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            <span className="text-sm font-semibold text-emerald-600">Fixed! ✓</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {correctedErrors.length === level.errors.length && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="fixed bottom-8 left-0 right-0 px-6 max-w-4xl mx-auto"
                >
                  <button
                    onClick={() => {
                      setAiMood("happy");
                      setCurrentScreen("summary");
                    }}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-5 rounded-2xl text-xl font-semibold shadow-2xl"
                  >
                    See AI's Improvement 🎉
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* MCQ SCREEN */}
          {currentScreen === "mcq" && currentError && (
            <motion.div
              key="mcq"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="mb-6">
                <AICharacter mood="uncertain" confidence={Math.round(confidence)} message="Oh no, did I mess up here? What should it be?" />
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">The AI wrote:</h3>
                  <p className="text-xl text-gray-800 bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200">
                    "{level.sentences[currentError.sentenceIndex]}"
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{currentError.mcqQuestion}</h3>

                  <div className="space-y-3">
                    {currentError.options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleOptionSelect(index)}
                        className={`w-full p-5 rounded-xl border-2 text-left transition-all ${
                          selectedOption === index
                            ? showResult
                              ? option.isCorrect
                                ? "border-emerald-400 bg-emerald-50"
                                : "border-red-400 bg-red-50"
                              : "border-indigo-400 bg-indigo-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                        disabled={showResult}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5 ${
                              selectedOption === index
                                ? showResult
                                  ? option.isCorrect
                                    ? "border-emerald-600 bg-emerald-600"
                                    : "border-red-600 bg-red-600"
                                  : "border-indigo-600 bg-indigo-600"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedOption === index && (showResult ? (option.isCorrect ? <CheckCircle2 className="w-6 h-6 text-white" /> : <XCircle className="w-6 h-6 text-white" />) : <div className="w-2 h-2 bg-white rounded-full m-1.5" />)}
                          </div>
                          <div className="flex-1">
                            <p className="text-lg text-gray-800">{option.text}</p>
                            {showResult && selectedOption === index && option.explanation && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className={`mt-2 text-sm ${option.isCorrect ? "text-emerald-700" : "text-red-700"}`}
                              >
                                {option.explanation}
                              </motion.p>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {!showResult && (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl text-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </button>
                )}

                {showResult && currentError.options[selectedOption!].isCorrect && (
                  <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={() => {}}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    AI is learning...
                  </motion.button>
                )}

                {showResult && !currentError.options[selectedOption!].isCorrect && (
                  <button
                    onClick={() => setShowResult(false)}
                    className="w-full bg-gray-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-700"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* LEARNING ANIMATION SCREEN */}
          {currentScreen === "learning" && currentError && (
            <motion.div
              key="learning"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="inline-block mb-6"
                >
                  <div className="text-8xl">💡</div>
                </motion.div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">AI is learning!</h1>
              </div>

              <div className="mb-6">
                <AICharacter mood="learning" confidence={Math.round(confidence)} message={currentError.aiReaction} />
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl shadow-xl p-8 mb-6"
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <h3 className="font-semibold text-gray-900">Before:</h3>
                  </div>
                  <p className="text-lg text-gray-700 bg-red-50 p-4 rounded-xl line-through">
                    {level.sentences[currentError.sentenceIndex]}
                  </p>
                </div>

                <div className="flex justify-center my-4">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="w-8 h-8 text-indigo-600" />
                  </motion.div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-semibold text-gray-900">After your help:</h3>
                  </div>
                  <p className="text-lg text-gray-900 bg-emerald-50 p-4 rounded-xl font-medium">
                    {currentError.options.find((o) => o.isCorrect)?.explanation}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-6 text-center mb-6"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Lightbulb className="w-6 h-6 text-indigo-600" />
                  <span className="text-2xl font-bold text-gray-900">Knowledge +1</span>
                </div>
                <p className="text-gray-600">The AI's understanding improved!</p>
              </motion.div>

              <button
                onClick={handleContinueAfterLearning}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-5 rounded-2xl text-xl font-semibold shadow-lg"
              >
                {correctedErrors.length >= level.errors.length - 1 ? "See Final Results →" : "Find Next Mistake →"}
              </button>
            </motion.div>
          )}

          {/* SUMMARY SCREEN */}
          {currentScreen === "summary" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Amazing Work!</h1>
                <p className="text-xl text-gray-600">You taught the AI so much!</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="bg-white rounded-3xl p-6 shadow-lg"
                >
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-3">😕</div>
                    <h3 className="font-bold text-gray-900 mb-2">Before</h3>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-gray-400 to-gray-500" style={{ width: `${level.initialConfidence}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{level.initialConfidence}%</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-3xl p-6 shadow-lg border-2 border-emerald-300"
                >
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-3">🎓</div>
                    <h3 className="font-bold text-gray-900 mb-2">After</h3>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: `${level.initialConfidence}%` }}
                          animate={{ width: "95%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-emerald-400 to-green-500"
                        />
                      </div>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="text-sm font-semibold text-emerald-600"
                      >
                        95%
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 mb-8 border-2 border-emerald-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">You taught the AI:</h3>
                <div className="space-y-3">
                  {level.errors.map((error, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3 bg-white p-4 rounded-xl"
                    >
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-800">{error.options.find((o) => o.isCorrect)?.explanation}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <button
                onClick={() => setCurrentScreen("expert")}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-5 rounded-2xl text-xl font-semibold shadow-lg mb-4"
              >
                See Expert Version →
              </button>
            </motion.div>
          )}

          {/* EXPERT SCREEN */}
          {currentScreen === "expert" && (
            <motion.div
              key="expert"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Before & After</h1>
                <p className="text-lg text-gray-600">See the transformation</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  Original (Had mistakes)
                </h2>
                <div className="bg-red-50 rounded-2xl shadow-lg p-6 border-2 border-red-200">
                  <p className="text-lg text-gray-800 leading-relaxed">{level.sentences.join(" ")}</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  After your teaching
                </h2>
                <div className="bg-emerald-50 rounded-2xl shadow-lg p-6 border-2 border-emerald-200">
                  <p className="text-lg text-gray-800 leading-relaxed font-medium">{level.expertVersion}</p>
                </div>
              </div>

              <button
                onClick={handleCompleteLevel}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-5 rounded-2xl text-xl font-semibold shadow-lg"
              >
                {currentLevel === levels.length - 1 ? "Complete Module 2 🎉" : `Unlock ${levels[currentLevel + 1].title} →`}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
