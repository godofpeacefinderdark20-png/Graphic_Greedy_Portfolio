import { useEffect, useState } from 'react';
import { useRouter } from '../hooks/useRouter';
import { ArrowLeft } from 'lucide-react';
import { supabase, Brand } from '../lib/supabase';

export default function BrandCase() {
  const { currentPath, navigate } = useRouter();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  const slug = currentPath.split('/brand/')[1];

  useEffect(() => {
    if (slug) {
      loadBrand();
    }
  }, [slug]);

  async function loadBrand() {
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      setBrand(data);
    } catch (error) {
      console.error('Error loading brand:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Brand Not Found</h1>
          <button
            onClick={() => navigate('/brand-identity')}
            className="text-white/60 hover:text-white transition-colors"
          >
            Back to Brand Identity
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <button
            onClick={() => navigate('/brand-identity')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Brand Identity
          </button>

          <section className="mb-32">
            <div className="relative h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              {brand.logo_url ? (
                <img
                  src={brand.logo_url}
                  alt={brand.name}
                  className="relative z-10 max-w-md max-h-64 object-contain filter brightness-0 invert opacity-90"
                />
              ) : (
                <h1 className="relative z-10 text-7xl font-light">{brand.name}</h1>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h1 className="text-5xl md:text-6xl font-extralight tracking-tight mb-6">
                  {brand.name}
                </h1>
                <p className="text-2xl text-white/60 mb-8">{brand.tagline}</p>
              </div>
              <div>
                <p className="text-lg text-white/70 leading-relaxed">
                  {brand.description}
                </p>
              </div>
            </div>
          </section>

          {brand.story && (
            <section className="mb-32">
              <h2 className="text-3xl font-light mb-8">Brand Story</h2>
              <div className="bg-white/5 rounded-3xl p-12 border border-white/10">
                <p className="text-lg text-white/70 leading-relaxed whitespace-pre-line">
                  {brand.story}
                </p>
              </div>
            </section>
          )}

          {brand.colors && Array.isArray(brand.colors) && brand.colors.length > 0 && (
            <section className="mb-32">
              <h2 className="text-3xl font-light mb-8">Color Palette</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {brand.colors.map((color, index) => (
                  <div key={index} className="group">
                    <div
                      className="aspect-square rounded-2xl mb-4 border border-white/10 hover:scale-105 transition-transform duration-300"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-sm text-white/60 font-mono uppercase text-center">
                      {color}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {brand.typography && Object.keys(brand.typography).length > 0 && (
            <section className="mb-32">
              <h2 className="text-3xl font-light mb-8">Typography</h2>
              <div className="space-y-8">
                {brand.typography.primary && (
                  <div className="bg-white/5 rounded-3xl p-12 border border-white/10">
                    <p className="text-sm text-white/40 mb-4">Primary Font</p>
                    <p className="text-4xl font-light">{brand.typography.primary}</p>
                  </div>
                )}
                {brand.typography.secondary && (
                  <div className="bg-white/5 rounded-3xl p-12 border border-white/10">
                    <p className="text-sm text-white/40 mb-4">Secondary Font</p>
                    <p className="text-4xl font-light">{brand.typography.secondary}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {brand.mockup_images && Array.isArray(brand.mockup_images) && brand.mockup_images.length > 0 && (
            <section className="mb-32">
              <h2 className="text-3xl font-light mb-8">Applications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {brand.mockup_images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 group"
                  >
                    <img
                      src={image}
                      alt={`${brand.name} mockup ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
