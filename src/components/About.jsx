export default function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 w-1/3 h-64 bg-blue-50 rounded-l-full opacity-50"></div>
        <div className="absolute left-0 bottom-1/4 w-1/3 h-64 bg-blue-50 rounded-r-full opacity-50"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Born from a Simple Idea
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-16">
              Finding Better University grew from John's podcast mission: helping people find the "better" they want in life 
              through real experiences. We believe the best way to success is to learn from those who've achieved it. 
              No theories, no academics—just real people sharing what actually works.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-2xl -z-10"></div>
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-transform">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Real Experience</h3>
                <p className="text-gray-600">Learn from people who've actually achieved what you're aiming for</p>
              </div>
            </div>

            <div className="group">
              <div className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-2xl -z-10"></div>
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-transform">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Practical Wisdom</h3>
                <p className="text-gray-600">Beyond theories—get actionable insights that work in real life</p>
              </div>
            </div>

            <div className="group">
              <div className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-2xl -z-10"></div>
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-6 transition-transform">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Lifting Others</h3>
                <p className="text-gray-600">Making the world better by sharing our very best to help others succeed</p>
              </div>
            </div>
          </div>

          {/* Quote section */}
          <div className="mt-20 bg-white rounded-2xl p-8 md:p-12 shadow-sm relative animate-fade-up">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>
            <blockquote className="text-xl text-gray-600 italic">
              "It's all about making the world better by lifting others. When we share our experiences, we create a ripple effect of positive change."
            </blockquote>
            <div className="mt-6 text-gray-900 font-medium">John</div>
            <div className="text-gray-600">Creator of Finding Better</div>
          </div>
        </div>
      </div>
    </section>
  );
} 