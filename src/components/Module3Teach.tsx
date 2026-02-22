import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { CheckCircle2, Mic, MicOff, BookOpen, AlertCircle, Volume2 } from "lucide-react";
import babyBotImage from "figma:asset/8e12379dde619f341d7f010e2a0d0410ca57f2cf.png";
import avatarImage from "figma:asset/e402b202fae395b1c1a3ad5e7a300f8f32574a45.png";

interface ChatMessage {
  id: string;
  sender: "baby" | "user" | "bloombot";
  text: string;
}

interface Topic {
  id: number;
  question: string;
  babyReaction: string;
  bloombotFeedback: string;
  errorHint?: string;
}

interface EnhancedNote {
  title: string;
  points: string[];
}

const topics: Topic[] = [
  {
    id: 1,
    question: "Can you explain photosynthesis to me? I don't know what it is... 🌱",
    babyReaction: "Ohhh! So plants eat sunlight to make food? That's so cool! 😮✨",
    bloombotFeedback: "Great! You simplified it perfectly for a young learner. 🌟",
    errorHint: "Try explaining it like plants making their own food from sunlight!"
  },
  {
    id: 2,
    question: "What do plants breathe out? I'm confused about that... 💭",
    babyReaction: "Ohh so they breathe out oxygen! And we breathe that in! We help each other! 🫁💚",
    bloombotFeedback: "Excellent! You explained the symbiotic relationship clearly. 👏",
    errorHint: "Remember - plants take in carbon dioxide and release oxygen."
  },
  {
    id: 3,
    question: "Where does photosynthesis happen in the plant? 🌿",
    babyReaction: "Chloroplasts! That's a funny word! They're like tiny food factories! 🏭✨",
    bloombotFeedback: "Perfect analogy! Teaching through comparison helps understanding stick. ✨",
    errorHint: "Think about the special parts inside leaves where the magic happens!"
  }
];

export function Module3Teach() {
  const navigate = useNavigate();
  const [currentTopic, setCurrentTopic] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [savedNotes, setSavedNotes] = useState<EnhancedNote[]>([]);
  const [moduleComplete, setModuleComplete] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [babyMood, setBabyMood] = useState<"neutral" | "happy" | "confused">("neutral");
  const [simulatedText, setSimulatedText] = useState("");
  const recognitionRef = useRef<any>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recordingTimerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, []);

  useEffect(() => {
    startTopic(currentTopic);
  }, [currentTopic]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  const startTopic = (topicIndex: number) => {
    setShowInput(false);
    setUserInput("");
    setTranscript("");
    setBabyMood("neutral");
    
    if (topicIndex >= topics.length) {
      setModuleComplete(true);
      return;
    }

    const topic = topics[topicIndex];

    // Baby Bot asks question
    setTimeout(() => {
      setIsTyping(true);
      setBabyMood("confused");
    }, 500);

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, {
        id: `baby-q-${topicIndex}`,
        sender: "baby",
        text: topic.question
      }]);
      setShowInput(true);
      setBabyMood("neutral");
    }, 2000);
  };

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop simulated recording
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
      setIsRecording(false);
      return;
    }

    // Start simulated recording with realistic text
    setIsRecording(true);
    setTranscript("");
    
    // Realistic speech patterns for each topic
    const speechPatterns = [
      // Topic 1 - Photosynthesis explanation
      [
        "So um, photosynthesis is basically how plants make their own food.",
        " It's like they're little chefs in the kitchen!",
        " They take sunlight from the sun,",
        " and water from the ground,",
        " and carbon dioxide from the air we breathe out.",
        " Then they mix it all together using something called chlorophyll",
        " which is what makes leaves green.",
        " And boom! They create glucose which is like their food,",
        " and they release oxygen that we need to breathe.",
        " Pretty cool right?"
      ],
      // Topic 2 - What plants breathe out
      [
        "Okay so this is really interesting!",
        " Plants breathe out oxygen.",
        " That's the same oxygen that we humans need to breathe in.",
        " It's like we're teammates with plants!",
        " We breathe out carbon dioxide,",
        " which is what plants need to do photosynthesis.",
        " And then they give us oxygen back.",
        " It's a perfect cycle!",
        " We help each other survive.",
        " Nature is amazing!"
      ],
      // Topic 3 - Where photosynthesis happens
      [
        "Photosynthesis happens in these tiny little things called chloroplasts.",
        " They're inside the plant cells,",
        " especially in the leaves.",
        " Think of chloroplasts like tiny factories.",
        " They have this green pigment called chlorophyll",
        " that captures sunlight.",
        " It's like they're catching sunshine",
        " and turning it into energy!",
        " All of this happens inside the leaves,",
        " which is why leaves are so important for plants."
      ]
    ];

    const currentPattern = speechPatterns[currentTopic] || speechPatterns[0];
    let wordIndex = 0;

    recordingTimerRef.current = setInterval(() => {
      if (wordIndex < currentPattern.length) {
        const nextChunk = currentPattern[wordIndex];
        setTranscript(prev => prev + nextChunk);
        setUserInput(prev => prev + nextChunk);
        wordIndex++;
      } else {
        // Auto-stop when done
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }
        setIsRecording(false);
      }
    }, 800 + Math.random() * 400); // Random timing between 800-1200ms for natural feel
  };

  const handleSubmitExplanation = () => {
    if (!userInput.trim()) return;

    const topic = topics[currentTopic];

    // Add user's explanation
    setChatMessages(prev => [...prev, {
      id: `user-exp-${currentTopic}`,
      sender: "user",
      text: userInput
    }]);

    // Generate AI-enhanced structured notes from the unstructured speech
    const enhancedNotes = generateEnhancedNotes(currentTopic, userInput);
    setSavedNotes(prev => [...prev, enhancedNotes]);

    setShowInput(false);
    
    // Stop recording if active
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    setIsRecording(false);

    // Baby Bot reacts
    setTimeout(() => {
      setIsTyping(true);
      setBabyMood("happy");
    }, 1000);

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, {
        id: `baby-react-${currentTopic}`,
        sender: "baby",
        text: topic.babyReaction
      }]);

      // BloomBot gives feedback
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: `bloombot-fb-${currentTopic}`,
          sender: "bloombot",
          text: topic.bloombotFeedback
        }]);

        // Move to next topic
        setTimeout(() => {
          setCurrentTopic(prev => prev + 1);
        }, 2500);
      }, 1500);
    }, 2500);
  };

  const generateEnhancedNotes = (topicIndex: number, rawInput: string) => {
    // AI-enhanced structured notes with additional context
    const enhancedNotesData: EnhancedNote[] = [
      {
        title: "🌱 What is Photosynthesis?",
        points: [
          "Plants create their own food using sunlight (they're like natural chefs!)",
          "Process requires: sunlight ☀️ + water 💧 + carbon dioxide (CO₂)",
          "Chlorophyll in leaves captures sunlight and makes them green",
          "End products: glucose (plant food) + oxygen (O₂) for us to breathe",
          "This process happens mainly in the leaves during daytime",
          "Fun fact: Without photosynthesis, there would be no oxygen on Earth!"
        ]
      },
      {
        title: "💚 The Oxygen Cycle",
        points: [
          "Plants release oxygen as a byproduct of photosynthesis",
          "Humans and animals breathe in this oxygen to survive",
          "We breathe out carbon dioxide (CO₂) when we exhale",
          "Plants use our CO₂ for photosynthesis - perfect teamwork!",
          "This creates a continuous cycle: O₂ ↔ CO₂",
          "It's called a symbiotic relationship - we need each other",
          "Trees produce most of Earth's oxygen - that's why forests matter!"
        ]
      },
      {
        title: "🏭 Chloroplasts: Nature's Tiny Factories",
        points: [
          "Chloroplasts are microscopic organelles inside plant cells",
          "They're found mainly in leaf cells (especially the green parts)",
          "Each chloroplast contains chlorophyll - the green pigment",
          "Chlorophyll molecules trap sunlight energy like solar panels",
          "This energy converts CO₂ + H₂O → glucose + O₂",
          "Think of chloroplasts as tiny power plants running on sunshine",
          "One leaf can contain millions of chloroplasts working together!"
        ]
      }
    ];

    return enhancedNotesData[topicIndex];
  };

  if (moduleComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 overflow-y-auto relative">
        <div className="max-w-4xl mx-auto px-6 py-12 pb-32 relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 1 }}
            className="text-center mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-white shadow-2xl flex items-center justify-center mb-6">
              <CheckCircle2 className="w-20 h-20 text-emerald-500" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Great job! 🎓
            </h1>
            <p className="text-2xl text-white/90 mb-4">
              You didn't just remember — you taught it.
            </p>
            <p className="text-xl text-white/80">
              Module 3 Complete!
            </p>
          </motion.div>

          {/* Notes Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl p-8 shadow-2xl mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-500" />
              Your Learning Notes
            </h2>
            <div className="space-y-6">
              {savedNotes.map((note, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.2 }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-6 shadow-md"
                >
                  <h3 className="text-xl font-bold text-emerald-800 mb-4">{note.title}</h3>
                  <ul className="space-y-3">
                    {note.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="text-emerald-500 text-lg flex-shrink-0">•</span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            onClick={() => navigate("/module-3-transition")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-white text-emerald-600 px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all"
          >
            Continue to Next Module →
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 overflow-y-auto relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              rotate: Math.random() * 360
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              rotate: [null, Math.random() * 360]
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-5xl"
          >
            {["📚", "🎓", "✏️", "💡", "🌟"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 pb-32 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-2xl px-6 py-4 shadow-lg">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-purple-900">
              Module 3: Teach to Learn • Topic {currentTopic + 1}/3
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            {/* Instruction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300 rounded-2xl p-6 mb-6 shadow-lg"
            >
              <p className="text-center text-gray-900 text-lg font-bold flex items-center justify-center gap-2">
                <Mic className="w-5 h-5" />
                Use your voice to teach Baby Bot! 🎯
              </p>
            </motion.div>

            {/* Chat Container */}
            <div 
              ref={chatContainerRef}
              className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 p-6 mb-6 min-h-[450px] max-h-[500px] overflow-y-auto"
            >
              <div className="space-y-4">
                <AnimatePresence>
                  {chatMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} items-start gap-3`}
                    >
                      {message.sender !== "user" && (
                        <div className="flex-shrink-0">
                          {message.sender === "baby" ? (
                            <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-cyan-400 bg-white shadow-lg">
                              <img
                                src={babyBotImage}
                                alt="Baby Bot"
                                className="w-full h-full object-cover scale-110"
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-emerald-400 bg-white shadow-lg">
                              <img
                                src={avatarImage}
                                alt="BloomBot"
                                className="w-full h-full object-cover scale-110"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      <div
                        className={`max-w-md px-5 py-4 rounded-2xl shadow-md ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                            : message.sender === "bloombot"
                            ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white"
                            : "bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-300 text-gray-900"
                        }`}
                      >
                        <p className="text-lg leading-relaxed">{message.text}</p>
                      </div>

                      {message.sender === "user" && (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-white">
                          👤
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-cyan-400 bg-white shadow-lg">
                        <img
                          src={babyBotImage}
                          alt="Baby Bot"
                          className="w-full h-full object-cover scale-110"
                        />
                      </div>
                    </div>
                    <div className="bg-cyan-100 border-2 border-cyan-300 px-5 py-4 rounded-2xl">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-cyan-600 rounded-full"
                        />
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-cyan-600 rounded-full"
                        />
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-cyan-600 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Input Area */}
            {showInput && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-700 font-medium">Your explanation:</p>
                  {isRecording && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1 text-sm text-emerald-600 font-medium"
                    >
                      <Volume2 className="w-4 h-4" />
                      Live transcription
                    </motion.div>
                  )}
                </div>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Explain in simple terms that a 5-year-old would understand... or use the microphone below!"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                  rows={4}
                />
                <div className="flex gap-3 mt-3">
                  <motion.button
                    onClick={toggleRecording}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                      isRecording
                        ? "bg-red-500 text-white animate-pulse"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-xl"
                    }`}
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    {isRecording ? "Stop Voice" : "Start Voice"}
                  </motion.button>
                  
                  <motion.button
                    onClick={handleSubmitExplanation}
                    disabled={!userInput.trim()}
                    whileHover={userInput.trim() ? { scale: 1.02 } : {}}
                    whileTap={userInput.trim() ? { scale: 0.98 } : {}}
                    className={`flex-1 px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                      userInput.trim()
                        ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:shadow-xl"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Submit Explanation
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Saved Notes Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200 sticky top-6">
              <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-500" />
                My Notes
              </h3>
              
              {savedNotes.length === 0 ? (
                <p className="text-gray-500 text-sm italic">
                  Your explanations will be auto-saved here as notes...
                </p>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {savedNotes.map((note, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-xl p-4 shadow-sm"
                    >
                      <h4 className="text-base font-bold text-emerald-800 mb-3">{note.title}</h4>
                      <ul className="space-y-2">
                        {note.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                            <span className="text-emerald-500 mt-0.5 flex-shrink-0">•</span>
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <div className="text-center">
                  <div className="text-3xl mb-2">📝</div>
                  <p className="text-xs text-gray-600">
                    {savedNotes.length}/3 explanations completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}