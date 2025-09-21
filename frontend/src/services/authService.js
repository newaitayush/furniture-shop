// src/services/authService.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class AuthService {
  // Login user
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Add this for cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store JWT token
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Store user data
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Network error during login');
    }
  }

  // Register user
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Add this for cookies
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store JWT token
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Store user data
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Network error during registration');
    }
  }

  // Verify token and get user profile - FIXED ENDPOINT
  async verifyToken() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_URL}/auth/me`, { // Changed from /profile to /me
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        // If token is invalid, remove it
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error(data.message || 'Token verification failed');
      }

      return data.user || data;
    } catch (error) {
      console.error('Token verification error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  }

  // Get current user from localStorage
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Check if user is logged in
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  // Get current token
  getToken() {
    return localStorage.getItem('token');
  }

  // Get auth headers for API calls
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    } : {};
  }

  // Logout user
  async logout() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Call logout endpoint
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: this.getAuthHeaders(),
          credentials: 'include',
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
}

export const authService = new AuthService();