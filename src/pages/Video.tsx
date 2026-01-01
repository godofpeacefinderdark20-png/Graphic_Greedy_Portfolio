import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { supabase, Video as VideoType } from '../lib/supabase';

export default function Video() {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('order_index');

      if (error) throw error;
      if (data) setVideos(data);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <h1 className="text-6xl md:text-8xl font-extralight tracking-tight mb-6">
            Video
          </h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Motion storytelling that brings brands to life. Cinematic content
            designed for impact and engagement.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-video bg-white/5 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">No videos to display yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500"
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
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                  </div>
                </div>

                <div className="absolute inset-x-6 bottom-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-lg font-medium mb-2">{video.title}</h3>
                  {video.description && (
                    <p className="text-sm text-white/60 line-clamp-2">{video.description}</p>
                  )}
                </div>

                <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-blue-500/0 group-hover:shadow-blue-500/20 transition-all duration-500" />
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-6"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative max-w-6xl w-full">
            <div className="aspect-video rounded-2xl overflow-hidden bg-black">
              <video
                src={selectedVideo.video_url}
                controls
                autoPlay
                className="w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                Your browser does not support video playback.
              </video>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-light mb-2">{selectedVideo.title}</h3>
              {selectedVideo.description && (
                <p className="text-white/60">{selectedVideo.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
