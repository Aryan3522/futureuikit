/**
 * @registry-slug error-page
 * @registry-name Error Page
 */
"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface ErrorPageProps {
  className?: string;
  errorCode?: string;
  errorText?: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ className, errorCode = "404", errorText = "ERROR" }) => {
  return (
    <div className={cn("w-full h-full flex items-center justify-center text-center", className)}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
        .error-neon-container {
          font-family: 'Monoton', cursive;
          text-align: center;
          text-transform: uppercase;
          font-size: 60px;
          color: red;
          text-shadow: 0 0 80px red, 0 0 30px FireBrick, 0 0 6px DarkRed;
          line-height: 1;
          cursor: pointer;
        }
        .error-neon-container p { margin: 10px; }
        .neon-error {
          color: #fff;
          text-shadow: 0 0 80px #ffffff, 0 0 30px #008000, 0 0 6px #0000ff;
        }
        .neon-error span { animation: upper 6s linear infinite; }
        .neon-error span:nth-of-type(2) { animation: lower 9s linear infinite; }
        .neon-error span:nth-of-type(1) { text-shadow: none; opacity: 0.4; }
        .error-neon-container:hover .neon-error {
          text-shadow: 0 0 200px #ffffff, 0 0 80px #008000, 0 0 6px #0000ff;
        }
        .error-neon-container:hover .neon-code {
          text-shadow: 0 0 100px red, 0 0 40px FireBrick, 0 0 8px DarkRed;
        }
        @keyframes upper {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
            opacity: 0.99;
            text-shadow: 0 0 80px #ffffff, 0 0 30px #008000, 0 0 6px #0000ff;
          }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.4; text-shadow: none; }
        }
        @keyframes lower {
          0%, 12%, 18.999%, 23%, 31.999%, 37%, 44.999%, 46%, 49.999%, 51%, 58.999%, 61%, 68.999%, 71%, 85.999%, 96%, 100% {
            opacity: 0.99;
            text-shadow: 0 0 80px red, 0 0 30px FireBrick, 0 0 6px DarkRed;
          }
          19%, 22.99%, 32%, 36.999%, 45%, 45.999%, 50%, 50.99%, 59%, 60.999%, 69%, 70.999%, 86%, 95.999% { opacity: 0.4; text-shadow: none; }
        }
      `}</style>
      <div className="error-neon-container">
        <div className="neon-error flex justify-center">
          {errorText.split("").map((char, i) => (
            <React.Fragment key={i}>
              {i === 1 ? <span>{char}</span> : char}
            </React.Fragment>
          ))}
        </div>
        <div className="neon-code flex justify-center">
          {errorCode.split("").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
