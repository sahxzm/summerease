'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface FloatingBubbleProps {
  text: string | null;
}

export default function FloatingBubble({ text }: FloatingBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!text) return null;

  const lines = text.split('\n').filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50"
    >
      {/* Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
      >
        <span className="text-xl">PDF</span>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: isOpen ? 1 : 0 }}
          className="absolute -top-2 -right-2 bg-white rounded-full w-4 h-4 text-xs flex items-center justify-center text-blue-500"
        >
          {lines.length}
        </motion.div>
      </button>

      {/* Expanded Content */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 right-4 w-96 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-h-[80vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-black">Document Summary</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2">
            {lines.map((line, index) => {
              // Split line into emoji and text if it starts with an emoji
              const emojiMatch = line.match(/^\s*([\p{Emoji}\s]+)\s+(.*)$/u);
              if (emojiMatch) {
                const [_, emoji, text] = emojiMatch;
                return (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-xl text-yellow-600">{emoji.trim()}</span>
                    <span className="text-gray-700 whitespace-pre-wrap">{text}</span>
                  </div>
                );
              }
              // For section headers or other lines without emojis
              return (
                <div key={index} className="text-lg font-semibold text-gray-800 whitespace-pre-wrap">
                  {line}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}