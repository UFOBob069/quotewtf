import { faqs, areaInfo } from '../data/faqs';

export const FAQ = ({ faqs, areaInfo }) => {
  return (
    <div className="bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Area Information Section */}
        <div className="mb-12 bg-white rounded-xl shadow-lg p-8 border-2 border-blue-100">
          <h2 className="text-3xl font-bold mb-4 text-blue-600 flex items-center">
            <span className="mr-2">🏰</span>
            {areaInfo.title}
          </h2>
          <div 
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: areaInfo.content }}
          />
        </div>

        {/* FAQ Section */}
        <h2 className="text-3xl font-bold mb-8 text-blue-600 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100 hover:border-purple-200 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-3 text-blue-600 flex items-center">
                <span className="text-purple-500 mr-2">✨</span>
                {faq.question}
              </h3>
              <div className="text-gray-700 space-y-2">
                {faq.answer.split('\n').map((paragraph, i) => (
                  <p key={i} className="leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};