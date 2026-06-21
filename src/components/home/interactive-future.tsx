"use client";

import { motion } from "framer-motion";

export function InteractiveFuture() {
  return (
    <motion.span
      className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent italic inline-block"
      whileHover={{ scale: 1.06, transition: { type: "spring", stiffness: 300 } }}
    >
      FUTURE
    </motion.span>
  );
}
