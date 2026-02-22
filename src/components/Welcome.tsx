import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { BloomBot } from "./BloomBot";
import { Upload, Youtube, FileText, Image, ArrowRight } from "lucide-react";

export function Welcome() {
  const navigate = useNavigate();

  const uploadOptions = [
    { icon: FileText, label: "Upload PDF", color: "from-red-400 to-red-500" },
    { icon: Youtube, label: "Paste YouTube Link", color: "from-red-500 to-red-600" },
    { icon: FileText, label: "Upload PPT", color: "from-orange-400 to-orange-500" },
    { icon: Image, label: "Upload Image", color: "from-blue-400 to-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-6 py-12 pb-32">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block text-6xl mb-4"
          >
            🌱
          </motion.div>
          <h1 className="text-5xl mb-4 text-gray-900">Welcome to BloomBot</h1>
          <p className="text-xl text-gray-600">Turn any content into understanding</p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl mb-4 text-gray-800 text-center">Upload Your Learning Material</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {uploadOptions.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gradient-to-br ${option.color} text-white rounded-xl p-6 flex flex-col items-center gap-3 shadow-lg hover:shadow-xl transition-shadow`}
              >
                <option.icon className="w-8 h-8" />
                <span className="text-sm font-medium text-center">{option.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-amber-800 text-center">
              📝 <strong>This is a prototype.</strong> You may upload anything or skip.
            </p>
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6 text-center">
            <p className="text-lg text-emerald-800 mb-2">
              <strong>For this demo, we'll learn:</strong>
            </p>
            <p className="text-3xl">🌿 Photosynthesis</p>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/language")}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl py-5 text-lg font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
          >
            Skip & Continue
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      <BloomBot message="Upload anything — I'll take care of the rest 🌱" />
    </div>
  );
}
