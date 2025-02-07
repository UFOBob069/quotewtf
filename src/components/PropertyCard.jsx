export const PropertyCard = ({ property }) => {
    const { 
      id,
      title, 
      shortDescription, 
      price, 
      amenities, 
      images, 
      vrboLink 
    } = property;
  
    const handleClick = () => {
      document.getElementById(`property-${id}`).scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    };
  
    return (
      <div 
        onClick={handleClick}
        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
      >
        <img 
          src={images[0].url} 
          alt={images[0].alt} 
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{shortDescription}</p>
          <p className="text-xl font-bold text-blue-900 mb-4">{price}</p>
          
          <h3 className="font-semibold mb-2">Amenities:</h3>
          <ul className="mb-4">
            {amenities.slice(0, 4).map((amenity, index) => (
              <li key={index} className="flex items-center mb-1">
                <span className="text-green-500 mr-2">✓</span>
                {amenity}
              </li>
            ))}
          </ul>
          
          <a 
            href={vrboLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
          >
            Check Availability
          </a>
        </div>
      </div>
    );
  };