
"use client";
import { cn } from "../../lib/utils.ts";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface HeroTextProps {
  text?: string;
  className?: string;
  transparent?: boolean;
  autoLoop?: boolean;
  loopInterval?: number;
}

export default function HeroText({
  text = "IMMERSE",
  className = "",
  transparent = false,
  autoLoop = true,
  loopInterval = 4000,
}: HeroTextProps) {
  const [count, setCount] = useState(0);
  const characters = text.split("");

  useEffect(() => {
    if (!autoLoop) return;

    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, loopInterval);

    return () => clearInterval(interval);
  }, [autoLoop, loopInterval]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center h-full w-full transition-colors duration-700",
        transparent ? "bg-transparent" : "bg-white dark:bg-zinc-950",
        className
      )}
    >
      {/* Immersive Background Grid - only show if not transparent */}
      {!transparent && (
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`,
            backgroundSize: "clamp(20px, 5vw, 60px) clamp(20px, 5vw, 60px)",
          }}
        />
      )}

      {/* Main Text Container */}
      <div className="relative z-10 w-full px-4 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            className="flex flex-wrap justify-center items-center w-full"
          >
            {characters.map((char, i) => (
              <div
                key={`${count}-${i}`}
                className="relative px-[0.1vw] overflow-hidden group"
              >
                {/* Main Character */}
                <motion.span
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.04 + 0.3, duration: 0.8 }}
                  className="text-[12vw] sm:text-[10vw] leading-none font-black text-white tracking-tighter uppercase italic"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>

                {/* Top Slice Layer */}
                <motion.span
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "100%", opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.04,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 text-[12vw] sm:text-[10vw] leading-none font-black text-white/40 z-10 pointer-events-none uppercase italic"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
                >
                  {char}
                </motion.span>

                {/* Middle Slice Layer */}
                <motion.span
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: "-100%", opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.04 + 0.1,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 text-[12vw] sm:text-[10vw] leading-none font-black text-white/20 z-10 pointer-events-none uppercase italic"
                  style={{
                    clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
                  }}
                >
                  {char}
                </motion.span>

                {/* Bottom Slice Layer */}
                <motion.span
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "100%", opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.04 + 0.2,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 text-[12vw] sm:text-[10vw] leading-none font-black text-white/40 z-10 pointer-events-none uppercase italic"
                  style={{
                    clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
                  }}
                >
                  {char}
                </motion.span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating UI Controls */}
      <div className="absolute bottom-4 flex flex-col items-center gap-2 z-20">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCount((c) => c + 1)}
          className="p-2 bg-white/10 text-white rounded-full backdrop-blur-md border border-white/20 transition-colors duration-300"
        >
          <RefreshCw size={16} />
        </motion.button>
      </div>
    </div>
  );
}
