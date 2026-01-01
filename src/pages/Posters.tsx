import { useEffect, useState } from 'react';
import { supabase, Poster } from '../lib/supabase';

export default function Posters() {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);

  useEffect(() => {
    loadPosters();
  }, []);

  async function loadPosters() {
    try {
      const { data, error } = await supabase
        .from('posters')
        .select('*')
        .order('order_index');

      if (error) throw error;
      if (data) setPosters(data);
    } catch (error) {
      console.error('Error loading posters:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <h1 className="text-6xl md:text-8xl font-extralight tracking-tight mb-6">
            Posters
          </h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Visual communication through powerful design. Each poster crafted
            to capture attention and deliver impact.
          </p>
        </div>

        {loading ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="break-inside-avoid bg-white/5 rounded-2xl aspect-[3/4] animate-pulse"
              />
            ))}
          </div>
        ) : posters.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">No posters to display yet.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {posters.map((poster) => (
              <button
                key={poster.id}
                onClick={() => setSelectedPoster(poster)}
                className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 w-full"
                style={{
                  transform: 'perspective(1000px) translateZ(0)',
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 30;
                  const rotateY = (centerX - x) / 30;
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <img
                  src={poster.image_url}
                  alt={poster.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-lg font-medium mb-2">{poster.title}</h3>
                  {poster.description && (
                    <p className="text-sm text-white/60">{poster.description}</p>
                  )}
                </div>

                <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-purple-500/0 group-hover:shadow-purple-500/20 transition-all duration-500" />
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedPoster && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-6"
          onClick={() => setSelectedPoster(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <img
              src={selectedPoster.image_url}
              alt={selectedPoster.title}
              className="w-full h-full object-contain rounded-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 rounded-b-2xl">
              <h3 className="text-2xl font-light mb-2">{selectedPoster.title}</h3>
              {selectedPoster.description && (
                <p className="text-white/60">{selectedPoster.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
