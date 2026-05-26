// src/components/ui/Button.tsx
// Premium Buton Bileşeni — Anadolu Sıcaklığı konseptine uygun, altın/bronz tonlarında akıcı animasyonlu ortak buton.
// Parametreler: variant (solid/outline/ghost), size (sm/md/lg), children, onClick, disabled, type, aria-label vb.

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "variant"> {
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant = "solid",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center font-medium rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    solid: "bg-accent text-white hover:bg-brand-gold-hover hover:scale-[1.02] shadow-md shadow-accent/10 border border-transparent",
    outline: "bg-transparent text-accent border border-accent hover:bg-accent/10 hover:scale-[1.02]",
    ghost: "bg-transparent text-foreground hover:bg-card hover:text-accent border border-transparent",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
