export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">QuoteWTF</h3>
              <p className="text-gray-400 mb-6">
                Savage, AI-powered contractor quote analysis. No fluff. No BS. Just the truth about your money.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#how-it-works" className="text-gray-400 hover:text-white transition">How It Works</a>
                </li>
                <li>
                  <a href="#benefits" className="text-gray-400 hover:text-white transition">Why QuoteWTF</a>
                </li>
                <li>
                  <a href="#waitlist" className="text-gray-400 hover:text-white transition">Subscribe</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</a>
                </li>
                <li>
                  <a href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} QuoteWTF. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 