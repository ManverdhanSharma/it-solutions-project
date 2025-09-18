import React, { useState, useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/ThemeProvider";

const NAV_ITEMS = [
  { to: "/#about", label: "About" },
  { to: "/#services", label: "Services" },
  { to: "/#portfolio", label: "Portfolio" },
  { to: "/#faq", label: "FAQ" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Enhanced navigation logic that handles both hash links and regular routes
  const handleNavigation = (href) => {
    if (href.startsWith("/#")) {
      // If we're not on the home page, navigate to home first
      if (pathname !== "/") {
        navigate("/");
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const targetId = href.substring(2);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        }, 100);
      } else {
        // We're already on home page, just scroll
        const targetId = href.substring(2);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    } else {
      // Regular route navigation
      navigate(href);
    }
    setOpen(false);
  };

  // Enhanced navigation component with all original styling features
  const NavigationItem = ({ item, className }) => {
    const isHashLink = item.to.startsWith("/#");
    const isActive = pathname === item.to || 
      (isHashLink && pathname === "/" && window.location.hash === item.to.substring(1));

    if (isHashLink) {
      return (
        <button
          onClick={() => handleNavigation(item.to)}
          className={`${className} ${
            isActive ? "text-blue-500 font-semibold" : "text-gray-600 dark:text-gray-300"
          } cursor-pointer relative group transition-all duration-300 hover:text-blue-500 hover:scale-105`}
        >
          <span className="relative z-10">{item.label}</span>
          {/* Animated underline */}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          {/* Subtle glow effect */}
          <span className="absolute inset-0 rounded opacity-0 bg-blue-500/10 transition-all duration-300 group-hover:opacity-100 -z-10 px-2 py-1"></span>
        </button>
      );
    }

    return (
      <NavLink
        to={item.to}
        className={({ isActive }) => `${className} ${
          isActive ? "text-blue-500 font-semibold" : "text-gray-600 dark:text-gray-300"
        } relative group transition-all duration-300 hover:text-blue-500 hover:scale-105`}
        onClick={() => setOpen(false)}
      >
        <span className="relative z-10">{item.label}</span>
        {/* Animated underline */}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        {/* Subtle glow effect */}
        <span className="absolute inset-0 rounded opacity-0 bg-blue-500/10 transition-all duration-300 group-hover:opacity-100 -z-10 px-2 py-1"></span>
      </NavLink>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Enhanced Logo with Phenoxis Text */}
          <Link 
            to="/" 
            className="flex-shrink-0 flex items-center group cursor-pointer"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="flex items-center">
              {/* PNG logo from public folder */}
              <img 
                className="h-12 w-auto transition-all duration-300 group-hover:scale-110 group-hover:brightness-125 group-hover:drop-shadow-lg filter" 
                src="/New.png"
                alt="Phenoxis"
                onError={(e) => {
                  // Hide broken image and show custom fallback
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              
              {/* Custom P Logo Fallback (hidden by default) */}
              <div 
                className="relative w-14 h-12 bg-gray-900 dark:bg-gray-800 rounded border border-gray-600 dark:border-gray-500 items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{display: 'none'}}
              >
                {/* P Letter */}
                <span className="text-2xl font-bold text-white">P</span>
                
                {/* Blue accent bar */}
                <div className="absolute right-1 top-1 bottom-1 w-3 bg-blue-500 rounded-sm transition-all duration-300 group-hover:brightness-110"></div>
              </div>
              
              {/* Phenoxis text with zero gap */}
              <span className="text-2xl font-bold text-blue-500 dark:text-blue-400 transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-300 group-hover:scale-105 -ml-1">
                Phenoxis
              </span>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <NavigationItem
                  key={item.to}
                  item={item}
                  className="text-sm font-medium transition-all duration-300 px-2 py-1"
                />
              ))}
              
              {/* 100% WORKING EMOJI THEME TOGGLE */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  {theme === 'dark' ? (
                    /* Sun emoji for dark mode */
                    <span className="text-lg transition-transform duration-300 hover:scale-110 hover:rotate-12">☀️</span>
                  ) : (
                    /* Moon emoji for light mode - GUARANTEED VISIBLE */
                    <span 
                      className="text-lg transition-transform duration-300 hover:scale-110 hover:-rotate-12"
                      style={{ 
                        filter: 'contrast(2) brightness(0.8)',
                        fontSize: '16px',
                        lineHeight: 1
                      }}
                    >
                      🌙
                    </span>
                  )}
                </div>
              </button>

              {/* Enhanced CTA Button */}
              <Link
                to="/contact"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:brightness-110"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* 100% WORKING MOBILE EMOJI THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {theme === 'dark' ? (
                  <span className="text-base">☀️</span>
                ) : (
                  <span 
                    className="text-base" 
                    style={{ 
                      filter: 'contrast(2) brightness(0.8)',
                      fontSize: '14px'
                    }}
                  >
                    🌙
                  </span>
                )}
              </div>
            </button>
            
            {/* Enhanced Hamburger Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
              aria-label="Toggle mobile menu"
              aria-expanded={open}
            >
              <svg 
                className={`block h-6 w-6 transition-all duration-300 ${open ? 'rotate-90 scale-110' : 'hover:scale-110'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile menu */}
      {open && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            {NAV_ITEMS.map((item) => (
              <NavigationItem
                key={item.to}
                item={item}
                className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-[1.02] hover:shadow-sm"
              />
            ))}
            
            {/* Enhanced Mobile CTA Button */}
            <div className="px-3 pt-4 pb-2 border-t border-gray-200 dark:border-gray-700 mt-4">
              <Link
                to="/contact"
                className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:brightness-110"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
