import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('learner');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Add document to waitlist collection
      await addDoc(collection(db, 'waitlist'), {
        email,
        role,
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Error adding document: ', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white"></div>
        <div className="absolute right-0 top-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute left-0 bottom-0 translate-y-1/2 w-[600px] h-[600px] bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Join the Finding Better Community
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Whether you want to create courses, learn from others, or share your story on the podcast, 
              we'd love to have you join our community of people seeking better.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm animate-fade-up">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Thank you for joining!</h3>
              <p className="text-gray-600 text-lg">
                We'll keep you updated on our progress and let you know when we launch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative bg-white p-8 rounded-2xl shadow-sm animate-fade-up">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white rounded-2xl -z-10"></div>
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  />
                </div>
                
                <div className="flex flex-col gap-3">
                  <p className="text-gray-700 font-medium text-left">I'm interested in:</p>
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50/50 transition cursor-pointer group">
                    <input
                      type="radio"
                      name="role"
                      value="creator"
                      checked={role === 'creator'}
                      onChange={(e) => setRole(e.target.value)}
                      disabled={loading}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <span className="block text-gray-900 font-medium group-hover:text-blue-600 transition">Creating courses to help others find better</span>
                      <span className="text-sm text-gray-500">Share your expertise and success story</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50/50 transition cursor-pointer group">
                    <input
                      type="radio"
                      name="role"
                      value="learner"
                      checked={role === 'learner'}
                      onChange={(e) => setRole(e.target.value)}
                      disabled={loading}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <span className="block text-gray-900 font-medium group-hover:text-blue-600 transition">Learning from others who've found better</span>
                      <span className="text-sm text-gray-500">Access practical wisdom from real experiences</span>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50/50 transition cursor-pointer group">
                    <input
                      type="radio"
                      name="role"
                      value="guest"
                      checked={role === 'guest'}
                      onChange={(e) => setRole(e.target.value)}
                      disabled={loading}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <span className="block text-gray-900 font-medium group-hover:text-blue-600 transition">Being a guest on the Finding Better Podcast</span>
                      <span className="text-sm text-gray-500">Share your journey and inspire others</span>
                    </div>
                  </label>
                </div>

                {error && (
                  <div className="text-red-600 text-sm text-center">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition transform hover:scale-[1.02] hover:shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Joining...
                    </span>
                  ) : (
                    'Join the Community'
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