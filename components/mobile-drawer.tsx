"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  key: string;
  label: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onMenuItemClick: (key: string) => void;
  languageSelector: React.ReactNode;
}

const backdropVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const drawerVariants = {
  closed: {
    x: "100%",
    transition: { type: "spring" as const, damping: 30, stiffness: 300 },
  },
  open: {
    x: 0,
    transition: { type: "spring" as const, damping: 30, stiffness: 300 },
  },
};

const menuItemVariants = {
  closed: { x: 50, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.08, type: "spring" as const, stiffness: 300, damping: 24 },
  }),
};

export default function MobileDrawer({
  isOpen,
  onClose,
  menuItems,
  onMenuItemClick,
  languageSelector,
}: MobileDrawerProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-background z-50 shadow-2xl flex flex-col safe-bottom"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.2 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100 || info.velocity.x > 500) {
                onClose();
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <span className="text-lg font-semibold figure-heading-logo">Menu</span>
              <motion.button
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors touch-feedback"
                whileTap={{ scale: 0.95 }}
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 py-6 px-4 overflow-y-auto scroll-momentum">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.key}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    custom={index}
                  >
                    <button
                      onClick={() => onMenuItemClick(item.key)}
                      className="w-full text-left px-4 py-4 rounded-xl text-lg font-medium text-foreground hover:bg-muted active:bg-muted/80 transition-colors touch-feedback"
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Language Selector at bottom */}
            <div className="p-6 border-t border-border/50">
              <div className="mb-2 text-sm text-muted-foreground font-medium">
                Language
              </div>
              {languageSelector}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
