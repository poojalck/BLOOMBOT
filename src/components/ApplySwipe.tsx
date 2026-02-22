import { motion, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { BloomBot } from "./BloomBot";
import { Check, X, Lightbulb, ThumbsDown, ThumbsUp } from "lucide-react";

import aloePlantImg from "figma:asset/714b3b2edc28b44dbaf2685a5c16db0519f38a1a.png";
import mushroomImg from "figma:asset/6b0399e52d704690bb5f4653daed2026417ba739.png";
import artificialPlantImg from "figma:asset/15d7297e6e6e82bee0c6f6566c97fd0104d22b4d.png";
import algaeImg from "figma:asset/b7d3a0e5954b9d7ef7107a3a64305f0cab06df24.png";

interface Card {
  id: number;
  title: string;
  image: string;
  isCorrect: boolean;
  hint: string;
}

export function ApplySwipe() {
  const navigate = useNavigate();
  const [currentCard, setCurrentCard] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [lastTap, setLastTap] = useState<{ time: number; zone: string } | null>(null);
  const [tapIndicator, setTapIndicator] = useState<{ x: number; y: number; show: boolean }>({ x: 0, y: 0, show: false });

  const cards: Card[] = [
    {
      id: 1,
      title: "Aloe Vera Plant",
      image: aloePlantImg,
      isCorrect: true,
      hint: "This succulent has chlorophyll and can make its own food!",
    },
    {
      id: 2,
      title: "Mushrooms",
      image: mushroomImg,
      isCorrect: false,
      hint: "Mushrooms are fungi - they don't have chlorophyll!",
    },
    {
      id: 3,
      title: "Artificial Plant",
      image: artificialPlantImg,
      isCorrect: false,
      hint: "It looks beautiful, but it's not alive!",
    },
    {
      id: 4,
      title: "Algae in Pond",
      image: algaeImg,
      isCorrect: true,
      hint: "Algae are photosynthetic organisms!",
    },
  ];

  const x = useMotionValue(0);

  const handleTap = (event: React.MouseEvent | React.TouchEvent) => {
    const currentTime = Date.now();
    const rect = event.currentTarget.getBoundingClientRect();
    
    let clientX: number;
    let clientY: number;
    
    if ('touches' in event) {
      clientX = event.touches[0]?.clientX || event.changedTouches[0]?.clientX || 0;
      clientY = event.touches[0]?.clientY || event.changedTouches[0]?.clientY || 0;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    
    const tapX = clientX - rect.left;
    const tapY = clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Show tap indicator
    setTapIndicator({ x: tapX, y: tapY, show: true });
    setTimeout(() => setTapIndicator({ x: 0, y: 0, show: false }), 300);

    // Determine zone
    let zone = "";
    if (tapY > height * 0.7) {
      zone = "bottom";
    } else if (tapX < width * 0.35) {
      zone = "left";
    } else if (tapX > width * 0.65) {
      zone = "right";
    } else {
      zone = "center";
    }

    // Check for double tap
    if (lastTap && currentTime - lastTap.time < 300 && lastTap.zone === zone) {
      // Double tap detected!
      if (zone === "left") {
        handleSwipe("left");
      } else if (zone === "right") {
        handleSwipe("right");
      } else if (zone === "bottom") {
        setShowHint(true);
        setTimeout(() => setShowHint(false), 3000);
      }
      setLastTap(null);
    } else {
      setLastTap({ time: currentTime, zone });
    }
  };

  const handleSwipe = (dir: "left" | "right") => {
    const isCorrectSwipe =
      (dir === "right" && cards[currentCard].isCorrect) ||
      (dir === "left" && !cards[currentCard].isCorrect);

    setIsCorrectAnswer(isCorrectSwipe);
    setShowFeedback(true);

    // Animate card off screen
    x.set(dir === "right" ? 500 : -500);

    setTimeout(() => {
      setShowFeedback(false);
      setShowHint(false);
      if (currentCard < cards.length - 1) {
        setCurrentCard(currentCard + 1);
        x.set(0);
      } else {
        navigate("/complete");
      }
    }, 2000); // Increased to 2s to give time to see feedback
  };

  if (currentCard === 0) {
    return (
      <div className="h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 flex flex-col items-start justify-start px-6 py-12 overflow-y-auto">
        {/* BloomBot Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0, x: -50 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mb-6"
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img 
                src={require("figma:asset/1b48733b520f2cd34ec9c3f49762c8d527fd8b08.png")}
                alt="BloomBot" 
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 blur-xl opacity-50 -z-10" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white"
            />
          </motion.div>
        </motion.div>

        {/* Chat messages */}
        <div className="w-full max-w-2xl space-y-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="relative bg-white rounded-3xl rounded-tl-sm px-6 py-4 shadow-xl max-w-lg"
          >
            <p className="text-gray-800 text-lg">
              Let's Test Your Application Knowledge Now!
            </p>
            <div className="absolute -left-2 top-3 w-4 h-4 bg-white transform rotate-45" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="relative bg-white rounded-3xl rounded-tl-sm px-6 py-4 shadow-xl max-w-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500 rounded-full p-3 flex-shrink-0">
                  <ThumbsUp className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-800 text-lg">
                  <strong>Double-tap RIGHT →</strong> = Yes!
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-red-500 rounded-full p-3 flex-shrink-0">
                  <ThumbsDown className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-800 text-lg">
                  <strong>Double-tap LEFT ←</strong> = Nope!
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-amber-500 rounded-full p-3 flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-800 text-lg">
                  <strong>Double-tap BOTTOM ↓</strong> = Hint!
                </p>
              </div>
            </div>
            <div className="absolute -left-2 top-3 w-4 h-4 bg-white transform rotate-45" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, type: "spring" }}
            className="relative bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-3xl rounded-tl-sm px-6 py-4 shadow-xl max-w-lg"
          >
            <p className="text-white text-lg font-medium">
              Tap tap! It's that easy! 💪✨
            </p>
            <div className="absolute -left-2 top-3 w-4 h-4 bg-emerald-400 transform rotate-45" />
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="w-full max-w-2xl"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentCard(1)}
            className="w-full bg-white text-purple-900 px-8 py-5 rounded-3xl text-xl font-bold shadow-2xl flex items-center justify-center gap-3"
          >
            <span>Let's go!</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              👆
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const currentCardData = cards[currentCard - 1];

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-hidden relative flex items-center justify-center p-4">
      {/* Progress Dots - Top */}
      <div className="absolute top-8 left-0 right-0 px-8 z-20 pointer-events-none">
        <div className="flex gap-2 justify-center">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`w-12 h-1.5 rounded-full transition-all ${
                index < currentCard - 1 ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <motion.div
        key={currentCard}
        style={{ x }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md h-[600px]"
        onClick={handleTap}
        onTouchStart={handleTap}
      >
        <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden shadow-2xl cursor-pointer select-none">
          <img
            src={currentCardData.image}
            alt={currentCardData.title}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

          {/* Tap zones indicators */}
          <div className="absolute top-0 left-0 w-1/3 h-2/3 pointer-events-none">
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="bg-red-500/20 backdrop-blur-sm border-2 border-red-500/50 rounded-2xl px-4 py-2">
                <p className="text-white text-sm font-bold">👆👆</p>
                <p className="text-white text-xs">NOPE</p>
              </div>
            </motion.div>
          </div>

          <div className="absolute top-0 right-0 w-1/3 h-2/3 pointer-events-none">
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="bg-emerald-500/20 backdrop-blur-sm border-2 border-emerald-500/50 rounded-2xl px-4 py-2">
                <p className="text-white text-sm font-bold">👆👆</p>
                <p className="text-white text-xs">YES</p>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1/4 pointer-events-none">
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="w-full h-full flex items-center justify-center pb-20"
            >
              <div className="bg-amber-500/20 backdrop-blur-sm border-2 border-amber-500/50 rounded-2xl px-4 py-2">
                <p className="text-white text-sm font-bold">👆👆 HINT</p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
            <h3 className="text-white text-3xl font-bold mb-2 drop-shadow-2xl">
              {currentCardData.title}
            </h3>
            <p className="text-white/90 text-xl drop-shadow-lg">
              Does this do photosynthesis?
            </p>
          </div>

          {/* Tap indicator ripple */}
          {tapIndicator.show && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                left: tapIndicator.x,
                top: tapIndicator.y,
                transform: 'translate(-50%, -50%)',
              }}
              className="w-16 h-16 rounded-full border-4 border-white pointer-events-none"
            />
          )}
        </div>
      </motion.div>

      {/* Hint Box */}
      {showHint && (
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="absolute bottom-8 left-4 right-4 bg-amber-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-30 pointer-events-none"
        >
          <Lightbulb className="w-6 h-6 flex-shrink-0" />
          <p className="text-base font-medium">{currentCardData.hint}</p>
        </motion.div>
      )}

      {/* Feedback Animation */}
      {showFeedback && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none bg-black/50"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{ duration: 0.5 }}
            className={`${
              isCorrectAnswer ? "bg-emerald-500" : "bg-red-500"
            } text-white rounded-full p-12 shadow-2xl`}
          >
            {isCorrectAnswer ? (
              <div className="text-center">
                <Check className="w-20 h-20 mb-2 mx-auto" />
                <p className="text-3xl font-bold">Nice! 🎉</p>
              </div>
            ) : (
              <div className="text-center">
                <X className="w-20 h-20 mb-4 mx-auto" />
                <p className="text-3xl font-bold mb-2">Oops! 😅</p>
                <p className="text-lg">
                  The answer is: <strong>{currentCardData.isCorrect ? "YES" : "NOPE"}</strong>
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      <BloomBot message="Double-tap left, right, or bottom! 👆👆" position="top" />
    </div>
  );
}