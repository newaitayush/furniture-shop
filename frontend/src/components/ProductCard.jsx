// src/components/ProductCard.jsx
import React, { useState, useCallback } from "react";
import { Share, Heart, Edit2, Trash2 } from "lucide-react";

const ProductCard = React.memo(
  ({
    product,
    onAddToCart,
    onShare,
    onCompare,
    onLike,
    isInCompareList,
    isInWishlist,
    onEdit,
    onDelete,
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    const formatPrice = (price) => {
      return `Rp ${price.toLocaleString("id-ID")}`;
    };

    const handleAddToCart = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onAddToCart(product);
      },
      [product, onAddToCart]
    );

    const handleShare = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onShare(product);
      },
      [product, onShare]
    );

    const handleCompare = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onCompare(product);
      },
      [product, onCompare]
    );

    const handleLike = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onLike(product);
      },
      [product, onLike]
    );

    const handleEdit = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onEdit(product);
      },
      [product, onEdit]
    );

    const handleDelete = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete(product);
      },
      [product, onDelete]
    );

    return (
      <div
        className="bg-gray-100 relative group overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/285x301/f3f3f3/999999?text=${encodeURIComponent(
                product.name
              )}`;
            }}
          />

          {/* Badges */}
          <div className="absolute top-6 right-6 flex flex-col gap-2">
            {product.discount && (
              <span className="bg-red-500 text-white text-sm font-medium px-2 py-1 rounded-full w-12 h-12 flex items-center justify-center">
                {product.discount}
              </span>
            )}
            {product.isNew && (
              <span className="bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-full w-12 h-12 flex items-center justify-center">
                New
              </span>
            )}
          </div>

          {/* Admin Actions - Top Left */}
          {isHovered && (
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <button
                onClick={handleEdit}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                title="Edit Product"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg"
                title="Delete Product"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Hover Overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
              <div className="text-center space-y-6">
                <button
                  onClick={handleAddToCart}
                  className="bg-white text-yellow-600 font-semibold px-12 py-3 hover:bg-yellow-600 hover:text-white transition-colors duration-300"
                >
                  Add to cart
                </button>
                <div className="flex items-center justify-center space-x-5 text-white">
                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-1 hover:text-yellow-400 transition-colors"
                    title="Share Product"
                  >
                    <Share className="w-4 h-4" />
                    <span className="text-base font-medium">Share</span>
                  </button>
                  <button
                    onClick={handleCompare}
                    className={`flex items-center space-x-1 transition-colors ${
                      isInCompareList
                        ? "text-yellow-400"
                        : "hover:text-yellow-400"
                    }`}
                    title={
                      isInCompareList
                        ? "Remove from comparison"
                        : "Add to comparison"
                    }
                  >
                    <Heart className="w-4 h-4" />
                    <span className="text-base font-medium">Compare</span>
                  </button>
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-1 transition-colors ${
                      isInWishlist ? "text-red-400" : "hover:text-yellow-400"
                    }`}
                    title={
                      isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                    }
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInWishlist ? "fill-current" : ""
                      }`}
                    />
                    <span className="text-base font-medium">Like</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 bg-gray-100">
          <h3 className="font-semibold text-2xl text-gray-800 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-500 text-base mb-4">{product.description}</p>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-xl text-gray-800">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-base">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
            <div className="mt-2 text-sm text-gray-500">
              Stock: {product.stock || 0} | Brand: {product.brand}
            </div>
          
        </div>
      </div>
    );
  }
);

export default ProductCard;
