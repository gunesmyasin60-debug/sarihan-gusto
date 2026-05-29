"use client";

import React, { useEffect, useRef } from "react";

export default function AmbientGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isMoving = false;
    let isFirstMove = true;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;
      
      if (isFirstMove) {
        currentX = mouseX;
        currentY = mouseY;
        isFirstMove = false;
        if (glow) {
          glow.style.opacity = "0.8";
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Smooth inertia tracking using requestAnimationFrame (60fps GPU accelerated)
    let animationFrameId: number;
    const updatePosition = () => {
      if (isMoving) {
        // Damping / inertia calculation (0.08 follow factor for organic fluidity)
        const dx = mouseX - currentX;
        const dy = mouseY - currentY;
        currentX += dx * 0.08;
        currentY += dy * 0.08;

        if (glow) {
          glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
        }
      }
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* 
        Dynamic Cursor Amber/Gold Light (Candlelight follow effect).
        Extremely subtle, blends with the Koy Maun (#181210) background.
        Only visible on desktop with mouse interactions.
      */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-40 h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle_at_center,rgba(217,156,61,0.09)_0%,rgba(217,156,61,0.02)_40%,transparent_70%)] opacity-0 mix-blend-screen transition-opacity duration-1000 will-change-transform max-md:hidden"
        style={{
          transform: "translate3d(-999px, -999px, 0)",
        }}
      />

      {/* 
        Static organic ambient background glows (Candlelight/Ember Glow).
        Provides warmth and deep premium luxury feel across all devices (Desktop & Mobile).
      */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Warm Golden Ember glow in top-right */}
        <div className="absolute -right-[15%] -top-[15%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(217,156,61,0.07)_0%,rgba(194,139,50,0.02)_50%,transparent_70%)] animate-candle-slow mix-blend-screen" />
        
        {/* Soft Hearth Amber glow in bottom-left */}
        <div className="absolute -left-[20%] -bottom-[20%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(217,156,61,0.06)_0%,rgba(120,70,30,0.01)_60%,transparent_70%)] animate-candle-fast mix-blend-screen" />
      </div>
    </>
  );
}
