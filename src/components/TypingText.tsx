import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface TypingTextProps {
  text: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
  completed?: boolean;
}

export function TypingText({ 
  text, 
  delay = 0, 
  speed = 30, 
  onComplete, 
  className = "",
  showCursor = true,
  completed = false
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState(completed ? text : "");
  const [isTyping, setIsTyping] = useState(!completed);
  const [hasStarted, setHasStarted] = useState(completed);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  // Create typing sound using Web Audio API
  const playTypingSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const audioContext = audioContextRef.current;
    const now = audioContext.currentTime;
    
    // Create multiple oscillators for richer, ASMR-like sound
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Soft, pleasant frequencies for ASMR texting sound
    oscillator1.frequency.value = 600 + Math.random() * 100; // Lower, softer tone
    oscillator2.frequency.value = 1200 + Math.random() * 200; // Higher harmonic
    oscillator1.type = "sine";
    oscillator2.type = "sine";
    
    // Very soft gain for ASMR effect
    gainNode.gain.setValueAtTime(0.02, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    
    oscillator1.start(now);
    oscillator2.start(now);
    oscillator1.stop(now + 0.08);
    oscillator2.stop(now + 0.08);
  };

  useEffect(() => {
    if (completed) return;
    
    const startTimer = setTimeout(() => {
      setHasStarted(true);
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay, completed]);

  useEffect(() => {
    if (!hasStarted || completed) return;
    
    if (displayedText.length < text.length) {
      // Add slight randomization for more natural typing rhythm
      const randomDelay = speed + (Math.random() * 20 - 10);
      
      const timer = setTimeout(() => {
        const nextChar = text[displayedText.length];
        setDisplayedText(prev => prev + nextChar);
        
        // Play sound for most characters (90% of the time for consistent ASMR effect)
        if (nextChar !== ' ' && Math.random() > 0.1) {
          playTypingSound();
        }
      }, randomDelay);

      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
      if (onComplete) {
        setTimeout(onComplete, 200);
      }
    }
  }, [displayedText, text, hasStarted, speed, onComplete, completed]);

  if (!hasStarted && !completed) return null;

  return (
    <div className={`inline-block ${className}`}>
      <span className="whitespace-pre-line">
        {displayedText}
        {isTyping && showCursor && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-0.5 h-6 bg-current ml-1 align-middle"
          />
        )}
      </span>
    </div>
  );
}