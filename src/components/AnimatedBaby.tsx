import { motion } from "motion/react";

interface AnimatedBabyProps {
  emotion?: "curious" | "confused" | "happy" | "learning" | "excited";
  size?: number;
}

export function AnimatedBaby({ emotion = "curious", size = 120 }: AnimatedBabyProps) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ width: size, height: size }}
      className="relative"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Body */}
        <motion.ellipse
          cx="100"
          cy="140"
          rx="50"
          ry="45"
          fill="#FFE5B4"
          animate={{
            ry: [45, 48, 45],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Arms */}
        <motion.g
          animate={
            emotion === "excited" || emotion === "happy"
              ? {
                  rotate: [0, -15, 0],
                }
              : {}
          }
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "70px 130px" }}
        >
          <ellipse cx="70" cy="130" rx="15" ry="35" fill="#FFE5B4" />
          <circle cx="70" cy="155" r="12" fill="#FFDAB9" />
        </motion.g>
        
        <motion.g
          animate={
            emotion === "excited" || emotion === "happy"
              ? {
                  rotate: [0, 15, 0],
                }
              : {}
          }
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
          style={{ transformOrigin: "130px 130px" }}
        >
          <ellipse cx="130" cy="130" rx="15" ry="35" fill="#FFE5B4" />
          <circle cx="130" cy="155" r="12" fill="#FFDAB9" />
        </motion.g>

        {/* Head */}
        <motion.g
          animate={
            emotion === "confused"
              ? {
                  rotate: [-5, 5, -5],
                }
              : emotion === "curious"
              ? {
                  rotate: [0, -3, 3, 0],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "100px 80px" }}
        >
          {/* Face */}
          <circle cx="100" cy="80" r="55" fill="#FFDAB9" />
          
          {/* Hair tufts */}
          <circle cx="85" cy="40" r="12" fill="#8B4513" opacity="0.3" />
          <circle cx="100" cy="35" r="14" fill="#8B4513" opacity="0.3" />
          <circle cx="115" cy="40" r="12" fill="#8B4513" opacity="0.3" />

          {/* Eyes - Blinking animation */}
          <motion.g
            animate={{
              scaleY: [1, 0.1, 1, 1, 1, 1, 1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.05, 0.1, 0.15, 0.2, 0.5, 0.8, 1]
            }}
            style={{ transformOrigin: "85px 75px" }}
          >
            <circle cx="85" cy="75" r="8" fill="#2C3E50" />
            <circle cx="88" cy="72" r="3" fill="white" />
          </motion.g>

          <motion.g
            animate={{
              scaleY: [1, 0.1, 1, 1, 1, 1, 1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.05, 0.1, 0.15, 0.2, 0.5, 0.8, 1]
            }}
            style={{ transformOrigin: "115px 75px" }}
          >
            <circle cx="115" cy="75" r="8" fill="#2C3E50" />
            <circle cx="118" cy="72" r="3" fill="white" />
          </motion.g>

          {/* Eyebrows */}
          {emotion === "confused" && (
            <>
              <motion.path
                d="M 75 65 Q 80 60 90 62"
                stroke="#8B4513"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                animate={{ y: [-2, 0, -2] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.path
                d="M 110 62 Q 120 60 125 65"
                stroke="#8B4513"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </>
          )}

          {/* Nose */}
          <ellipse cx="100" cy="85" rx="6" ry="8" fill="#FFB6A3" />

          {/* Mouth - Changes based on emotion */}
          {emotion === "happy" || emotion === "excited" ? (
            <motion.path
              d="M 85 95 Q 100 105 115 95"
              stroke="#FF6B9D"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M 85 95 Q 100 105 115 95",
                  "M 85 95 Q 100 108 115 95",
                  "M 85 95 Q 100 105 115 95",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ) : emotion === "confused" ? (
            <motion.path
              d="M 85 95 Q 100 95 115 100"
              stroke="#FF6B9D"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M 85 95 Q 100 95 115 100",
                  "M 85 100 Q 100 95 115 95",
                  "M 85 95 Q 100 95 115 100",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ) : emotion === "curious" ? (
            <circle cx="100" cy="98" r="8" fill="#FF6B9D" opacity="0.6" />
          ) : (
            <motion.path
              d="M 85 95 Q 100 100 115 95"
              stroke="#FF6B9D"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M 85 95 Q 100 100 115 95",
                  "M 85 95 Q 100 103 115 95",
                  "M 85 95 Q 100 100 115 95",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}

          {/* Cheeks */}
          <motion.circle
            cx="70"
            cy="88"
            r="12"
            fill="#FFB6A3"
            opacity="0.5"
            animate={
              emotion === "happy" || emotion === "excited"
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.7, 0.5]
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.circle
            cx="130"
            cy="88"
            r="12"
            fill="#FFB6A3"
            opacity="0.5"
            animate={
              emotion === "happy" || emotion === "excited"
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.7, 0.5]
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.g>

        {/* Legs */}
        <ellipse cx="85" cy="175" rx="18" ry="25" fill="#FFE5B4" />
        <ellipse cx="115" cy="175" rx="18" ry="25" fill="#FFE5B4" />
        <ellipse cx="85" cy="195" rx="20" ry="12" fill="#FFDAB9" />
        <ellipse cx="115" cy="195" rx="20" ry="12" fill="#FFDAB9" />
      </svg>

      {/* Floating sparkles for excited state */}
      {(emotion === "excited" || emotion === "happy") && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (i - 1) * 20],
                y: [0, -30 - i * 10],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut"
              }}
              className="absolute top-0 left-1/2 text-2xl"
            >
              ✨
            </motion.div>
          ))}
        </>
      )}

      {/* Question marks for confused state */}
      {emotion === "confused" && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [0, -20, -25, -30],
              x: [0, 10, 15, 20],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute top-0 right-4 text-3xl"
          >
            ?
          </motion.div>
        </>
      )}

      {/* Light bulb for learning state */}
      {emotion === "learning" && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
            scale: [0, 1.2, 1, 1, 0.8],
            y: [0, -10, -15, -15, -20],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl"
        >
          💡
        </motion.div>
      )}
    </motion.div>
  );
}
