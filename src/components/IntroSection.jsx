export const IntroSection = () => {
    return (
        <section className="bg-gradient-to-b from-white to-purple-50 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-blue-600 mb-8 relative">
              <span className="inline-block pb-2 border-b-4 border-purple-500">
                Premium Orlando Vacation Homes Near Disney World
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-100">
                <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
                  <span className="mr-2">🏰</span>
                  Perfect Location
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our vacation rentals are strategically located minutes from Walt Disney World®, 
                  Universal Studios®, and other Orlando attractions. Enjoy easy park access while 
                  staying in a peaceful residential setting.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-100">
                <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
                  <span className="mr-2">✨</span>
                  Magical Amenities
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Each property features family-friendly amenities including fully equipped kitchens, 
                  private pools, game rooms, and smart TVs with Disney+ streaming. Perfect for creating 
                  magical memories.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                Why Choose Our Orlando Vacation Homes?
              </h3>
              <ul className="text-lg text-gray-700 space-y-3 max-w-2xl mx-auto text-left">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">✨</span>
                  <span>More space than hotel rooms - perfect for families and groups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">✨</span>
                  <span>Save money by cooking meals in your fully equipped kitchen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">✨</span>
                  <span>Private pools and resort-style amenities for post-park relaxation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">✨</span>
                  <span>Expert local support and park planning assistance available</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
    );
};