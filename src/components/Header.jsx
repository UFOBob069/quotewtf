import Link from 'next/link';

export default function Header() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-gray-800">
          Finding Better University
        </Link>
        <div className="flex items-center gap-8">
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
      </nav>
    </header>
  );
} 