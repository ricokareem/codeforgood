"use client"

import { motion } from "framer-motion"

export default function Modal({ experience, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1C2333] p-8 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-2" style={{ color: experience.color }}>
          {experience.title}
        </h3>
        <p className="text-[#00B2FF] mb-4 font-bold">
          {experience.company} | {experience.period}
        </p>
        <div className="text-gray-300 mb-6 space-y-4">
          {experience.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <button
          className="bg-[#00B2FF] text-white px-4 py-2 rounded-lg hover:bg-[#0090CC] transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )
}

