import React from 'react';
import Navbar from '../components/navbar';
import HeroSection from '../components/herosection';
import BrowseRange from '../components/BrowseRange';
import ProductsSection from '../components/ProductsSection';
import Inspiration from '../components/Inspiration';
import SocialSection from '../components/SocialSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <BrowseRange />
        <ProductsSection />
        <Inspiration />
        <SocialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;