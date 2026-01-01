import { useEffect, useState } from 'react';
import { useRouter } from '../hooks/useRouter';
import { supabase, Brand } from '../lib/supabase';

export default function BrandIdentity() {
  const { navigate } = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrands();
  }, []);

  async function loadBrands() {
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('order_index');

      if (error) throw error;
      if (data) setBrands(data);
    } catch (error) {
      console.error('Error loading brands:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <h1 className="text-6xl md:text-8xl font-extralight tracking-tight mb-6">
            Brand Identity
          </h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Complete visual systems that define brands, communicate values,
            and create lasting market impressions.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square bg-white/5 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : brands.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">No brands to display yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => navigate(`/brand/${brand.slug}`)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all duration-500"
                style={{
                  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                  transformStyle: 'preserve-3d',
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 20;
                  const rotateY = (centerX - x) / 20;
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ transform: 'translateZ(50px)' }}
                />

                <div className="absolute inset-0 flex items-center justify-center p-8">
                  {brand.logo_url ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={brand.logo_url}
                        alt={brand.name}
                        className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                        style={{ transform: 'translateZ(30px)' }}
                      />
                    </div>
                  ) : (
                    <span className="text-4xl font-light">{brand.name}</span>
                  )}
                </div>

                <div className="absolute inset-x-6 bottom-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-lg font-medium mb-1">{brand.name}</h3>
                  <p className="text-sm text-white/60 line-clamp-2">{brand.tagline}</p>
                </div>

                <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-blue-500/0 group-hover:shadow-blue-500/20 transition-all duration-500" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
