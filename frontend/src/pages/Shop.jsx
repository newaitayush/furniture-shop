// src/pages/Shop.jsx - Optimized Version
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Filter, Grid, List, ChevronRight, Plus } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import FilterPanel from "../components/FilterPanel"; // Removed .jsx
import CompareBar from "../components/CompareBar"; // Added this line
import ProductModals from "../components/ProductModal"; // Removed .jsx
import { SAMPLE_PRODUCTS } from "../data/sampleProducts";
import { useProductFilters, usePagination, useProductActions } from "../hooks";
import { useWishlist } from "../context/WishlistContext";



const Shop = () => {
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // View states
  const [viewMode, setViewMode] = useState("grid");
  const [showFilter, setShowFilter] = useState(false);
  const [notification, setNotification] = useState("");

  // Modal states
  const [modals, setModals] = useState({
    add: false,
    update: false,
    delete: false,
    selectedProduct: null,
  });

  // Custom hooks for complex logic
  const {
    filters,
    handleFilterChange,
    clearFilters,
    filteredProducts,
    sortBy,
    setSortBy,
    availableFilters,
  } = useProductFilters(SAMPLE_PRODUCTS, searchParams);

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    paginatedData,
    renderPaginationButtons,
  } = usePagination(filteredProducts);

  const {
    compareList,
    setCompareList,
    wishlist,
    handleCompare,
    handleLike,
    handleShare,
    goToComparison,
  } = useProductActions(navigate);

  // Notification system
  const showNotification = useCallback((message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  }, []);

  // Modal handlers
  const openModal = useCallback(
    (type, product = null) => {
      setModals({ ...modals, [type]: true, selectedProduct: product });
    },
    [modals]
  );

  const closeModal = useCallback(
    (type) => {
      setModals({ ...modals, [type]: false, selectedProduct: null });
    },
    [modals]
  );

  // CRUD handlers
  const handleAddToCart = useCallback(
    (product) => {
      addToCart(product, 1);
      showNotification(`${product.name} added to cart`);
    },
    [addToCart, showNotification]
  );

  const handleEditProduct = useCallback(
    (product) => openModal("update", product),
    [openModal]
  );
  const handleDeleteProduct = useCallback(
    (product) => openModal("delete", product),
    [openModal]
  );

  // Product CRUD operations (simplified for demo)
  const productActions = {
    create: (product) =>
      showNotification(`${product.name} would be added (backend needed)`),
    update: (product) =>
      showNotification(`${product.name} would be updated (backend needed)`),
    delete: (product) =>
      showNotification(`${product.name} would be deleted (backend needed)`),
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          {notification}
        </div>
      )}

      {/* Compare Bar */}
      <CompareBar
        compareList={compareList}
        onCompare={handleCompare}
        onClear={() => setCompareList([])}
        onGoToComparison={goToComparison}
      />

      {/* Hero Section */}
      <section
        className="relative h-80 bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/shop-bar.jpg")' }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <img src="/images/logo.png" alt="Furniro" className="w-20 h-8 mb-4" />
          <h1 className="text-5xl font-medium mb-2 text-black">Shop</h1>
          <nav className="flex items-center space-x-2 text-base font-medium">
            <Link to="/" className="text-black hover:text-yellow-600">
              Home
            </Link>
            <ChevronRight className="w-5 h-5 text-black" />
            <span className="text-black">Shop</span>
          </nav>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="bg-orange-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            {/* Left Side */}
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center space-x-3 text-black hover:text-gray-700 transition-colors"
              >
                <Filter className="w-6 h-6" />
                <span className="text-xl">Filter</span>
                {Object.values(filters).some((f) => f) && (
                  <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
              </button>

              <div className="flex items-center space-x-6">
                {[
                  { mode: "grid", icon: Grid },
                  { mode: "list", icon: List },
                ].map(({ mode, icon: Icon }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-2 rounded ${
                      viewMode === mode ? "bg-gray-200" : "hover:bg-gray-100"
                    } transition-colors`}
                  >
                    <Icon className="w-7 h-7" />
                  </button>
                ))}
              </div>

              <div className="h-9 w-px bg-gray-400"></div>
              <span className="text-black text-base">
                Showing {paginatedData.startIndex}–{paginatedData.endIndex} of{" "}
                {paginatedData.totalProducts} results
              </span>
            </div>

            {/* Center - Add Product Button */}
            {isAdmin && (
              <div className="flex items-center">
                <button
                  onClick={() => openModal("add")}
                  className="text-yellow-600 hover:text-yellow-700 transition-colors text-base font-medium"
                  title="Add New Product"
                >
                  Add Product
                </button>
              </div>
            )}

            {/* Right Side */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <span className="text-black text-xl">Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border-0 bg-white text-gray-500 rounded px-4 py-3 text-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 w-16"
                >
                  {[8, 16, 24, 32].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-black text-xl">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-0 bg-white text-gray-500 rounded px-4 py-3 text-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 min-w-40"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price_low_high">Price: Low to High</option>
                  <option value="price_high_low">Price: High to Low</option>
                  <option value="name_az">Name: A to Z</option>
                  <option value="name_za">Name: Z to A</option>
                  <option value="rating_high_low">Highest Rated</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <FilterPanel
            showFilter={showFilter}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            availableFilters={availableFilters}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {paginatedData.products.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-xl text-gray-600 mb-4">
                No products found matching your filters.
              </div>
              {Object.values(filters).some((f) => f) && (
                <button
                  onClick={clearFilters}
                  className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div
            className={`grid gap-8 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 lg:grid-cols-2 gap-6"
            }`}
          >
            {paginatedData.products.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="block"
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onShare={handleShare}
                  onCompare={handleCompare}
                  onLike={handleLike}
                  isInCompareList={
                    !!compareList.find((item) => item._id === product._id)
                  }
                  isInWishlist={wishlist.some(
                    (item) => item._id === product._id
                  )}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {paginatedData.totalPages > 1 && (
          <div className="flex justify-center items-center flex-wrap gap-2 mt-16">
            {renderPaginationButtons()}
          </div>
        )}

        {/* Results Summary */}
        {paginatedData.totalProducts > 0 && (
          <div className="text-center mt-8 text-gray-600">
            <p>
              Page {currentPage} of {paginatedData.totalPages}
            </p>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
            {[
              { title: "High Quality", desc: "crafted from top materials" },
              { title: "Warranty Protection", desc: "Over 2 years" },
              { title: "Free Shipping", desc: "Order over 150 $" },
              { title: "24 / 7 Support", desc: "Dedicated support" },
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-16 h-16 flex-shrink-0">
                  <svg
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <path
                      d="M30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5ZM42.5 25L27.5 40L17.5 30"
                      stroke="#B88E2F"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-2xl text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-xl">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProductModals
        modals={modals}
        onClose={closeModal}
        onSubmit={productActions}
      />

      <Footer />

      {/* CSS */}
      <style>{`
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Shop;  