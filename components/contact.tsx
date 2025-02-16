"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { name, email, message })
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <section id="contact" className="py-20 bg-[#161B28]">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-[#4ADE80] mb-12">CONTACT ME</h2>
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6">
            {[
              { label: "Name", value: name, setValue: setName, type: "text" },
              { label: "Email", value: email, setValue: setEmail, type: "email" },
            ].map((field) => (
              <div key={field.label} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF647C] to-[#00B2FF] rounded-xl transform rotate-3 scale-105 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 opacity-50" />
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  placeholder={field.label}
                  className="relative w-full px-6 py-4 bg-[#1C2333]/90 backdrop-blur-sm rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B2FF]"
                  required
                />
              </div>
            ))}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFB800] to-[#4ADE80] rounded-xl transform rotate-3 scale-105 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 opacity-50" />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                rows={4}
                className="relative w-full px-6 py-4 bg-[#1C2333]/90 backdrop-blur-sm rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ADE80]"
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-[#FF647C] to-[#00B2FF] text-white rounded-xl transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}

