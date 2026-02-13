import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Wedding from './pages/Wedding';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-white text-black selection:bg-gold-champagne selection:text-black antialiased bg-grain min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          {isLoading && <Preloader finishLoading={() => setIsLoading(false)} />}
        </AnimatePresence>

        {!isLoading && (
          <>
            <Navbar />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/rolunk" element={<About />} />
                  <Route path="/szolgaltatasok" element={<Services />} />
                  <Route path="/galeria" element={<Gallery />} />
                  <Route path="/kapcsolat" element={<Contact />} />
                  <Route path="/eskuvo" element={<Wedding />} />
                  {/* Placeholder for missing routes */}
                  <Route path="*" element={<Home />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}
