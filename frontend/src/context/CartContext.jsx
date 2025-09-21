import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart Context
const CartContext = createContext();

// Cart Actions
const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART:
      const existingItemIndex = state.items.findIndex(
        item => item._id === action.payload.product._id && 
                item.selectedSize === action.payload.product.selectedSize &&
                item.selectedColor === action.payload.product.selectedColor
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return { ...state, items: updatedItems };
      } else {
        // Add new item
        const newItem = {
          ...action.payload.product,
          quantity: action.payload.quantity,
          addedAt: new Date().toISOString()
        };
        return { ...state, items: [...state.items, newItem] };
      }

    case CART_ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => {
          const itemId = item._id || item.id;
          return itemId !== action.payload.itemId;
        })
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item => {
          const itemId = item._id || item.id;
          return itemId === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item;
        })
      };

    case CART_ACTIONS.CLEAR_CART:
      return { ...state, items: [] };

    case CART_ACTIONS.LOAD_CART:
      return { ...state, items: action.payload.items || [] };

    default:
      return state;
  }
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ 
          type: CART_ACTIONS.LOAD_CART, 
          payload: { items: parsedCart } 
        });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(state.items));
  }, [state.items]);

  // Cart Actions
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: { product, quantity }
    });
  };

  const removeFromCart = (itemId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: { itemId }
    });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      dispatch({
        type: CART_ACTIONS.UPDATE_QUANTITY,
        payload: { itemId, quantity }
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Cart Calculations
  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getItemCount = () => {
    return state.items.length;
  };

  // Check if item is in cart
  const isInCart = (productId, size = null, color = null) => {
    return state.items.some(item => 
      item._id === productId && 
      (!size || item.selectedSize === size) &&
      (!color || item.selectedColor === color)
    );
  };

  // Get specific item from cart
  const getCartItem = (productId, size = null, color = null) => {
    return state.items.find(item => 
      item._id === productId && 
      (!size || item.selectedSize === size) &&
      (!color || item.selectedColor === color)
    );
  };

  const contextValue = {
    cartItems: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getItemCount,
    isInCart,
    getCartItem
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};