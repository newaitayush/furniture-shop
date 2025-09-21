import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      
      {/* Full Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/images/banner.jpg"
          alt="Modern furniture setup with wicker chair, plant, white cabinet and colorful rug"
          className="w-full h-full object-cover object-center"
        />
        {/* 
        To use your own image, save it in public/images/ folder and update src:
        src="/images/hero-banner.jpg"
        */}
      </div>

      {/* Content Card */}
      <div className="absolute right-4 lg:right-16 top-1/2 transform -translate-y-1/2 z-20">
        <div className="bg-orange-50 p-8 lg:p-12 rounded-lg shadow-xl max-w-sm lg:max-w-md">
          
          {/* New Arrival Label */}
          <div className="mb-4">
            <span className="text-sm font-semibold text-gray-700 tracking-[0.2em] uppercase">
              New Arrival
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl lg:text-5xl font-bold text-yellow-700 leading-[1.1] mb-6">
            Discover Our New Collection
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut 
            elit tellus, luctus nec ullamcorper mattis.
          </p>

          {/* Buy Now Button */}
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-8 lg:px-12 py-3 lg:py-4 uppercase tracking-wide transition-all duration-300 hover:scale-105 shadow-lg">
            BUY NOW
          </button>
        </div>
      </div>

      {/* Bottom Right Decorative Element */}
      <div className="absolute bottom-16 right-16 hidden lg:block">
        <div className="w-32 h-16 bg-yellow-600 rounded-full opacity-70 transform rotate-12"></div>
      </div>

      {/* Mobile Overlay */}
      <div className="lg:hidden absolute inset-0 bg-gradient-to-r from-transparent to-black/30 z-10"></div>

      {/* Mobile Content */}
      <div className="lg:hidden absolute bottom-8 left-4 right-4 z-30">
        <div className="bg-orange-50 p-6 rounded-lg shadow-xl">
          <div className="mb-3">
            <span className="text-xs font-semibold text-gray-700 tracking-wider uppercase">
              New Arrival
            </span>
          </div>
          <h1 className="text-2xl font-bold text-yellow-700 leading-tight mb-4">
            Discover Our<br />New Collection
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-8 py-3 uppercase text-sm tracking-wide">
            BUY NOW
          </button>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;