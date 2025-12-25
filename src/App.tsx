import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import BusinessCard from './components/home/BusinessCard';
import Footer from './components/layout/Footer';
import ResumePage from './pages/Resume';
import BlogPage from './pages/Blog';
import BlogOpenPage from './pages/BlogOpenPage';
import LinksPage from './pages/Links';

function HomePage() {
  return (
    <>
      <BusinessCard />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white selection:bg-blue-500/30">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/blog/open" element={<BlogOpenPage />} />
          <Route path="/links" element={<LinksPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
