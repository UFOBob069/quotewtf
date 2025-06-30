import { ThumbsUp, ShieldCheck, Users, Zap } from 'lucide-react';

const testimonials = [
  {
    quote: "QuoteWTF saved me $2,000 and called out the contractor's BS in seconds. Hilarious and brutally honest!",
    name: "Sarah P.",
    location: "Dallas, TX"
  },
  {
    quote: "I sent the QuoteWTF report to my contractor and he dropped his price by 15%. Worth every second.",
    name: "Mike L.",
    location: "Chicago, IL"
  },
  {
    quote: "Finally, a tool that tells it like it is. No sugarcoating, just facts and laughs.",
    name: "Priya S.",
    location: "Los Angeles, CA"
  }
];

const trustSignals = [
  {
    icon: <Users className="w-7 h-7 text-orange-500" />, 
    label: "Trusted by 1,000+ homeowners"
  },
  {
    icon: <Zap className="w-7 h-7 text-orange-500" />, 
    label: "Powered by GPT-4 AI"
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-orange-500" />, 
    label: "Secure & private file uploads"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-orange-50 border-t border-orange-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Homeowners Love QuoteWTF</h2>
          <p className="text-lg text-gray-600">Real feedback. Real savings. Real talk.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center border border-orange-100">
              <div className="text-orange-600 text-3xl mb-4">"</div>
              <blockquote className="text-gray-800 text-lg italic mb-6">{t.quote}</blockquote>
              <div className="font-bold text-gray-900">{t.name}</div>
              <div className="text-gray-500 text-sm">{t.location}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {trustSignals.map((signal, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-6 py-4 shadow border border-orange-100">
              {signal.icon}
              <span className="font-semibold text-gray-800">{signal.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 