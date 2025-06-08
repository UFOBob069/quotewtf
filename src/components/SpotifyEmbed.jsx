export default function SpotifyEmbed() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Latest Episode
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="relative w-full" style={{ paddingBottom: '232px' }}>
              <iframe
                src="https://open.spotify.com/embed/show/1bLT9urrmt04DlDp37pblf?utm_source=generator&theme=0"
                width="100%"
                height="232"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="absolute inset-0 rounded-xl"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 