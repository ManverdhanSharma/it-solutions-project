import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ChatbotFloat from "./components/ChatbotFloat.jsx";

// FIXED: Import ThemeProvider to wrap the entire app
import ThemeProvider from "./components/ThemeProvider.jsx";

// Lazy load pages for better performance
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

// Enhanced Loading Component
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 mx-auto bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-12 h-12 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Phenoxis</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
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
        <ChatbotFloat />
      </div>
    </ThemeProvider>
  );
}

export default App;
