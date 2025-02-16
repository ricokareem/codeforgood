"use client"

import { motion } from "framer-motion"

export default function FloatingShapes() {
  const shapes = [
    { color: "#FF647C", type: "plus", size: 20 },
    { color: "#00B2FF", type: "circle", size: 15 },
    { color: "#FFB800", type: "cross", size: 12 },
    { color: "#4ADE80", type: "circle", size: 18 },
    { color: "#FF647C", type: "circle", size: 25 },
    { color: "#00B2FF", type: "plus", size: 15 },
    { color: "#FFB800", type: "circle", size: 20 },
    { color: "#4ADE80", type: "cross", size: 15 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {shape.type === "plus" && (
            <div
              style={{
                width: shape.size,
                height: shape.size,
                backgroundColor: shape.color,
                clipPath:
                  "polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)",
              }}
            />
          )}
          {shape.type === "circle" && (
            <div
              style={{
                width: shape.size,
                height: shape.size,
                backgroundColor: shape.color,
                borderRadius: "50%",
              }}
            />
          )}
          {shape.type === "cross" && (
            <div
              style={{
                width: shape.size,
                height: shape.size,
                backgroundColor: shape.color,
                transform: "rotate(45deg)",
                clipPath:
                  "polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

