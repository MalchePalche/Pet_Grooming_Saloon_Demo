import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Начало', path: '/' },
    { name: 'За нас', path: '/about' },
    { name: 'Услуги', path: '/services' },
    { name: 'Галерия', path: '/gallery' },
    { name: 'Контакти', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass-nav">
      <nav className="flex justify-between items-center px-8 py-6 max-w-screen-2xl mx-auto">
        <Link to="/" className="text-2xl font-headline italic text-on-surface">Вашият бизнес</Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`transition-all duration-300 ${
                location.pathname === link.path
                  ? 'text-primary font-medium border-b border-primary pb-1'
                  : 'text-on-surface hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link
          to="/booking"
          className="hidden md:inline-block bg-primary-container text-on-primary px-6 py-2 rounded-lg font-medium hover:opacity-80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(230,195,100,0.2)] active:scale-95"
        >
          Запишете час
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-on-surface p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-t border-outline-variant/20"
          >
            <div className="flex flex-col px-8 py-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-lg transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-primary font-medium'
                      : 'text-on-surface hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/booking"
                onClick={() => setMobileOpen(false)}
                className="bg-primary-container text-on-primary px-6 py-3 rounded-lg font-medium text-center hover:opacity-80 transition-all duration-300 active:scale-95"
              >
                Запишете час
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
