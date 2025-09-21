// AccountButton.jsx - With Enhanced Hover Effects
import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, ShoppingBag, Heart, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import { authService } from '../services/authService';

const AccountButton = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check for existing user on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = authService.getToken();
        if (token) {
          const userData = await authService.verifyToken();
          setUser(userData);
          console.log('User authenticated:', userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Token is invalid, user remains null
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Real authentication functions
  const handleLogin = async (email, password) => {
    try {
      console.log('Attempting login for:', email);
      const response = await authService.login(email, password);
      
      // Set user data
      const userData = response.user || response;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log('Login successful:', userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw so AuthModal can show the error
    }
  };

  const handleRegister = async (userData) => {
    try {
      console.log('Attempting registration for:', userData.email);
      const response = await authService.register(userData);
      
      // Set user data
      const newUser = response.user || response;
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      console.log('Registration successful:', newUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error; // Re-throw so AuthModal can show the error
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsDropdownOpen(false);
    
    console.log('User logged out');
    // Optional: redirect to home page after logout
    navigate('/');
  };

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="p-3 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-300">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  // If user is not logged in, show login button with hover effects
  if (!user) {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-3 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-300 transform hover:scale-110 relative group"
          title="My Account"
        >
          <User className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
          <div className="absolute inset-0 rounded-lg bg-yellow-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>

        <AuthModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      </>
    );
  }

  // If user is logged in, show dropdown with enhanced hover effects
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="p-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-300 flex items-center gap-2 group transform hover:scale-105"
        title={`Welcome, ${user.name?.split(' ')[0] || 'User'}`}
      >
        <div className="w-7 h-7 bg-yellow-600 hover:bg-yellow-700 rounded-full flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-lg">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        {/* Show name on larger screens with hover effect */}
        <span className="hidden lg:inline text-sm font-medium group-hover:text-yellow-600 transition-colors duration-300">
          {user.name?.split(' ')[0] || 'User'}
        </span>
        <div className="absolute inset-0 rounded-lg bg-yellow-100 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </button>

      {/* Enhanced Dropdown Menu with animations */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
          {/* User Info */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-white">
            <p className="font-semibold text-gray-900">{user.name || 'User'}</p>
            <p className="text-sm text-gray-600">{user.email || ''}</p>
            {user.role === 'admin' && (
              <span className="inline-block mt-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                Admin
              </span>
            )}
          </div>

          {/* Menu Items with enhanced hover effects */}
          <div className="py-2">
            <button
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-all duration-200 text-left group"
              onClick={() => {
                setIsDropdownOpen(false);
                navigate('/profile');
              }}
            >
              <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              My Profile
            </button>
            
            <button
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-all duration-200 text-left group"
              onClick={() => {
                setIsDropdownOpen(false);
                navigate('/orders');
              }}
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              My Orders
            </button>
            
            <button
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-all duration-200 text-left group"
              onClick={() => {
                setIsDropdownOpen(false);
                navigate('/wishlist');
              }}
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              Wishlist
            </button>
            
            <button
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-all duration-200 text-left group"
              onClick={() => {
                setIsDropdownOpen(false);
                navigate('/settings');
              }}
            >
              <Settings className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              Settings
            </button>

            {/* Admin Dashboard - only show for admin users */}
            {user.role === 'admin' && (
              <button
                className="flex items-center gap-3 w-full px-4 py-3 text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-all duration-200 text-left group"
                onClick={() => {
                  setIsDropdownOpen(false);
                  navigate('/admin/dashboard');
                }}
              >
                <Settings className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                Admin Dashboard
              </button>
            )}
          </div>

          {/* Logout with enhanced styling */}
          <div className="border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 text-left group"
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountButton;