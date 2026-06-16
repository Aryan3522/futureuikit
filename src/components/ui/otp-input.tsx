/**
 * @registry-slug otp-input
 * @registry-name Premium OTP Input
 * @registry-description A highly polished OTP verification component with persistent glowing borders, spring-powered overlapping transitions, and in-box icon morphing.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export type OtpColor = "indigo" | "rose" | "emerald" | "amber" | "sky" | "violet" | "zinc";

export interface OtpInputProps {
  /** Number of OTP digits (4-10) */
  length?: number;
  /** Callback when verification is triggered */
  onVerify?: (otp: string) => Promise<boolean>;
  /** Message shown on successful verification */
  successMessage?: string;
  /** Message shown on failed verification */
  errorMessage?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether to focus the first input on mount */
  autoFocus?: boolean;
  /** Visual theme */
  theme?: "light" | "dark";
  /** Primary color vibe */
  color?: OtpColor;
  /** Component size */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
}

type VerificationStatus = 
  | "idle" 
  | "loading" 
  | "merging" 
  | "merged" 
  | "success" 
  | "error";

export const OtpInput = ({
  length = 6,
  onVerify,
  successMessage = "OTP Verified",
  errorMessage = "Invalid OTP",
  disabled = false,
  autoFocus = true,
  theme = "dark",
  color = "indigo",
  size = "md",
  className,
}: OtpInputProps) => {
  const otpLength = Math.max(4, Math.min(10, length));
  
  const [otp, setOtp] = useState<string[]>(new Array(otpLength).fill(""));
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [activeIndex, setActiveIndex] = useState(0);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus && status === "idle") {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus, status]);

  const handleFocus = (index: number) => {
    if (status === "idle") {
      setActiveIndex(index);
    }
  };

  const handleChange = (value: string, index: number) => {
    if (status !== "idle" || disabled) return;

    const digit = value.slice(-1);
    if (!/^\d?$/.test(digit)) return;

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (status !== "idle" || disabled) return;

    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "Enter" && otp.every(d => d !== "")) {
      handleVerify();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (status !== "idle" || disabled) return;
    e.preventDefault();
    const data = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(data)) return;

    const newOtp = [...otp];
    const digits = data.split("").slice(0, otpLength);
    
    digits.forEach((digit, idx) => {
      newOtp[idx] = digit;
    });
    
    setOtp(newOtp);
    const nextIndex = Math.min(digits.length, otpLength - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== otpLength || status !== "idle") return;

    setStatus("loading");

    let isValid = false;
    if (onVerify) {
      try {
        isValid = await onVerify(code);
      } catch (err) {
        isValid = false;
      }
    } else {
      await new Promise(resolve => setTimeout(resolve, 1500));
      isValid = code === "123456" || code === "1234" || code === "12345678";
    }

    // Phase 2: Smooth spring merge
    setStatus("merging");
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Phase 3: Hold state
    setStatus("merged");
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (isValid) {
      setStatus("success");
    } else {
      setStatus("error");
      setTimeout(() => {
        setOtp(new Array(otpLength).fill(""));
        setStatus("idle");
        setActiveIndex(0);
      }, 3000);
    }
  };

  const sizes = {
    sm: { width: 40, gap: 12, class: "w-10 h-12 text-lg" },
    md: { width: 48, gap: 12, class: "w-12 h-14 text-xl" },
    lg: { width: 56, gap: 12, class: "w-14 h-16 text-2xl" },
  };

  const currentSize = sizes[size];
  const unitWidth = currentSize.width + currentSize.gap;

  const colorHexMap = {
    indigo: "#6366f1",
    rose: "#f43f5e",
    emerald: "#10b981",
    amber: "#f59e0b",
    sky: "#0ea5e9",
    violet: "#8b5cf6",
    zinc: "#71717a",
  };

  const colorTailwindMap = {
    indigo: "from-indigo-500 to-blue-500",
    rose: "from-rose-500 to-pink-500",
    emerald: "from-emerald-500 to-teal-500",
    amber: "from-amber-500 to-orange-500",
    sky: "from-sky-500 to-blue-400",
    violet: "from-violet-500 to-purple-500",
    zinc: "from-zinc-400 to-zinc-600",
  };

  const vibeHex = colorHexMap[color];
  const isProcessing = status === "loading" || status === "merging" || status === "merged";

  const inputVariants = {
    idle: (i: number) => ({
      rotate: 0,
      x: 0,
      opacity: 1,
      scale: activeIndex === i ? 1.1 : 1,
      boxShadow: (otp[i] !== "" || activeIndex === i) ? `0 0 30px ${vibeHex}60` : "none",
      transition: { 
        type: "spring" as const, stiffness: 300, damping: 25
      }
    }),
    loading: (i: number) => ({
      rotate: [0, -3, 3, -3, 3, 0],
      x: 0,
      opacity: 1,
      scale: 1,
      boxShadow: (i === 0) ? `0 0 30px ${vibeHex}60` : "none",
      transition: { 
        rotate: { duration: 0.4, repeat: Infinity, delay: i * 0.05 },
        boxShadow: { duration: 0.2 }
      },
    }),
    merging: (i: number) => ({
      x: ( (otpLength - 1) / 2 - i ) * unitWidth, 
      rotate: 0,
      scale: i === 0 ? 1 : 0.9,
      opacity: i === 0 ? 1 : 0,
      boxShadow: (i === 0) ? `0 0 40px ${vibeHex}80` : "none",
      transition: { 
        x: { type: "spring" as const, stiffness: 200, damping: 30 },
        opacity: { duration: 0.3, delay: 0.1 },
        scale: { duration: 0.3 }
      }
    }),
    merged: (i: number) => ({
      x: ( (otpLength - 1) / 2 - i ) * unitWidth,
      rotate: 0,
      opacity: i === 0 ? 1 : 0,
      scale: i === 0 ? 1 : 0.8,
      boxShadow: (i === 0) ? `0 0 40px ${vibeHex}80` : "none",
      transition: { duration: 0.2 }
    }),
    success: (i: number) => ({
      x: ( (otpLength - 1) / 2 - i ) * unitWidth,
      scale: i === 0 ? 1 : 0.8,
      opacity: i === 0 ? 1 : 0,
      boxShadow: "none",
      transition: { duration: 0.3 }
    }),
    error: (i: number) => ({
      x: ( (otpLength - 1) / 2 - i ) * unitWidth,
      scale: i === 0 ? 1 : 0.8,
      opacity: i === 0 ? 1 : 0,
      boxShadow: "none",
      transition: { duration: 0.3 }
    })
  };

  const isComplete = status === "success" || status === "error";

  return (
    <div className={cn("flex flex-col items-center gap-8", className)}>
      <div className="relative flex items-center justify-center min-h-[100px] w-full">
        <div className="flex gap-3 relative">
          {otp.map((digit, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={inputVariants}
              animate={status}
              style={{
                zIndex: activeIndex === idx && status === "idle" ? 10 : (idx === 0 && isProcessing ? 50 : 1),
              }}
              className="relative p-[2px] rounded-xl overflow-hidden group"
            >
              {/* High-Intensity Moving Border (Glowy Streak) - PERSISTENT DURING PROCESSING */}
              {(digit !== "" || (idx === 0 && isProcessing)) && !isComplete && (
                <div className="absolute inset-0 z-0">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-150%]"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0%, ${vibeHex} 10%, transparent 20%, transparent 50%, ${vibeHex} 60%, transparent 70%)`,
                    }}
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-150%] blur-md opacity-40"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0%, ${vibeHex} 10%, transparent 20%, transparent 50%, ${vibeHex} 60%, transparent 70%)`,
                    }}
                  />
                </div>
              )}

              {/* Digit Input */}
              <motion.input
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                animate={{
                  opacity: isComplete ? 0 : 1,
                  backgroundColor: status === "success" ? "transparent" : (theme === "dark" ? "#09090b" : "#ffffff"),
                  borderColor: status === "success" 
                    ? "transparent" 
                    : (status === "error" 
                        ? "transparent" 
                        : ( (digit !== "" || (idx === 0 && isProcessing)) 
                            ? "transparent" 
                            : (activeIndex === idx && status === "idle" 
                                ? vibeHex 
                                : (theme === "dark" ? "#27272a" : "#e4e4e7"))))
                }}
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onPaste={handlePaste}
                onFocus={() => handleFocus(idx)}
                disabled={status !== "idle" || disabled}
                className={cn(
                  currentSize.class,
                  "text-center font-black rounded-[10px] border-2 transition-all duration-300 outline-hidden relative z-10",
                  status === "loading" && "cursor-wait",
                  theme === "dark" ? "text-white" : "text-zinc-950"
                )}
              />

              {/* Success/Error Icon inside the box */}
              {idx === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <AnimatePresence>
                    {status === "success" && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative flex flex-col items-center"
                      >
                        <Particles count={25} color="#10b981" />
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <svg viewBox="0 0 24 24" className="w-10 h-10 text-emerald-500 fill-none stroke-current" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <motion.path
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                              d="M20 6L9 17L4 12"
                            />
                          </svg>
                        </motion.div>
                      </motion.div>
                    )}
                    {status === "error" && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center justify-center"
                      >
                        <svg viewBox="0 0 24 24" className="w-10 h-10 text-red-500 fill-none stroke-current" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4 }}
                            d="M18 6L6 18M6 6l12 12"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isComplete ? (
          <motion.div
            key="status-msg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest",
              status === "success" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
            )}
          >
            {status === "success" ? successMessage : errorMessage}
          </motion.div>
        ) : (
          status === "idle" && (
            <motion.button
              key="verify-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleVerify}
              disabled={otp.some(d => d === "") || disabled}
              className={cn(
                "px-8 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-lg",
                otp.every(d => d !== "") 
                  ? cn("text-white hover:opacity-90 shadow-lg bg-linear-to-r", colorTailwindMap[color])
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              )}
            >
              Verify OTP
            </motion.button>
          )
        )}
      </AnimatePresence>

      {status === "loading" && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-2"
        >
          <Loader2 className="w-6 h-6 animate-spin" style={{ color: vibeHex }} />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] animate-pulse">
            Secure Verification
          </span>
        </motion.div>
      )}
    </div>
  );
};

// --- Particle Burst Helper ---
const Particles = ({ count, color }: { count: number; color: string }) => {
  const [particles, setParticles] = useState<{ x: number; y: number; s: number }[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(
      Array.from({ length: count }).map(() => ({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        s: Math.random() * 4 + 2
      }))
    );
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{ 
            x: p.x, 
            y: p.y, 
            scale: 0,
            opacity: 0 
          }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{ 
            backgroundColor: color,
            width: p.s,
            height: p.s
          }}
        />
      ))}
    </div>
  );
};
