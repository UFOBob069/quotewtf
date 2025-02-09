// pages/index.jsx
import { Hero } from '../components/Hero';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyDetails } from '../components/PropertyDetails';
import { FAQ } from '../components/FAQ';
import { properties } from '../data/properties';
import { faqs, areaInfo } from '../data/faqs';
import { IntroSection } from '../components/IntroSection';

export default function Home() {
  return (
    <div>
      <Hero />
      <IntroSection />
      <main className="container mx-auto px-4 py-8">
        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Detailed Property Sections */}
        {properties.map(property => (
          <PropertyDetails key={property.id} property={property} />
        ))}

        {/* FAQ Section */}
        <FAQ faqs={faqs} areaInfo={areaInfo} />
      </main>
    </div>
  );
}