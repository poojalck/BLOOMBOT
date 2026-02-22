import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Eye, Pencil, Eraser, Download, RotateCcw, Home } from "lucide-react";
import diagramImage from "figma:asset/4570e6d916bc99a39a9fec41892d5c11a87ea657.png";

type Phase = "intro" | "observe" | "create" | "feedback" | "complete";

export function Module4Create() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("intro");
  const [countdown, setCountdown] = useState(5);
  const [dialogueStep, setDialogueStep] = useState(0);
  const [selectedColor, setSelectedColor] = useState("#22c55e");
  const [selectedTool, setSelectedTool] = useState<"pen" | "marker" | "eraser">("pen");
  const [isDrawing, setIsDrawing] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasCleared, setCanvasCleared] = useState(false);

  const colors = [
    { name: "Green", value: "#22c55e" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Yellow", value: "#fbbf24" }
  ];

  const hints = [
    "Start anywhere you remember.",
    "Where does sunlight go?",
    "What leaves the plant?",
    "What does the plant take in?",
    "How does it all connect?"
  ];

  useEffect(() => {
    if (phase === "observe" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (phase === "observe" && countdown === 0) {
      setTimeout(() => setPhase("create"), 500);
    }
  }, [phase, countdown]);

  useEffect(() => {
    if (phase === "create") {
      const hintTimer = setInterval(() => {
        setHintIndex((prev) => (prev + 1) % hints.length);
      }, 15000);
      return () => clearInterval(hintTimer);
    }
  }, [phase]);

  const dialogues = [
    "Most people stop after learning.",
    "But the brain remembers best when it recreates.",
    "You won't copy.\nYou'll observe… then rebuild it from memory."
  ];

  const handleNextDialogue = () => {
    if (dialogueStep < dialogues.length - 1) {
      setDialogueStep(dialogueStep + 1);
    } else {
      setPhase("observe");
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    if (selectedTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 20;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = selectedTool === "marker" ? 8 : 3;
      ctx.strokeStyle = selectedColor;
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasCleared(true);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "my-photosynthesis-diagram.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  // INTRO PHASE
  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center relative overflow-hidden px-6">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
                x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute text-6xl"
            >
              {["🎨", "✏️", "🖍️", "🖌️", "✨"][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>

        {/* BloomBot mascot */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1 }}
          className="absolute top-8 left-8 w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center text-4xl border-4 border-purple-300"
        >
          🤖
        </motion.div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-4 border-white mb-8"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={dialogueStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-3xl text-gray-900 leading-relaxed font-medium whitespace-pre-line"
              >
                {dialogues[dialogueStep]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            onClick={handleNextDialogue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3 mx-auto"
          >
            {dialogueStep < dialogues.length - 1 ? (
              <>
                <Sparkles className="w-6 h-6" />
                Continue
              </>
            ) : (
              <>
                <Eye className="w-6 h-6" />
                👀 Observe Carefully
              </>
            )}
          </motion.button>
        </div>
      </div>
    );
  }

  // OBSERVE PHASE
  if (phase === "observe") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 flex flex-col items-center justify-center relative overflow-hidden px-6">
        {/* Timer countdown */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-8 right-8 w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-yellow-400"
        >
          <motion.div
            key={countdown}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-bold text-gray-900"
          >
            {countdown}
          </motion.div>
        </motion.div>

        {/* Instruction */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl text-white font-medium mb-8 text-center"
        >
          Just observe. Don't try to memorize.
        </motion.p>

        {/* Photosynthesis diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-white rounded-3xl p-8 shadow-2xl max-w-2xl"
        >
          <img 
            src={diagramImage} 
            alt="Photosynthesis diagram" 
            className="w-full h-auto rounded-2xl"
          />
        </motion.div>
      </div>
    );
  }

  // CREATE PHASE
  if (phase === "create") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex flex-col relative overflow-hidden">
        {/* BloomBot floating companion */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute top-8 left-8 z-20"
        >
          <div className="bg-white rounded-2xl p-4 shadow-2xl border-4 border-purple-300 max-w-xs">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                🤖
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={hintIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-gray-800 leading-relaxed"
                >
                  {hints[hintIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm shadow-lg px-6 py-4 relative z-10">
          <h2 className="text-xl font-bold text-gray-900 text-center">
            Draw the photosynthesis process the way you remember it.
          </h2>
          <p className="text-sm text-gray-600 text-center mt-1">
            No reference image • No pressure • Accuracy &gt; beauty
          </p>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center p-6 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-4xl w-full">
            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="border-2 border-gray-300 rounded-xl cursor-crosshair w-full touch-none"
              style={{ maxHeight: '500px' }}
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white/90 backdrop-blur-sm shadow-lg px-6 py-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Tools */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={() => setSelectedTool("pen")}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  selectedTool === "pen"
                    ? "bg-purple-500 text-white shadow-lg scale-105"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Pencil className="w-5 h-5" />
                Pen
              </button>
              <button
                onClick={() => setSelectedTool("marker")}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  selectedTool === "marker"
                    ? "bg-purple-500 text-white shadow-lg scale-105"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Pencil className="w-5 h-5" />
                Marker
              </button>
              <button
                onClick={() => setSelectedTool("eraser")}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  selectedTool === "eraser"
                    ? "bg-purple-500 text-white shadow-lg scale-105"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Eraser className="w-5 h-5" />
                Eraser
              </button>
            </div>

            {/* Colors */}
            <div className="flex items-center justify-center gap-3 mb-4">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-12 h-12 rounded-full border-4 transition-all ${
                    selectedColor === color.value
                      ? "border-purple-500 scale-110 shadow-lg"
                      : "border-gray-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={clearCanvas}
                className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Clear
              </button>
              <button
                onClick={() => setPhase("feedback")}
                className="px-10 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center gap-2"
              >
                ✅ Finish Drawing
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // FEEDBACK PHASE
  if (phase === "feedback") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-emerald-400 to-green-400 flex items-center justify-center relative overflow-hidden px-6">
        <div className="max-w-3xl mx-auto relative z-10">
          {/* BloomBot message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-2xl mb-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
                🤖
              </div>
              <div>
                <p className="text-2xl text-gray-900 leading-relaxed mb-4">
                  "This isn't about art.<br />
                  It's about how your brain connects ideas."
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Positive feedback */}
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6">
                <h3 className="font-bold text-emerald-800 text-lg mb-3 flex items-center gap-2">
                  ✨ What you remembered correctly:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-emerald-500">•</span>
                    <span>Sunlight and water as key inputs</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-emerald-500">•</span>
                    <span>The central role of leaves in the process</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <span className="text-emerald-500">•</span>
                    <span>The flow and transformation of elements</span>
                  </li>
                </ul>
              </div>

              {/* Gentle improvement note */}
              <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-6">
                <h3 className="font-bold text-blue-800 text-lg mb-3 flex items-center gap-2">
                  💡 One thing to explore further:
                </h3>
                <p className="text-gray-700">
                  The oxygen release wasn't fully shown — that's okay! The important thing is you recreated the core concept from memory.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action buttons */}
          <div className="flex gap-4 justify-center">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => {
                clearCanvas();
                setPhase("create");
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-teal-600 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
            >
              <Pencil className="w-5 h-5" />
              ✏️ Improve Drawing
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => setPhase("complete")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-teal-600 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              ✅ Finish Module
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // COMPLETE PHASE
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center relative overflow-hidden px-6">
      {/* Celebratory particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
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
              rotate: Math.random() * 720,
              opacity: 0
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-4xl"
          >
            {["🏆", "🎉", "⭐", "✨", "🌟", "💫"][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.5 }}
          className="w-40 h-40 mx-auto mb-8 bg-white rounded-full shadow-2xl flex items-center justify-center text-7xl border-8 border-yellow-300"
        >
          🏆
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-6xl font-bold text-white mb-4"
        >
          Journey Complete
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-3xl text-white/90 mb-12 leading-relaxed"
        >
          You didn't just learn photosynthesis —<br />
          you recreated it.
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="bg-white/30 backdrop-blur-sm rounded-full h-6 mb-12 overflow-hidden"
        >
          <motion.div
            initial={{ width: "75%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
            className="bg-white h-full rounded-full shadow-lg"
          />
        </motion.div>

        {/* BloomBot final message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl border-4 border-white"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
              🤖
            </div>
            <p className="text-2xl text-gray-900 leading-relaxed text-left">
              "If you can rebuild it from memory,<br />
              you truly understand it."
            </p>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="grid grid-cols-2 gap-4"
        >
          <button
            onClick={saveCanvas}
            className="bg-white text-orange-600 px-6 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            💾 Save Sketch
          </button>
          <button
            onClick={() => navigate("/map")}
            className="bg-white text-orange-600 px-6 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            🔁 Learning Map
          </button>
        </motion.div>
      </div>
    </div>
  );
}