import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'waitlist'), {
        email,
        message,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-white"></div>
        <div className="absolute right-0 top-0 -translate-y-1/2 w-[600px] h-[600px] bg-orange-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute left-0 bottom-0 translate-y-1/2 w-[600px] h-[600px] bg-orange-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Subscribe for Updates
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Get notified when QuoteWTF launches new features, tips, and viral stories. No spam, ever.
            </p>
          </div>
          {submitted ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm animate-fade-up">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Thank you for subscribing!</h3>
              <p className="text-gray-600 text-lg">
                You'll be the first to know about new features and viral contractor stories.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative bg-white p-8 rounded-2xl shadow-sm animate-fade-up">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-white rounded-2xl -z-10"></div>
              <div className="flex flex-col gap-6">
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message (optional)</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Anything you want to tell us? (optional)"
                    rows={2}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
                  />
                </div>
                {error && (
                  <div className="text-red-600 text-sm text-center">{error}</div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 text-white px-6 py-4 rounded-lg text-lg font-medium hover:bg-orange-700 transition transform hover:scale-[1.02] hover:shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
} 