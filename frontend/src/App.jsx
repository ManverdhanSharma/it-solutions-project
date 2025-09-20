import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ChatbotFloat from "./components/ChatbotFloat.jsx";
import FloatingElements from "./components/FloatingElements.jsx"; // Add universal floating elements

// FIXED: Import ThemeProvider to wrap the entire app
import ThemeProvider from "./components/ThemeProvider.jsx";

// FIXED: Correct import paths - using the exact file names from your structure
const Home = lazy(() => import("./pages/Home.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Portfolio = lazy(() => import("./pages/Portfolio.jsx"));
const Team = lazy(() => import("./pages/Team.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const FAQ = lazy(() => import("./pages/FAQ.jsx"));
const Careers = lazy(() => import("./pages/Careers.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

// Enhanced Loading Component with floating elements preview
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Mini floating elements for loading screen */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float top-1/4 left-1/4"></div>
        <div className="absolute w-3 h-3 bg-purple-400/30 rounded-full animate-float-slow top-1/3 right-1/3" style={{animationDelay: '1s'}}></div>
        <div className="absolute w-2 h-2 bg-pink-400/30 rounded-full animate-drift bottom-1/3 left-1/3" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="text-center space-y-4 relative z-10">
        <div className="relative">
          <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute inset-0 w-12 h-12 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            <span className="text-blue-500">Phenoxis</span>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">Loading amazing experience...</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 relative">
        {/* Universal Floating Elements - Site Wide */}
        <FloatingElements />
        
        {/* Main App Structure with proper z-index layering */}
        <div className="relative z-10">
          <Navbar />
          
          <main className="flex-1">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/team" element={<Team />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          
          <Footer />
        </div>
        
        {/* Chatbot - Always on top */}
        <div className="relative z-50">
          <ChatbotFloat />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
