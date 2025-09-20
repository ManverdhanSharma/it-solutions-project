import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroBackground() {
  const svgRef = useRef(null);
  const ellipsesRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference and mobile
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (!prefersReducedMotion && !isMobile) {
      // Subtle pulse animation
      gsap.to(ellipsesRef.current.children, {
        scale: 1.03,
        opacity: 0.4,
        yoyo: true,
        repeat: -1,
        duration: 6,
        ease: "power2.inOut",
        stagger: 0.5
      });

      // Very slow rotation
      gsap.to(ellipsesRef.current, {
        rotation: 360,
        transformOrigin: "50% 50%",
        repeat: -1,
        duration: 180, // 3 minutes per rotation - very subtle
        ease: "none"
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Phenoxis Brand Gradient */}
          <linearGradient id="phenoxisHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6">
              <animate 
                attributeName="stop-color" 
                values="#3b82f6; #06b6d4; #8b5cf6; #3b82f6" 
                dur="20s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="50%" stopColor="#06b6d4">
              <animate 
                attributeName="stop-color" 
                values="#06b6d4; #8b5cf6; #10b981; #06b6d4" 
                dur="20s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="100%" stopColor="#8b5cf6">
              <animate 
                attributeName="stop-color" 
                values="#8b5cf6; #10b981; #3b82f6; #8b5cf6" 
                dur="20s" 
                repeatCount="indefinite" 
              />
            </stop>
          </linearGradient>

          {/* Glow Filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g ref={ellipsesRef}>
          {/* Large background ellipse */}
          <ellipse 
            cx="600" 
            cy="400" 
            rx="300" 
            ry="180" 
            fill="url(#phenoxisHeroGrad)" 
            opacity="0.12"
            filter="url(#glow)"
          />
          
          {/* Vertical ellipse */}
          <ellipse 
            cx="600" 
            cy="400" 
            rx="180" 
            ry="300" 
            fill="url(#phenoxisHeroGrad)" 
            opacity="0.08"
            filter="url(#glow)"
          />
          
          {/* Inner circular ellipse */}
          <ellipse 
            cx="600" 
            cy="400" 
            rx="220" 
            ry="220" 
            fill="url(#phenoxisHeroGrad)" 
            opacity="0.06"
            filter="url(#glow)"
          />
        </g>
      </svg>
    </div>
  );
}
