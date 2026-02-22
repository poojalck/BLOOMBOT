import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { BloomBot } from "./BloomBot";
import { Check } from "lucide-react";
import { useState } from "react";

export function LanguageSelection() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const languages = [
    { code: "en", name: "English", emoji: "🇬🇧" },
    { code: "ta", name: "Tamil", emoji: "🇮🇳" },
    { code: "hi", name: "Hindi", emoji: "🇮🇳" },
    { code: "te", name: "Telugu", emoji: "🇮🇳" },
    { code: "ml", name: "Malayalam", emoji: "🇮🇳" },
    { code: "kn", name: "Kannada", emoji: "🇮🇳" },
  ];

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    setTimeout(() => {
      navigate("/map");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-6 py-12 pb-32">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block text-6xl mb-4"
          >
            🗣️
          </motion.div>
          <h1 className="text-4xl mb-4 text-gray-900">Choose your learning language</h1>
          <p className="text-lg text-gray-600">Learn in the language you're most comfortable with</p>
        </motion.div>

        {/* Language Cards */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          {languages.map((lang, index) => (
            <motion.button
              key={lang.code}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-4 ${
                selectedLanguage === lang.code
                  ? "border-purple-500 bg-purple-50"
                  : "border-transparent"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{lang.emoji}</span>
                <span className="text-2xl font-medium text-gray-800">{lang.name}</span>
              </div>
              
              {selectedLanguage === lang.code && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 bg-purple-500 text-white rounded-full p-2"
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-purple-100 border-2 border-purple-300 rounded-2xl p-6 text-center"
        >
          <p className="text-purple-800">
            💡 You can change your language anytime in settings
          </p>
        </motion.div>
      </div>

      <BloomBot message="You can change language anytime later" />
    </div>
  );
}
