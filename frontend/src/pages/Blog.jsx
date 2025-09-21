import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Calendar, User, Tag } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "Going all-in with millennial design",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "/images/blog-1.jpg",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Wood",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Exploring new ways of decorating",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "/images/blog-2.jpg",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Handmade",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Handmade pieces that took time to make",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "/images/blog-3.jpg",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Wood",
      readTime: "12 min read"
    }
  ];

  // Sample categories and recent posts
  const categories = [
    { name: "Crafts", count: 2 },
    { name: "Design", count: 8 },
    { name: "Handmade", count: 7 },
    { name: "Interior", count: 1 },
    { name: "Wood", count: 6 }
  ];

  const recentPosts = [
    {
      id: 1,
      title: "Going all-in with millennial design",
      date: "03 Aug 2022",
      image: "/images/recent-1.jpg"
    },
    {
      id: 2,
      title: "Exploring new ways of decorating",
      date: "03 Aug 2022",
      image: "/images/recent-2.jpg"
    },
    {
      id: 3,
      title: "Handmade pieces that took time to make",
      date: "03 Aug 2022",
      image: "/images/recent-3.jpg"
    },
    {
      id: 4,
      title: "Modern home in Milan",
      date: "03 Aug 2022",
      image: "/images/recent-4.jpg"
    },
    {
      id: 5,
      title: "Colorful office redesign",
      date: "03 Aug 2022",
      image: "/images/recent-5.jpg"
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  const renderPaginationButtons = () => {
    const totalPages = 3;
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button 
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 rounded transition-colors ${
            currentPage === i 
              ? 'bg-yellow-600 text-white' 
              : 'bg-orange-50 text-black hover:bg-orange-200'
          }`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button 
          key="next"
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-orange-50 text-black px-4 py-2 rounded hover:bg-orange-200 transition-colors"
        >
          Next
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/shop-bar.jpg")'
        }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <img src="/images/logo.png" alt="Furniro" className="w-20 h-8 mb-4" />
          <h1 className="text-5xl font-medium mb-2 text-black">Blog</h1>
          <nav className="flex items-center space-x-2 text-base font-medium">
            <Link to="/" className="text-black hover:text-yellow-600">Home</Link>
            <ChevronRight className="w-5 h-5 text-black" />
            <span className="text-black">Blog</span>
          </nav>
        </div>
      </section>

      {/* Blog Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Blog Posts */}
          <div className="lg:col-span-3">
            <div className="space-y-12">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white">
                  {/* Post Image */}
                  <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-6">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/820x400/f3f3f3/999999?text=${encodeURIComponent(post.title)}`;
                      }}
                    />
                  </div>

                  {/* Post Meta */}
                  <div className="flex items-center space-x-6 text-gray-500 text-sm mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4" />
                      <span>{post.category}</span>
                    </div>
                  </div>

                  {/* Post Title */}
                  <h2 className="text-3xl font-medium text-gray-900 mb-4">
                    {post.title}
                  </h2>

                  {/* Post Excerpt */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-black font-medium border-b border-black hover:text-yellow-600 hover:border-yellow-600 transition-colors inline-block"
                  >
                    Read more
                  </Link>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-4 mt-16">
              {renderPaginationButtons()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              
              {/* Search Box */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </form>
              </div>

              {/* Categories */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Categories</h3>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <Link
                        to={`/blog/category/${category.name.toLowerCase()}`}
                        className="text-gray-600 hover:text-yellow-600 transition-colors"
                      >
                        {category.name}
                      </Link>
                      <span className="text-gray-400 text-sm">{category.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Posts</h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex items-start space-x-3">
                      <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/64x64/f3f3f3/999999?text=Blog`;
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <Link
                          to={`/blog/${post.id}`}
                          className="text-gray-900 hover:text-yellow-600 transition-colors block text-sm font-medium leading-tight mb-1"
                        >
                          {post.title}
                        </Link>
                        <span className="text-gray-500 text-xs">{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5ZM42.5 25L27.5 40L17.5 30" stroke="#B88E2F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-2xl text-gray-800 mb-2">High Quality</h3>
                <p className="text-gray-500 text-xl">crafted from top materials</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5ZM42.5 25L27.5 40L17.5 30" stroke="#B88E2F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-2xl text-gray-800 mb-2">Warranty Protection</h3>
                <p className="text-gray-500 text-xl">Over 2 years</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M7.5 15H12.5L15 25H45L50 15H55M15 25L12.5 35H47.5L45 25M15 25V35M45 25V35" stroke="#B88E2F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-2xl text-gray-800 mb-2">Free Shipping</h3>
                <p className="text-gray-500 text-xl">Order over 150 $</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M30 7.5C17.574 7.5 7.5 17.574 7.5 30C7.5 42.426 17.574 52.5 30 52.5C42.426 52.5 52.5 42.426 52.5 30C52.5 17.574 42.426 7.5 30 7.5ZM30 17.5C31.3807 17.5 32.5 18.6193 32.5 20C32.5 21.3807 31.3807 22.5 30 22.5C28.6193 22.5 27.5 21.3807 27.5 20C27.5 18.6193 28.6193 17.5 30 17.5ZM32.5 40H27.5V27.5H32.5V40Z" fill="#B88E2F"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-2xl text-gray-800 mb-2">24 / 7 Support</h3>
                <p className="text-gray-500 text-xl">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;