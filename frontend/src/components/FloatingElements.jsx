import React from 'react';

export default function FloatingElements() {
  // Universal floating elements for entire site
  const floatingElements = [
    { x: '8%', y: '12%', delay: '0s', size: 'w-3 h-3', color: 'bg-blue-400', animation: 'animate-float' },
    { x: '92%', y: '18%', delay: '1.5s', size: 'w-2 h-2', color: 'bg-purple-400', animation: 'animate-float-slow' },
    { x: '15%', y: '35%', delay: '3s', size: 'w-4 h-4', color: 'bg-pink-400', animation: 'animate-drift' },
    { x: '85%', y: '42%', delay: '0.5s', size: 'w-3 h-3', color: 'bg-green-400', animation: 'animate-float' },
    { x: '25%', y: '65%', delay: '2s', size: 'w-2 h-2', color: 'bg-yellow-400', animation: 'animate-float-slow' },
    { x: '75%', y: '58%', delay: '4s', size: 'w-5 h-5', color: 'bg-cyan-400', animation: 'animate-drift' },
    { x: '5%', y: '78%', delay: '1s', size: 'w-3 h-3', color: 'bg-indigo-400', animation: 'animate-float' },
    { x: '95%', y: '85%', delay: '3.5s', size: 'w-2 h-2', color: 'bg-red-400', animation: 'animate-float-slow' },
    { x: '40%', y: '8%', delay: '2.5s', size: 'w-4 h-4', color: 'bg-orange-400', animation: 'animate-drift' },
    { x: '65%', y: '92%', delay: '0.8s', size: 'w-3 h-3', color: 'bg-teal-400', animation: 'animate-float' },
    { x: '12%', y: '50%', delay: '1.8s', size: 'w-2 h-2', color: 'bg-rose-400', animation: 'animate-float' },
    { x: '88%', y: '28%', delay: '2.8s', size: 'w-3 h-3', color: 'bg-violet-400', animation: 'animate-drift' },
    { x: '30%', y: '88%', delay: '0.3s', size: 'w-4 h-4', color: 'bg-emerald-400', animation: 'animate-float-slow' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingElements.map((element, i) => (
        <div
          key={i}
          className={`absolute ${element.size} ${element.color} ${element.animation} rounded-full opacity-20 hover:opacity-40 transition-opacity duration-500`}
          style={{
            left: element.x,
            top: element.y,
            animationDelay: element.delay,
            animationDuration: element.animation.includes('slow') ? '15s' : element.animation.includes('drift') ? '12s' : '9s'
          }}
        />
      ))}
      
      {/* Additional subtle shapes for variety */}
      <div className="absolute w-6 h-1 bg-blue-300/20 rounded-full animate-drift top-1/4 left-1/3" style={{ animationDelay: '1s', animationDuration: '20s' }} />
      <div className="absolute w-1 h-8 bg-purple-300/20 rounded-full animate-float-slow top-3/4 right-1/4" style={{ animationDelay: '3s', animationDuration: '18s' }} />
      <div className="absolute w-4 h-4 border border-pink-300/30 rounded-full animate-float top-1/2 left-1/6" style={{ animationDelay: '2s', animationDuration: '16s' }} />
      <div className="absolute w-2 h-6 bg-green-300/20 rounded-full animate-drift top-1/6 right-1/3" style={{ animationDelay: '4s', animationDuration: '22s' }} />
    </div>
  );
}
