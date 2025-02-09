// components/Hero.jsx
export const Hero = () => {
  return (
    <div 
      className="relative h-[600px] text-white overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50"
      style={{
        backgroundImage: 'url("/images/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl mr-2">🏰</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-center">
          Magical Theme Park Getaway <br />
            <span className="text-purple-300">Rentals in Orlando</span>
          </h1>
          <span className="text-3xl ml-2">🏰</span>
        </div>
        <p className="text-xl md:text-2xl max-w-2xl leading-relaxed mb-8 text-center mx-auto">
        Experience the magic of Orlando from your home away from home. 
        Minutes from world-famous theme parks, perfect for families.
        </p>
        <button 
          onClick={() => {
            document.getElementById('property-1').scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-xl transition duration-300 transform hover:scale-105 w-fit mx-auto flex items-center"
        >
          <span className="mr-2">✨</span>
          Find Your Magical Stay
          <span className="ml-2">✨</span>
        </button>
      </div>
    </div>
  );
};