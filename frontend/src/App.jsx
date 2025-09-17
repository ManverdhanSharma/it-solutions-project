import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ChatbotFloat from "./components/ChatbotFloat.jsx";

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

function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center p-8">
      <div className="flex items-center gap-3 text-muted">
        <span className="h-3 w-3 animate-pulse rounded-full bg-gray-400 dark:bg-gray-600" />
        <span className="h-3 w-3 animate-pulse rounded-full bg-gray-400 [animation-delay:120ms] dark:bg-gray-600" />
        <span className="h-3 w-3 animate-pulse rounded-full bg-gray-400 [animation-delay:240ms] dark:bg-gray-600" />
        <span className="ml-2">Loading…</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-app text-app">
      <header className="sticky top-0 z-40 shell bg-surface/90 backdrop-blur border-b divider">
        <Navbar />
      </header>

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

      <footer className="shell border-t divider">
        <Footer />
      </footer>

      <ChatbotFloat />
    </div>
  );
}
