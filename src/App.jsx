import React from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BlogListingPage } from './pages/BlogListingPage';
import { MobileStickyBar } from './components/layout/MobileStickyBar';

export default function App() {
  return (
    <div className="app-root bg-[#FAFAFA] min-h-screen text-[#111f43] flex flex-col relative">
      <Header />
      <BlogListingPage />
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
