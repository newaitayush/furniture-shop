import React, { createContext, useContext, useReducer } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  console.log('Wishlist reducer called:', action.type, action.payload); // Debug log
  switch (action.type) {
    case 'TOGGLE_WISHLIST':
      const exists = state.find(item => item._id === action.payload._id);
      if (exists) {
        const newState = state.filter(item => item._id !== action.payload._id);
        console.log('Removed from wishlist:', action.payload.name, 'New state:', newState);
        return newState;
      } else {
        const newState = [...state, action.payload];
        console.log('Added to wishlist:', action.payload.name, 'New state:', newState);
        return newState;
      }
    case 'CLEAR_WISHLIST':
      console.log('Clearing wishlist');
      return [];
    default:
      return state;
  }
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);

  const toggleWishlist = (product) => {
    console.log('toggleWishlist called with:', product); // Debug log
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  console.log('WishlistProvider rendering, current wishlist:', wishlist); // Debug log

  return (
    <WishlistContext.Provider value={{
      wishlist,
      toggleWishlist,
      clearWishlist,
      isInWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};