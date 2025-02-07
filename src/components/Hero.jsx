// components/Hero.jsx
export const Hero = () => {
  return (
    <div 
      className="relative h-[600px] text-white overflow-hidden"
      style={{
        backgroundImage: 'url("/images/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Top Dog-Friendly <br />
          <span className="text-blue-300">Vacation Rentals in Destin</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl leading-relaxed mb-8">
          Discover perfect beachfront properties where your pets are welcome. 
          Create unforgettable memories with your furry friends.
        </p>
        <button 
          onClick={() => {
            document.getElementById('property-1').scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 w-fit"
        >
          Find Your Perfect Stay
        </button>
      </div>
    </div>
  );
};