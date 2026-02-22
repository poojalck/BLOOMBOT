import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { CheckCircle2, XCircle, Sparkles, HelpCircle } from "lucide-react";
import avatarImage from "figma:asset/e402b202fae395b1c1a3ad5e7a300f8f32574a45.png";

interface FixTask {
  id: number;
  type: "fill-diagram" | "order-steps" | "complete-visual";
  title: string;
  instruction: string;
  options?: string[];
  correctAnswer: string | string[];
  hint: string;
}

const tasks: FixTask[] = [
  {
    id: 1,
    type: "fill-diagram",
    title: "Complete the Photosynthesis Diagram",
    instruction: "Fill in the missing parts:",
    options: ["Oxygen", "Carbon Dioxide", "Water", "Nitrogen"],
    correctAnswer: "Carbon Dioxide",
    hint: "Think about what gas plants absorb from the air..."
  },
  {
    id: 2,
    type: "order-steps",
    title: "Fix the Process Order",
    instruction: "Arrange these steps in the correct sequence:",
    options: [
      "Plant releases oxygen",
      "Chloroplasts absorb sunlight",
      "Plant takes in CO₂",
      "Glucose is created"
    ],
    correctAnswer: ["Chloroplasts absorb sunlight", "Plant takes in CO₂", "Glucose is created", "Plant releases oxygen"],
    hint: "What happens first? Energy capture or chemical reaction?"
  },
  {
    id: 3,
    type: "complete-visual",
    title: "Complete the Equation",
    instruction: "Select the missing element in the photosynthesis equation:",
    options: ["H₂O (Water)", "N₂ (Nitrogen)", "O₃ (Ozone)", "CH₄ (Methane)"],
    correctAnswer: "H₂O (Water)",
    hint: "Plants need this liquid to survive..."
  }
];

export function Module4Fix() {
  const navigate = useNavigate();
  const [currentTask, setCurrentTask] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [orderedSteps, setOrderedSteps] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const task = tasks[currentTask];

  const handleSubmit = () => {
    let correct = false;

    if (task.type === "fill-diagram" || task.type === "complete-visual") {
      correct = selectedAnswer === task.correctAnswer;
    } else if (task.type === "order-steps") {
      correct = JSON.stringify(orderedSteps) === JSON.stringify(task.correctAnswer);
    }

    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentTask < tasks.length - 1) {
      setCurrentTask(prev => prev + 1);
      setSelectedAnswer("");
      setOrderedSteps([]);
      setShowFeedback(false);
      setShowHint(false);
    } else {
      navigate("/final-complete");
    }
  };

  const handleDragStart = (item: string) => {
    setDraggedItem(item);
  };

  const handleDrop = (targetItem: string) => {
    if (!draggedItem || !task.options) return;
    
    const items = orderedSteps.length > 0 ? orderedSteps : task.options;
    const dragIndex = items.indexOf(draggedItem);
    const dropIndex = items.indexOf(targetItem);
    
    const newItems = [...items];
    newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);
    
    setOrderedSteps(newItems);
    setDraggedItem(null);
  };

  // Initialize ordered steps for drag-and-drop
  if (task.type === "order-steps" && orderedSteps.length === 0 && task.options) {
    setOrderedSteps([...task.options]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 overflow-y-auto relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              rotate: [null, Math.random() * 360]
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-5xl"
          >
            {["🔧", "⚙️", "🛠️", "✨", "🎨"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 pb-32 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 rounded-2xl px-6 py-4 shadow-lg">
            <Sparkles className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-bold text-orange-900">
              Module 4: Create by Fixing • Task {currentTask + 1}/3
            </h2>
          </div>
        </motion.div>

        {/* BloomBot Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-xl border-4 border-orange-400 bg-white">
              <img 
                src={avatarImage} 
                alt="BloomBot" 
                className="w-full h-full object-cover scale-110"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Task Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 p-8 mb-6"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{task.title}</h3>
          <p className="text-gray-700 text-lg mb-6">{task.instruction}</p>

          {/* Fill Diagram / Complete Visual */}
          {(task.type === "fill-diagram" || task.type === "complete-visual") && (
            <div className="space-y-3">
              {task.type === "complete-visual" && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-emerald-300 rounded-xl p-6 mb-6">
                  <p className="text-center text-xl font-mono text-gray-800">
                    6CO₂ + <span className="bg-yellow-200 px-3 py-1 rounded">?</span> + Light → C₆H₁₂O₆ + 6O₂
                  </p>
                </div>
              )}

              {task.options?.map((option) => (
                <motion.button
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  disabled={showFeedback}
                  whileHover={!showFeedback ? { scale: 1.02, x: 5 } : {}}
                  whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left font-medium text-lg ${
                    selectedAnswer === option
                      ? "bg-blue-100 border-blue-400"
                      : "bg-gray-50 border-gray-300 hover:border-blue-300"
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          )}

          {/* Order Steps */}
          {task.type === "order-steps" && (
            <div className="space-y-3">
              {orderedSteps.map((step, index) => (
                <motion.div
                  key={step}
                  draggable={!showFeedback}
                  onDragStart={() => handleDragStart(step)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(step)}
                  whileHover={!showFeedback ? { scale: 1.02 } : {}}
                  className={`flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-4 ${
                    !showFeedback ? "cursor-move" : ""
                  } shadow-md hover:shadow-lg transition-all`}
                >
                  <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p className="flex-1 text-gray-800 font-medium">{step}</p>
                  {!showFeedback && <div className="text-gray-400">⋮⋮</div>}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Hint Button */}
        {!showFeedback && (
          <motion.button
            onClick={() => setShowHint(!showHint)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 text-amber-900 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mb-6"
          >
            <HelpCircle className="w-5 h-5" />
            {showHint ? "Hide Hint" : "Need a Hint?"}
          </motion.button>
        )}

        {/* Hint Display */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-300 rounded-xl p-4">
                <p className="text-blue-900 font-medium">💡 {task.hint}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <div className={`rounded-2xl p-6 ${
              isCorrect
                ? "bg-emerald-100 border-2 border-emerald-400"
                : "bg-rose-100 border-2 border-rose-400"
            }`}>
              <div className="flex items-center gap-3 mb-2">
                {isCorrect ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                ) : (
                  <XCircle className="w-8 h-8 text-rose-600" />
                )}
                <h4 className={`text-2xl font-bold ${
                  isCorrect ? "text-emerald-900" : "text-rose-900"
                }`}>
                  {isCorrect ? "Perfect! 🎉" : "Not quite right 🤔"}
                </h4>
              </div>
              <p className={`text-lg ${
                isCorrect ? "text-emerald-800" : "text-rose-800"
              }`}>
                {isCorrect
                  ? "Great work! You fixed it correctly!"
                  : "Try reviewing the concept and give it another shot!"}
              </p>
            </div>
          </motion.div>
        )}

        {/* Submit/Next Button */}
        {!showFeedback ? (
          <motion.button
            onClick={handleSubmit}
            disabled={
              (task.type !== "order-steps" && !selectedAnswer) ||
              (task.type === "order-steps" && orderedSteps.length === 0)
            }
            whileHover={selectedAnswer || orderedSteps.length > 0 ? { scale: 1.02 } : {}}
            whileTap={selectedAnswer || orderedSteps.length > 0 ? { scale: 0.98 } : {}}
            className={`w-full py-5 rounded-2xl font-bold text-xl shadow-xl transition-all flex items-center justify-center gap-3 ${
              selectedAnswer || orderedSteps.length > 0
                ? "bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white hover:shadow-2xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Sparkles className="w-6 h-6" />
            Submit Answer
          </motion.button>
        ) : isCorrect ? (
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
          >
            {currentTask < tasks.length - 1 ? "Next Task →" : "Complete Module →"}
          </motion.button>
        ) : (
          <motion.button
            onClick={() => {
              setShowFeedback(false);
              setSelectedAnswer("");
              setShowHint(false);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
          >
            Try Again
          </motion.button>
        )}
      </div>
    </div>
  );
}