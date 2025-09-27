// src/components/layout/AuthLayout.jsx
import { motion } from "framer-motion";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4 relative overflow-hidden">
      {/* Floating gradient blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-10 left-0"
        animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 bottom-10 right-0"
        animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

        {/* Page Content */}
        <motion.div
            className="relative w-full max-w-sm mx-auto bg-gray-800 rounded-3xl shadow-2xl p-8 backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-700 md:max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
        {children}
      </motion.div>
    </div>
  );
}
