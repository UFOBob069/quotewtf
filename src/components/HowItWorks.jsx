export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-gray-50">
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', 
          backgroundSize: '32px 32px',
        }}></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full opacity-50 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Share Your Success Story
            </h2>
            <p className="text-xl text-gray-600">
              Have you achieved the "better" others are looking for? Share your journey and help others succeed.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[45px] md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 -translate-x-1/2 hidden md:block"></div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="relative group animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <div className="absolute -left-4 -top-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold z-10 shadow-lg group-hover:scale-110 transition-transform">
                  1
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm group-hover:shadow-xl transition-all duration-300 h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white rounded-2xl -z-10"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Share Your Experience</h3>
                  <p className="text-gray-600">
                    Transform your real-world success into an engaging course. We'll help you structure your knowledge in a way that truly helps others.
                  </p>
                </div>
              </div>
              
              <div className="relative group animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <div className="absolute -left-4 -top-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold z-10 shadow-lg group-hover:scale-110 transition-transform">
                  2
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm group-hover:shadow-xl transition-all duration-300 h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white rounded-2xl -z-10"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Build Your Course</h3>
                  <p className="text-gray-600">
                    We provide the tools and guidance to turn your experience into practical, actionable lessons others can follow.
                  </p>
                </div>
              </div>
              
              <div className="relative group animate-fade-up" style={{ animationDelay: '0.6s' }}>
                <div className="absolute -left-4 -top-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold z-10 shadow-lg group-hover:scale-110 transition-transform">
                  3
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm group-hover:shadow-xl transition-all duration-300 h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white rounded-2xl -z-10"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Help Others Succeed</h3>
                  <p className="text-gray-600">
                    Join our community of creators who earn by helping others find their path to better—just like you did.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-20 text-center animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <a 
              href="#waitlist" 
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition transform hover:scale-105 group"
            >
              Start Sharing Your Story
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 