'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/authStore';
import Link from 'next/link';
import { User, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Reusable CoffeeCup icon (copied from LoginPage for consistency)
const CoffeeCupIcon = (props) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M18.5 7H4.5a2 2 0 0 0-2 2v6a4 4 0 0 0 4 4h9a4 4 0 0 0 4-4V9a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 9.5v-3a2 2 0 0 1 2-2H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 3s.5 1.5-1 2S4.5 6.5 4.5 6.5" opacity="0.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 3s.5 1.5-1 2S7.5 6.5 7.5 6.5" opacity="0.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export default function RegisterPage() {
  const router = useRouter();
  const { register, loading } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    // Client-side validation
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    try {
      await register({
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });
      
      toast.success('Registration successful! Please log in.');
      router.push('/login');

    } catch (err) {
      // API errors can be displayed in the form or as a toast.
      // Here, we'll use the in-form display for consistency.
      setLocalError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    // 1. Changed main container to use the new background strategy
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=2564&auto=format&fit=crop"
          alt="Close up of a barista making coffee"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* 2. Swapped white card for a "glassmorphism" style card */}
      <motion.div
        className="relative z-10 w-full max-w-md bg-black/30 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header - Unified with LoginPage's branding */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center gap-3 mb-4 justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <CoffeeCupIcon className="h-6 w-6 text-white" />
            </div>
            {/* 3. Changed text colors to be light for dark background */}
            <span className="font-serif text-2xl font-bold text-slate-100">KopiTime</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Create an Account</h1>
          <p className="text-slate-300">Join us and start your coffee journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {localError && (
            // 4. Added and styled error message for a dark theme
            <motion.div
              className="bg-red-900/50 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {localError}
            </motion.div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-amber-400" />
              </span>
              {/* 5. Restyled all inputs for dark mode */}
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                disabled={loading}
                className="w-full px-4 py-3 pl-10 bg-slate-900/50 text-white border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-amber-400" />
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={loading}
                className="w-full px-4 py-3 pl-10 bg-slate-900/50 text-white border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-amber-400" />
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                className="w-full px-4 py-3 pr-10 pl-10 bg-slate-900/50 text-white border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-amber-500 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-200 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-amber-400" />
              </span>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                className="w-full px-4 py-3 pr-10 pl-10 bg-slate-900/50 text-white border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-amber-500 cursor-pointer"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-2"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Create Account'}
          </motion.button>
        </form>

        {/* Sign in link */}
        <div className="mt-6 text-center">
          {/* 6. Updated text color for the link prompt */}
          <p className="text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="text-amber-500 hover:text-amber-400 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}