import { useEffect, useState } from 'react';
import { useRouter } from '../hooks/useRouter';
import { ArrowRight } from 'lucide-react';
import { supabase, Brand, Poster, Video } from '../lib/supabase';

export default function Home() {
  const { navigate } = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [posters, setPosters] = useState<Poster[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    try {
      const [brandsRes, postersRes, videosRes] = await Promise.all([
        supabase.from('brands').select('*').order('order_index').limit(6),
        supabase.from('posters').select('*').order('order_index').limit(6),
        supabase.from('videos').select('*').order('order_index').limit(4),
      ]);

      if (brandsRes.data) setBrands(brandsRes.data);
      if (postersRes.data) setPosters(postersRes.data);
      if (videosRes.data) setVideos(videosRes.data);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-black" />

        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div
            className="mb-8 opacity-0 animate-fadeIn"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <h1 className="text-7xl md:text-9xl font-extralight tracking-tighter mb-6 leading-none">
              GRAPHIC
              <br />
              GREEDY
            </h1>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white to-transparent mb-8" />
          </div>

          <p
            className="text-xl md:text-2xl font-light text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fadeIn"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            Where visual excellence meets conversion-focused strategy.
            <br />
            Creating brands that look premium, communicate clearly,
            <br />
            and perform commercially.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fadeIn"
            style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
          >
            <button
              onClick={() => navigate('/brand-identity')}
              className="group px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              View Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/about')}
              className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-all hover:scale-105"
            >
              About Us
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-5xl md:text-6xl font-extralight tracking-tight mb-4">
              Featured Work
            </h2>
            <p className="text-white/60 text-lg">
              Selected projects that define excellence
            </p>
          </div>
          <button
            onClick={() => navigate('/brand-identity')}
            className="hidden md:flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <button
                key={brand.id}
                onClick={() => navigate(`/brand/${brand.slug}`)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
                style={{
                  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                  transition: 'all 0.5s ease',
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
                  e.currentTarget.style.transform =
                    'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  {brand.logo_url ? (
                    <img
                      src={brand.logo_url}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <span className="text-3xl font-light">{brand.name}</span>
                  )}
                </div>
                <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-sm text-white/60">{brand.tagline}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="py-32 px-6 lg:px-12 bg-gradient-to-b from-black to-neutral-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-extralight tracking-tight mb-12">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mt-20">
            {[
              {
                title: 'Brand Identity',
                description:
                  'Complete visual systems that communicate your brand essence and create lasting impressions.',
              },
              {
                title: 'Performance Marketing',
                description:
                  'Strategic design focused on conversion, engagement, and measurable commercial results.',
              },
              {
                title: 'Visual Communication',
                description:
                  'Posters, campaigns, and designs that capture attention and deliver your message effectively.',
              },
              {
                title: 'Motion & Video',
                description:
                  'Dynamic content that brings your brand to life through cinematic storytelling.',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500"
              >
                <h3 className="text-2xl font-light mb-4">{service.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
