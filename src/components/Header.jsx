import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg md:text-xl font-semibold text-gray-800">
            Finding Better University
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-gray-600 hover:text-gray-900 transition">
              About
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition">
              How It Works
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-gray-900 transition">
              Contact
            </Link>
            <button 
              onClick={scrollToWaitlist}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Join Waitlist
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <span className="sr-only">Open menu</span>
            {!isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white border-b border-gray-100 px-4 py-2 shadow-lg">
            <div className="flex flex-col gap-4 py-2">
              <Link 
                href="#about" 
                className="text-gray-600 hover:text-gray-900 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="#how-it-works" 
                className="text-gray-600 hover:text-gray-900 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="#contact" 
                className="text-gray-600 hover:text-gray-900 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <button 
                onClick={scrollToWaitlist}
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition w-full"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 