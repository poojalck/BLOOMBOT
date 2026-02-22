import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, Volume2, Check, X, MessageCircle, Heart, Share2, Bookmark, Send, Sparkles, FileText, ChevronUp } from "lucide-react";

interface Reel {
  id: number;
  title: string;
  content: string;
  videoUrl: string;
  question: string;
  options: { text: string; correct: boolean }[];
}

export function LearnReels() {
  const navigate = useNavigate();
  const [currentReel, setCurrentReel] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const reels: Reel[] = [
  {
    id: 1,
    title: "What is Photosynthesis?",
    content:
      "The magical process where plants make their own food using sunlight, water, and air!",
    videoUrl: "https://res.cloudinary.com/dn7ymrhdz/video/upload/v1770398562/Photosynthesis_Explained_720p_caption_pdrtmv.mp4",
    question: "Photosynthesis helps plants make their own food. True or False?",
    options: [
      { text: "True ✓", correct: true },
      { text: "False ✗", correct: false },
    ],
  },
  {
    id: 2,
    title: "Why Plants Need It",
    content:
      "Just like we need food for energy, plants need photosynthesis to grow, stay healthy, and survive!",
    videoUrl: "https://res.cloudinary.com/dn7ymrhdz/video/upload/v1770398765/Photosynthesis__The_Two-Phase_Powerhouse_720p_caption_qvwz0o.mp4",
    question: "Why do plants need photosynthesis?",
    options: [
      { text: "To sleep", correct: false },
      { text: "For energy & growth", correct: true },
      { text: "To move around", correct: false },
    ],
  },
  {
    id: 3,
    title: "The Inputs",
    content:
      "Plants need three things: Sunlight, Water, and Carbon Dioxide from air",
    videoUrl: "https://res.cloudinary.com/dn7ymrhdz/video/upload/v1770398880/The_Photosynthesis_Speed_Bar_720p_caption_nzmtaa.mp4",
    question: "What does a plant need for photosynthesis?",
    options: [
      { text: "Only water", correct: false },
      { text: "Sunlight, water, CO₂", correct: true },
      { text: "Only sunlight", correct: false },
    ],
  },
];

  const currentReelData = reels[currentReel];

  // AI responses based on the current reel
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const reelId = currentReelData.id;

    if (lowerMessage.includes("note") || lowerMessage.includes("summary")) {
      if (reelId === 1) {
        return "📝 **Notes Generated!**\n\n**What is Photosynthesis?**\n• Process where plants make their own food\n• Uses sunlight, water, and CO₂\n• Happens in leaves (chloroplasts)\n• Essential for plant survival\n• Produces oxygen as a byproduct";
      } else if (reelId === 2) {
        return "📝 **Notes Generated!**\n\n**Why Plants Need Photosynthesis:**\n• Primary source of energy\n• Enables growth and development\n• Maintains plant health\n• Produces glucose (food)\n• Sustains plant life";
      } else {
        return "📝 **Notes Generated!**\n\n**Photosynthesis Inputs:**\n• Sunlight (energy source)\n• Water (H₂O) from soil\n• Carbon Dioxide (CO₂) from air\n• All three are essential\n• Process occurs in chloroplasts";
      }
    }

    if (lowerMessage.includes("how") || lowerMessage.includes("work")) {
      if (reelId === 1) {
        return "Great question! 🌿 Photosynthesis works in two main stages:\n\n1. **Light reactions**: Capture sunlight energy in chloroplasts\n2. **Calvin cycle**: Uses that energy to convert CO₂ into glucose\n\nThink of it like a solar-powered food factory!";
      } else if (reelId === 2) {
        return "Plants need photosynthesis just like we need meals! 🍽️\n\nThe glucose they produce is:\n• Broken down for energy (like our metabolism)\n• Used to build cell structures\n• Stored for later use\n\nWithout it, plants would starve!";
      } else {
        return "The three inputs work together perfectly! ⚡\n\n• **Sunlight** provides energy\n• **Water** provides electrons and hydrogen\n• **CO₂** provides carbon for glucose\n\nIt's like a recipe - you need all ingredients!";
      }
    }

    if (lowerMessage.includes("why") || lowerMessage.includes("important")) {
      return "Photosynthesis is crucial because:\n\n🌍 Produces oxygen we breathe\n🌱 Foundation of food chains\n🔋 Converts solar energy to chemical energy\n🌡️ Helps regulate atmospheric CO₂\n\nAll life on Earth depends on it!";
    }

    if (lowerMessage.includes("where")) {
      return "Photosynthesis happens in **chloroplasts** 🔬\n\nThese are tiny organelles in plant cells, mainly in leaves. They contain chlorophyll (the green pigment) that captures sunlight.\n\nFun fact: One leaf can have millions of chloroplasts!";
    }

    return `Great question about ${currentReelData.title}! 💡\n\nI can help you with:\n• Detailed explanations\n• Generate study notes\n• Answer specific questions\n• Break down complex concepts\n\nTry asking: "How does it work?" or "Generate notes"`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = { role: 'user' as const, text: inputMessage };
    const aiResponse = { role: 'ai' as const, text: getAIResponse(inputMessage) };

    setChatMessages([...chatMessages, newUserMessage, aiResponse]);
    setInputMessage("");
  };

  const generateNotes = () => {
    const notesMessage = { role: 'user' as const, text: "Generate notes for this video" };
    const aiResponse = { role: 'ai' as const, text: getAIResponse("generate notes") };
    setChatMessages([...chatMessages, notesMessage, aiResponse]);
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setAnswered(true);

    setTimeout(() => {
      if (currentReel < reels.length - 1) {
        setCurrentReel(currentReel + 1);
        setShowQuestion(false);
        setSelectedAnswer(null);
        setAnswered(false);
        setShowAIChat(false);
        setChatMessages([]);
        setLiked(false);
        setBookmarked(false);
      } else {
        navigate("/transition");
      }
    }, 2500); // Increased delay to 2.5s to give time to see correct answer
  };

  const handleNextReel = () => {
    setShowQuestion(true);
  };

  const handleScroll = () => {
    setIsScrolling(true);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Handle wheel and touch events for scrolling between reels
  useEffect(() => {
    if (showQuestion) return;

    let touchStartY = 0;
    let touchEndY = 0;
    let isHandlingSwipe = false;

    const handleWheel = (e: WheelEvent) => {
      if (showAIChat || isHandlingSwipe) return;
      
      e.preventDefault();
      
      if (Math.abs(e.deltaY) < 10) return; // Ignore small scrolls
      
      if (e.deltaY > 0) {
        // Scrolling down - go to next reel or show question
        isHandlingSwipe = true;
        handleNextReel();
        setTimeout(() => { isHandlingSwipe = false; }, 1000);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (showAIChat) return;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (showAIChat || isHandlingSwipe) return;
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (showAIChat || isHandlingSwipe) return;
      
      const swipeDistance = touchStartY - touchEndY;
      const minSwipeDistance = 50;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          // Swiped up - go to next reel or show question
          isHandlingSwipe = true;
          handleNextReel();
          setTimeout(() => { isHandlingSwipe = false; }, 1000);
        } else {
          // Swiped down - go to previous reel
          if (currentReel > 0) {
            isHandlingSwipe = true;
            setCurrentReel(currentReel - 1);
            setShowAIChat(false);
            setChatMessages([]);
            setLiked(false);
            setBookmarked(false);
            setTimeout(() => { isHandlingSwipe = false; }, 1000);
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentReel, showQuestion, showAIChat]);

  return (
    <div className="h-screen bg-black overflow-hidden relative">
      <AnimatePresence mode="wait">
        {!showQuestion ? (
          <motion.div
            key={`reel-${currentReel}`}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="h-full w-full relative bg-black"
          >
            {/* Full Screen Video */}
            <video
              key={currentReelData.videoUrl}
              src={currentReelData.videoUrl}
              autoPlay
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

            {/* Progress Indicator - Top */}
            <div className="absolute top-4 left-0 right-0 flex gap-1 px-4 z-20">
              {reels.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-1 rounded-full transition-all ${
                    index <= currentReel ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            {/* Bottom Content Area */}
            <div className="absolute bottom-0 left-0 right-20 p-6 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-white text-2xl font-bold mb-2 drop-shadow-lg">
                  {currentReelData.title}
                </h2>
                <p className="text-white/90 text-base drop-shadow-lg mb-4">
                  {currentReelData.content}
                </p>
                
                {/* Next Button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextReel}
                  className="bg-white/20 backdrop-blur-sm text-white rounded-full px-6 py-3 flex items-center gap-2 hover:bg-white/30 transition-colors"
                >
                  <span className="text-sm font-medium">Take Quick Check</span>
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </div>

            {/* Right Side Action Buttons (Instagram Style) */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-20">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setLiked(!liked)}
                className="flex flex-col items-center gap-1"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  liked ? 'bg-red-500' : 'bg-white/20 backdrop-blur-sm'
                }`}>
                  <Heart className={`w-6 h-6 ${liked ? 'text-white fill-white' : 'text-white'}`} />
                </div>
                <span className="text-white text-xs font-medium drop-shadow-lg">
                  {liked ? '124' : '123'}
                </span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowAIChat(!showAIChat);
                  if (!showAIChat && chatMessages.length === 0) {
                    setChatMessages([{
                      role: 'ai',
                      text: `Hi! 👋 I'm your AI tutor for "${currentReelData.title}"\n\nAsk me anything about this concept, or I can generate study notes for you!`
                    }]);
                  }
                }}
                className="flex flex-col items-center gap-1"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  showAIChat ? 'bg-emerald-500' : 'bg-white/20 backdrop-blur-sm'
                }`}>
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xs font-medium drop-shadow-lg">Ask AI</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setBookmarked(!bookmarked)}
                className="flex flex-col items-center gap-1"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  bookmarked ? 'bg-amber-500' : 'bg-white/20 backdrop-blur-sm'
                }`}>
                  <Bookmark className={`w-6 h-6 ${bookmarked ? 'text-white fill-white' : 'text-white'}`} />
                </div>
                <span className="text-white text-xs font-medium drop-shadow-lg">Save</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xs font-medium drop-shadow-lg">Share</span>
              </motion.button>
            </div>

            {/* AI Chat Panel */}
            <AnimatePresence>
              {showAIChat && (
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25 }}
                  className="absolute inset-y-0 right-0 w-full md:w-96 bg-gray-900/95 backdrop-blur-xl border-l border-white/10 z-30 flex flex-col"
                >
                  {/* Chat Header */}
                  <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">AI Tutor</h3>
                        <p className="text-white/60 text-xs">Ask me anything!</p>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowAIChat(false)}
                      className="text-white/60 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Quick Action */}
                  <div className="p-4 border-b border-white/10">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={generateNotes}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl py-3 flex items-center justify-center gap-2 font-medium"
                    >
                      <FileText className="w-5 h-5" />
                      Generate Study Notes
                    </motion.button>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            msg.role === 'user'
                              ? 'bg-emerald-500 text-white'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{msg.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-white/10">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask about this concept..."
                        className="flex-1 bg-white/10 text-white placeholder-white/40 rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSendMessage}
                        className="bg-emerald-500 text-white rounded-full w-12 h-12 flex items-center justify-center"
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key={`question-${currentReel}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 px-8 overflow-y-auto"
          >
            {/* Question */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-12"
            >
              <div className="text-6xl mb-6">🤔</div>
              <h3 className="text-3xl font-bold text-white mb-4">Quick Check!</h3>
              <p className="text-xl text-white/90 max-w-lg">{currentReelData.question}</p>
            </motion.div>

            {/* Options */}
            <div className="space-y-4 w-full max-w-md mb-12">
              {currentReelData.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: answered ? 1 : 1.05 }}
                  whileTap={{ scale: answered ? 1 : 0.95 }}
                  onClick={() => !answered && handleAnswer(index)}
                  disabled={answered}
                  className={`w-full py-5 px-6 rounded-2xl text-lg font-medium transition-all ${
                    answered
                      ? option.correct
                        ? "bg-emerald-500 text-white"
                        : selectedAnswer === index
                        ? "bg-red-500 text-white"
                        : "bg-white/20 text-white/50"
                      : "bg-white text-gray-900 hover:bg-white/90"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.text}</span>
                    {answered && (
                      <span>
                        {option.correct ? (
                          <Check className="w-6 h-6" />
                        ) : selectedAnswer === index ? (
                          <X className="w-6 h-6" />
                        ) : null}
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {answered && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`text-center ${
                    currentReelData.options[selectedAnswer!]?.correct
                      ? "text-emerald-300"
                      : "text-red-300"
                  }`}
                >
                  <div className="text-5xl mb-2">
                    {currentReelData.options[selectedAnswer!]?.correct ? "🎉" : "💡"}
                  </div>
                  <p className="text-xl font-medium">
                    {currentReelData.options[selectedAnswer!]?.correct
                      ? "Correct! Great job!"
                      : "Not quite! Keep learning!"}
                  </p>
                  {!currentReelData.options[selectedAnswer!]?.correct && (
                    <p className="text-white text-lg mt-2">
                      Correct answer: <strong>{currentReelData.options.find(opt => opt.correct)?.text}</strong>
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}