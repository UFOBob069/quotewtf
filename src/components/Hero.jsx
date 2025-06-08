// components/Hero.jsx
export default function Hero() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', 
          backgroundSize: '32px 32px',
        }}></div>
        <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute left-0 bottom-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <span className="inline-block text-blue-600 font-medium mb-6 py-2 px-4 rounded-full bg-blue-50 border border-blue-100">
              From the Creator of the Finding Better Podcast
            </span>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Learn from Those Who've{" "}
              <span className="relative">
                <span className="relative z-10 text-blue-600">Been There, Done That</span>
                <span className="absolute inset-x-0 bottom-2 h-3 bg-blue-100 -rotate-1"></span>
              </span>
            </h1>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              A curated marketplace of life-changing courses taught by real people who have achieved the "better" you're looking for—in careers, relationships, money, health, and life.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={scrollToWaitlist}
              className="group bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition transform hover:scale-105 hover:shadow-lg relative overflow-hidden"
            >
              <span className="relative z-10">Join the Waitlist</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </button>
            <a 
              href="https://johnsuzuki.com/podcast" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 px-8 py-4 rounded-full text-lg font-medium hover:text-gray-900 transition flex items-center group"
            >
              Listen to the Podcast
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          
          {/* Social proof */}
          <div className="mt-16 grid grid-cols-3 gap-8 animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">100+</div>
              <div className="text-gray-600">Podcast Episodes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">5K+</div>
              <div className="text-gray-600">Monthly Listeners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">100+</div>
              <div className="text-gray-600">Success Stories</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}