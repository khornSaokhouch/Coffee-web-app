'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

// --- Animation Variants (same as login) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

// --- Google Icon Component (same as login) ---
const GoogleIcon = (props) => (
    <svg viewBox="0 0 48 48" {...props}>
    {/* SVG paths remain the same */}
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.657-3.27-11.28-7.781l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.02,35.622,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);


// --- Register Page Component ---
const RegisterPagePink = () => {
  return (
    <main className="bg-gray-50 min-h-dvh w-full flex flex-col justify-center items-center lg:flex-row">
      {/* Left Panel: Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-pink-50 p-8"> {/* Pink Theme */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img src="/images/register-illustration.svg" alt="Register Illustration" className="max-w-md w-full" />
        </motion.div>
      </div>

      {/* Right Panel: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          className="w-full max-w-md space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">Create Your Account</h1>
            <p className="mt-2 text-gray-600">Join us today! It only takes a minute.</p>
          </motion.div>
          
          {/* Full Name Input */}
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"><FiUser className="h-5 w-5 text-gray-400" /></span>
              <input id="name" type="text" required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="John Doe" /> {/* Pink Theme */}
            </div>
          </motion.div>

          {/* Email Input */}
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"><FiMail className="h-5 w-5 text-gray-400" /></span>
              <input id="email" type="email" required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="you@example.com" /> {/* Pink Theme */}
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants}>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"><FiLock className="h-5 w-5 text-gray-400" /></span>
              <input id="password" type="password" required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="••••••••" /> {/* Pink Theme */}
            </div>
          </motion.div>

          {/* Register Button */}
          <motion.div variants={itemVariants}>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-300 transform hover:-translate-y-1">Create Account</button> {/* Pink Theme */}
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-gray-50 text-gray-500">OR</span></div>
          </motion.div>

          {/* Google Register Button */}
          <motion.div variants={itemVariants}>
            <button type="button" className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"> {/* Pink Theme */}
              <GoogleIcon className="h-6 w-6 mr-3" /> Sign up with Google
            </button>
          </motion.div>
          
          {/* Login Link */}
           <motion.p variants={itemVariants} className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="#" className="font-medium text-pink-600 hover:text-pink-500 hover:underline">Log in</a> {/* Pink Theme */}
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
};

export default RegisterPagePink;