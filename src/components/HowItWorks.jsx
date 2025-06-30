export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-orange-50">
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: 'radial-gradient(#f97316 1px, transparent 1px)', 
          backgroundSize: '32px 32px',
        }}></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-100 rounded-full opacity-50 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get savage, instant feedback on your contractor quote in 3 easy steps.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[45px] md:left-1/2 top-0 bottom-0 w-0.5 bg-orange-100 -translate-x-1/2 hidden md:block"></div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="relative group animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <div className="absolute -left-4 -top-4 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold z-10 shadow-lg group-hover:scale-110 transition-transform">
                  1
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm group-hover:shadow-xl transition-all duration-300 h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-white rounded-2xl -z-10"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Your Quote</h3>
                  <p className="text-gray-600">
                    Drag & drop or select your contractor's quote (PDF, JPG, PNG). We'll handle the rest.
                  </p>
                </div>
              </div>
              
              <div className="relative group animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <div className="absolute -left-4 -top-4 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold z-10 shadow-lg group-hover:scale-110 transition-transform">
                  2
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm group-hover:shadow-xl transition-all duration-300 h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-white rounded-2xl -z-10"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Roasts It</h3>
                  <p className="text-gray-600">
                    Our savage AI scans for red flags, vague language, missing details, and pricing issues. No sugar coating.
                  </p>
                </div>
              </div>
              
              <div className="relative group animate-fade-up" style={{ animationDelay: '0.6s' }}>
                <div className="absolute -left-4 -top-4 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold z-10 shadow-lg group-hover:scale-110 transition-transform">
                  3
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm group-hover:shadow-xl transition-all duration-300 h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-white rounded-2xl -z-10"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Instant Results</h3>
                  <p className="text-gray-600">
                    Receive a savage analysis, negotiation tips, and a realistic price range. All in under a minute.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 