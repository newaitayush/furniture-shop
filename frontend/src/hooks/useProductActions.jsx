// src/hooks/useProductActions.js
import { useState, useCallback } from 'react';

export const useProductActions = (navigate) => {
  const [compareList, setCompareList] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Compare functionality
  const handleCompare = useCallback((product) => {
    if (compareList.find(item => item._id === product._id)) {
      setCompareList(prev => prev.filter(item => item._id !== product._id));
    } else if (compareList.length >= 3) {
      // Could show notification here if needed
      return;
    } else {
      setCompareList(prev => [...prev, product]);
    }
  }, [compareList]);

  // Like/Wishlist functionality
  const handleLike = useCallback((product) => {
    if (wishlist.find(item => item._id === product._id)) {
      setWishlist(prev => prev.filter(item => item._id !== product._id));
    } else {
      setWishlist(prev => [...prev, product]);
    }
  }, [wishlist]);

  // Share functionality
  const handleShare = useCallback(async (product) => {
    const shareData = {
      title: product.name,
      text: `Check out this amazing ${product.description}`,
      url: `${window.location.origin}/product/${product._id}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }, []);

  // Navigate to comparison page
  const goToComparison = useCallback(() => {
    if (compareList.length === 0) {
      return;
    }
    navigate('/comparison', { state: { products: compareList } });
  }, [compareList, navigate]);

  return {
    compareList,
    setCompareList,
    wishlist,
    handleCompare,
    handleLike,
    handleShare,
    goToComparison
  };
};