import React, { useState, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
// Remove this line completely:
// import logo from "../assets/new.png";

// Import from the ThemeProvider file directly
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
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Handle smooth scrolling to sections
  const handleSmoothScroll = (href) => {
    if (href.startsWith("/#")) {
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        });
      }
    }
    setOpen(false);
  };

  // Enhanced AnchorOrNav component with hover effects
  const AnchorOrNav = ({ item, className }) => {
    const isHash = item.to.includes("#");
    const isActive = pathname === item.to || (isHash && pathname === "/" && window.location.hash === item.to.substring(1));
    
    return isHash ? (
      <button
        onClick={() => handleSmoothScroll(item.to)}
        className={`${className} ${
          isActive ? "text-blue-500 font-semibold" : ""
        } cursor-pointer relative group transition-all duration-300 hover:text-blue-500 hover:scale-105`}
      >
        <span className="relative z-10">{item.label}</span>
        {/* Animated underline */}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        {/* Subtle glow effect */}
        <span className="absolute inset-0 rounded opacity-0 bg-blue-500/10 transition-all duration-300 group-hover:opacity-100 -z-10 px-2 py-1"></span>
      </button>
    ) : (
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          `${className} ${
            isActive ? "text-blue-500 font-semibold" : "text-gray-600 dark:text-gray-300"
          } relative group transition-all duration-300 hover:text-blue-500 hover:scale-105`
        }
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
          
          {/* Custom Phenoxis Logo - No PNG dependency */}
          <Link 
            to="/" 
            className="flex-shrink-0 flex items-center group cursor-pointer"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="flex items-center">
              {/* Custom P Logo */}
              <div className="relative w-14 h-12 bg-gray-900 dark:bg-gray-800 rounded border border-gray-600 dark:border-gray-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                {/* P Letter */}
                <span className="text-2xl font-bold text-white">P</span>
                
                {/* Blue accent bar */}
                <div className="absolute right-1 top-1 bottom-1 w-3 bg-blue-500 rounded-sm transition-all duration-300 group-hover:brightness-110"></div>
              </div>
              
              {/* Phenoxis text with zero gap */}
              <span className="text-2xl font-bold text-blue-500 dark:text-blue-400 transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-300 group-hover:scale-105 -ml-1">
                henoxis
              </span>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <AnchorOrNav
                  key={item.to}
                  item={item}
                  className="text-sm font-medium transition-all duration-300 px-2 py-1"
                />
              ))}
              
              {/* Enhanced Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group hover:scale-110 hover:shadow-lg"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                <div className="relative w-5 h-5">
                  {theme === 'dark' ? (
                    <svg 
                      className="w-5 h-5 text-yellow-500 transition-all duration-300 group-hover:rotate-12 group-hover:text-yellow-400 group-hover:drop-shadow-lg" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  ) : (
                    <svg 
                      className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:-rotate-12 group-hover:text-gray-900 dark:group-hover:text-gray-100 group-hover:drop-shadow-lg" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        d="M17.293 13.293A8 8 0 716.707 2.707a8.001 8.001 0 1010.586 10.586z" 
                      />
                    </svg>
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
          <div className="md:hidden flex items-center space-x-4">
            {/* Enhanced Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="text-lg transition-transform duration-300 hover:scale-110">
                {theme === 'dark' ? '☀️' : '🌙'}
              </span>
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
              <AnchorOrNav
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
