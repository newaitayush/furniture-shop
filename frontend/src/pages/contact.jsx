import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Clock } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would normally send the form data to your backend
      console.log('Contact Form Data:', formData);

      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000);
    }
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
          <h1 className="text-5xl font-medium mb-2 text-black">Contact</h1>
          <nav className="flex items-center space-x-2 text-base font-medium">
            <Link to="/" className="text-black hover:text-yellow-600">Home</Link>
            <ChevronRight className="w-5 h-5 text-black" />
            <span className="text-black">Contact</span>
          </nav>
        </div>
      </section>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">Get In Touch With Us</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            For More Information About Our Product & Services, Please Feel Free To Drop Us 
            An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
          </p>
        </div>

        {/* Contact Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-8">
            
            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Address</h3>
                <p className="text-gray-600 leading-relaxed">
                  236 5th SE Avenue, New<br />
                  York NY10000, United<br />
                  States
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600 leading-relaxed">
                  Mobile: +(84) 546-6789<br />
                  Hotline: +(84) 456-6789
                </p>
              </div>
            </div>

            {/* Working Time */}
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Working Time</h3>
                <p className="text-gray-600 leading-relaxed">
                  Monday-Friday: 9:00 -<br />
                  22:00<br />
                  Saturday-Sunday: 9:00 -<br />
                  21:00
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Abc"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-400"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Abc@def.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-400"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="This is an optional"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-400"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Hi! I'd like to ask about"
                  rows="5"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-400 resize-vertical"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-600 text-white px-8 py-3 rounded-md hover:bg-yellow-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>

              {/* Submit Message */}
              {submitMessage && (
                <div className={`p-4 rounded-md ${
                  submitMessage.includes('Thank you') 
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>
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

export default Contact;