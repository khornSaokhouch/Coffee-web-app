// Filename: CoffeeSplashPage.js
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
// 1. Import the icon from react-icons
import { FiCoffee } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const CoffeeSplashPage = () => {
  return (
    <main className="relative min-h-screen font-sans overflow-hidden isolate text-white">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=2564&auto=format&fit=crop"
          alt="A cozy cafe setting with warm lighting"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <motion.div
        className="relative z-20 min-h-screen flex flex-col items-center justify-center p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            className="text-8xl font-extrabold tracking-tight mb-4
            bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200
            bg-clip-text text-transparent drop-shadow-md"
            variants={itemVariants}
          >
            E Coffee
          </motion.h1>

          <motion.p
            className="text-xl text-amber-100/80 mb-12"
            variants={itemVariants}
          >
            Your Daily Ritual, Perfected.
          </motion.p>
        </div>

        <motion.div
          className="w-full max-w-sm mx-auto pb-8"
          variants={itemVariants}
        >
          <Link href="/login" passHref>
            <button
              type="button"
              // 2. Add flexbox to align the icon and text
              className="w-full bg-amber-600 text-white font-bold py-4 rounded-full text-xl
              flex items-center justify-center gap-3
              shadow-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-amber-500 focus:ring-offset-black transform hover:-translate-y-1
              transition-all duration-300 ease-in-out"
            >
              {/* 3. Add the FiCoffee icon component */}
              <FiCoffee size={24} />
              <span>Start Your Order</span>
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default CoffeeSplashPage;