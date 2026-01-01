import { RouterProvider, Routes, Route } from './hooks/useRouter';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BrandIdentity from './pages/BrandIdentity';
import BrandCase from './pages/BrandCase';
import Posters from './pages/Posters';
import Video from './pages/Video';
import About from './pages/About';

function App() {
  return (
    <RouterProvider>
      <div className="min-h-screen bg-black">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brand-identity" element={<BrandIdentity />} />
          <Route path="/brand/:slug" element={<BrandCase />} />
          <Route path="/posters" element={<Posters />} />
          <Route path="/video" element={<Video />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </RouterProvider>
  );
}

export default App;
