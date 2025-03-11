// src/components/ui/MoonPhaseDisplay.jsx
'use client'

import { useState, useEffect } from 'react';

export function MoonPhaseDisplay({ className = '', interval = 2000, size = 'text-6xl', bounce = false }) {
  const [moonPhase, setMoonPhase] = useState('🌕');
  
  useEffect(() => {
    const moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
    let currentPhase = 0;
    
    const intervalId = setInterval(() => {
      currentPhase = (currentPhase + 1) % moonPhases.length;
      setMoonPhase(moonPhases[currentPhase]);
    }, interval);
    
    return () => clearInterval(intervalId);
  }, [interval]);

  const animationClass = bounce ? 'animate-bounce' : 'animate-pulse';

  return (
    <div className={`${animationClass} ${size} ${className}`}>
      {moonPhase}
    </div>
  );
}