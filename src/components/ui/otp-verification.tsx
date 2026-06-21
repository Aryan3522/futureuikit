/**
 * @registry-slug otp-verification
 * @registry-name OTP Verification
 * @registry-description An animated OTP input component with verification states, success and error feedback, keyboard navigation, and paste support.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

export type OtpShape = "default" | "square" | "rounded" | "sharp";
export type OtpColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type OtpSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface OTPVerificationProps {
  length?: number;
  onVerify?: (otp: string) => Promise<boolean> | boolean;
  color?: OtpColor;
  shape?: OtpShape;
  spacing?: OtpSpacing;
  className?: string;
}

export const OTPVerification = React.memo(function OTPVerification({
  length = 6,
  onVerify,
  color = "default",
  shape = "default",
  spacing = "default",
  className,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Calculate offsets to center the boxes during the overlapping animation
  // Assuming w-12 (48px) + gap-3 (12px) = 60px between centers
  const boxSpacing = 60;
  const centerIndex = (length - 1) / 2;

  useEffect(() => {
    if (status === "idle") {
      inputRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (!/^[0-9A-Za-z]?$/.test(value)) return; // Allow single alphanumeric character

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        setActiveIndex(index - 1);
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      setActiveIndex(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      setActiveIndex(index + 1);
    } else if (e.key === "Enter") {
      if (otp.every((val) => val !== "")) {
        handleSubmit();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
    if (!pastedData) return;

    const newOtp = [...otp];
    let lastPastedIndex = 0;
    for (let i = 0; i < pastedData.length; i++) {
      if (/^[0-9A-Za-z]$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
        lastPastedIndex = i;
      }
    }
    setOtp(newOtp);
    setActiveIndex(Math.min(lastPastedIndex + 1, length - 1));
    
    if (newOtp.every((val) => val !== "")) {
      // Optional: auto-submit on paste if full
      // handleSubmit(newOtp.join(""));
    }
  };

  const handleSubmit = async (codeToSubmit = otp.join("")) => {
    if (status !== "idle") return;
    
    setStatus("submitting");
    
    if (onVerify) {
      try {
        const isValid = await onVerify(codeToSubmit);
        if (isValid) {
          setStatus("success");
        } else {
          handleError();
        }
      } catch (e) {
        handleError();
      }
    } else {
      // Mock validation if no handler provided (default behavior)
      setTimeout(() => {
        if (codeToSubmit === "123456" || codeToSubmit.toLowerCase() === "future") {
          setStatus("success");
        } else {
          handleError();
        }
      }, 1200);
    }
  };

  const handleError = () => {
    setStatus("error");
    setTimeout(() => {
      setOtp(Array(length).fill(""));
      setStatus("idle");
      setActiveIndex(0);
    }, 2000);
  };

  const getContainerAnimation = () => {
    if (status === "error") {
      return {
        x: [0, -10, 10, -10, 10, -5, 5, 0],
        transition: { duration: 0.5, ease: "easeInOut" as any }
      };
    }
    return { x: 0 };
  };

  const getBoxAnimation = (index: number) => {
    const isOverlapped = status !== "idle";
    const xOffset = -(index - centerIndex) * boxSpacing;
    const rotate = (index - centerIndex) * 4; // slight fan effect
    const yOffset = Math.abs(index - centerIndex) * 2; // slight arc

    if (isOverlapped) {
      return {
        x: xOffset,
        y: yOffset,
        rotate: rotate,
        scale: 1.05,
        transition: { 
          type: "spring" as any, 
          stiffness: 300, 
          damping: 25,
          delay: index * 0.05 // cascading overlap
        }
      };
    }

    return {
      x: 0,
      y: 0,
      rotate: 0,
      scale: activeIndex === index ? 1.05 : 1,
      transition: { type: "spring" as any, stiffness: 400, damping: 30 }
    };
  };

  const ringColorMap: Record<OtpColor, string> = {
    default: "border-foreground ring-ring/20 text-foreground",
    blue: "border-blue-600 ring-blue-600/20 text-blue-600 dark:border-blue-500 dark:ring-blue-500/20 dark:text-blue-500",
    emerald: "border-emerald-500 ring-emerald-500/20 text-emerald-500 dark:border-emerald-500 dark:ring-emerald-500/20 dark:text-emerald-500",
    rose: "border-rose-500 ring-rose-500/20 text-rose-500 dark:border-rose-500 dark:ring-rose-500/20 dark:text-rose-500",
    amber: "border-amber-500 ring-amber-500/20 text-amber-500 dark:border-amber-500 dark:ring-amber-500/20 dark:text-amber-500",
    violet: "border-violet-600 ring-violet-600/20 text-violet-600 dark:border-violet-500 dark:ring-violet-500/20 dark:text-violet-500",
    indigo: "border-indigo-600 ring-indigo-600/20 text-indigo-600 dark:border-indigo-500 dark:ring-indigo-500/20 dark:text-indigo-500",
    sky: "border-sky-500 ring-sky-500/20 text-sky-600 dark:border-sky-500 dark:ring-sky-500/20 dark:text-sky-500",
    slate: "border-slate-600 ring-slate-600/20 text-slate-600 dark:border-slate-500 dark:ring-slate-500/20 dark:text-slate-500",
    orange: "border-orange-500 ring-orange-500/20 text-orange-600 dark:border-orange-500 dark:ring-orange-500/20 dark:text-orange-500",
  };

  const focusBorderMap: Record<OtpColor, string> = {
    default: "focus:border-foreground/50",
    blue: "focus:border-blue-600/50 dark:focus:border-blue-500/50",
    emerald: "focus:border-emerald-500/50",
    rose: "focus:border-rose-500/50",
    amber: "focus:border-amber-500/50",
    violet: "focus:border-violet-600/50 dark:focus:border-violet-500/50",
    indigo: "focus:border-indigo-600/50 dark:focus:border-indigo-500/50",
    sky: "focus:border-sky-500/50",
    slate: "focus:border-slate-600/50 dark:focus:border-slate-500/50",
    orange: "focus:border-orange-500/50",
  };

  const sizes = {
    default: "w-12 h-14 md:w-14 md:h-16 text-xl md:text-2xl",
    "2x": "w-8 h-10 md:w-10 md:h-12 text-sm md:text-base",
    "4x": "w-12 h-14 md:w-14 md:h-16 text-xl md:text-2xl",
    "6x": "w-14 h-16 md:w-16 md:h-20 text-2xl md:text-3xl",
    "8x": "w-16 h-20 md:w-20 md:h-24 text-3xl md:text-4xl",
  };

  const shapeClass = 
    shape === "square" ? "rounded-none" : 
    shape === "rounded" ? "rounded-full" : 
    shape === "sharp" ? "rounded-[2px]" : 
    "rounded-xl";

  return (
    <div className={cn("flex flex-col items-center justify-center w-full min-h-[200px] p-8 bg-background relative", className)}>
      <motion.div 
        className="flex items-center gap-3 relative"
        animate={getContainerAnimation()}
      >
        {otp.map((digit, index) => (
          <motion.div
            key={index}
            className="relative z-10"
            initial={false}
            animate={getBoxAnimation(index)}
            style={{ zIndex: status !== "idle" ? index : 10 }}
          >
            {/* Glow effect for active or success state */}
            <AnimatePresence>
              {(activeIndex === index && status === "idle") && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-primary/20 rounded-xl blur-md -z-10"
                />
              )}
              {status === "success" && index === Math.floor(centerIndex) && (
                 <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1.5 }}
                 className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl -z-10"
               />
              )}
               {status === "error" && index === Math.floor(centerIndex) && (
                 <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1.5 }}
                 className="absolute inset-0 bg-red-500/30 rounded-full blur-xl -z-10"
               />
              )}
            </AnimatePresence>

            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              onFocus={() => status === "idle" && setActiveIndex(index)}
              disabled={status !== "idle"}
              className={cn(
                sizes[spacing] || sizes.default,
                shapeClass,
                "flex items-center justify-center text-center font-bold bg-background border-2 outline-none transition-colors",
                activeIndex === index && status === "idle" 
                  ? `ring-2 ${ringColorMap[color]}` 
                  : `border-border text-foreground ${focusBorderMap[color]}`,
                status !== "idle" && "opacity-90 shadow-xl pointer-events-none bg-muted",
                status === "success" && "border-emerald-500/50 bg-emerald-50 dark:bg-emerald-500/10",
                status === "error" && "border-red-500/50 bg-red-50 dark:bg-red-500/10"
              )}
            />
          </motion.div>
        ))}

        {/* Overlay Status Icons */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
            >
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] border-4 border-background">
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                >
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <motion.polyline
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      points="20 6 9 17 4 12"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: 45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
            >
               <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)] border-4 border-background">
                 <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                 >
                    <X className="w-8 h-8 text-white" strokeWidth={3} />
                 </motion.div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Optional Helper Text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={status}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "mt-8 text-sm font-medium tracking-tight",
            status === "idle" && "text-muted-foreground",
            status === "submitting" && "text-primary animate-pulse",
            status === "success" && "text-emerald-500",
            status === "error" && "text-red-500"
          )}
        >
          {status === "idle" && "Enter the verification code"}
          {status === "submitting" && "Verifying your code..."}
          {status === "success" && "Verification successful"}
          {status === "error" && "Invalid code, try again"}
        </motion.p>
      </AnimatePresence>
    </div>
  );
});

OTPVerification.displayName = "OTPVerification";
