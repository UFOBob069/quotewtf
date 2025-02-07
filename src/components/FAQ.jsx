import { faqs, areaInfo } from '../data/faqs';

export const FAQ = ({ faqs, areaInfo }) => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Area Information Section */}
        <div className="mb-12 bg-white rounded-lg shadow p-8">
          <h2 className="text-3xl font-bold mb-4">{areaInfo.title}</h2>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: areaInfo.content }}
          />
        </div>

        {/* FAQ Section */}
        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};