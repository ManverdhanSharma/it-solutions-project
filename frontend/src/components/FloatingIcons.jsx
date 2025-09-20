import React from 'react';

export default function FloatingIcons() {
  const icons = [
    { 
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ), 
      delay: '0s', x: '10%', y: '20%' 
    },
    { 
      icon: (
        <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
        </svg>
      ), 
      delay: '2s', x: '85%', y: '15%' 
    },
    { 
      icon: (
        <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
        </svg>
      ), 
      delay: '4s', x: '15%', y: '70%' 
    },
    { 
      icon: (
        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ), 
      delay: '1s', x: '80%', y: '65%' 
    },
    { 
      icon: (
        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ), 
      delay: '3s', x: '50%', y: '10%' 
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((item, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-30 hover:opacity-60 transition-opacity duration-300"
          style={{
            left: item.x,
            top: item.y,
            animationDelay: item.delay,
            animationDuration: '8s'
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}
