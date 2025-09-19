import React, { useState, useEffect } from 'react';
import { 
  ChevronRightIcon, 
  AcademicCapIcon, 
  ChartBarIcon, 
  CameraIcon,
  QrCodeIcon,
  UserGroupIcon,
  SparklesIcon,
  CheckCircleIcon,
  PlayIcon,
  StarIcon,
  ShieldCheckIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CloudIcon
} from '@heroicons/react/24/outline';

interface ModernLandingPageProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const ModernLandingPage: React.FC<ModernLandingPageProps> = ({ onLoginClick, onSignupClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: QrCodeIcon,
      title: 'QR Code Scanning',
      description: 'Instant attendance marking with secure QR codes',
      color: 'from-indigo-500 to-purple-600',
      demo: 'Try QR Scanner'
    },
    {
      icon: CameraIcon,
      title: 'Face Recognition',
      description: 'AI-powered facial recognition for seamless check-ins',
      color: 'from-green-500 to-emerald-600',
      demo: 'Test Face Recognition'
    },
    {
      icon: ChartBarIcon,
      title: 'Smart Analytics',
      description: 'Real-time insights and predictive attendance analytics',
      color: 'from-blue-500 to-cyan-600',
      demo: 'View Analytics'
    },
    {
      icon: UserGroupIcon,
      title: 'Student Management',
      description: 'Comprehensive student profiles and attendance tracking',
      color: 'from-purple-500 to-pink-600',
      demo: 'Manage Students'
    }
  ];

  const stats = [
    { number: '99.9%', label: 'Accuracy Rate', icon: SparklesIcon },
    { number: '10K+', label: 'Students Tracked', icon: UserGroupIcon },
    { number: '500+', label: 'Institutions', icon: AcademicCapIcon },
    { number: '24/7', label: 'System Uptime', icon: CheckCircleIcon }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Professor, MIT',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'Attendify has revolutionized how we track attendance. The face recognition is incredibly accurate and saves us so much time.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Student, Stanford',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'I love how easy it is to mark attendance. Just look at the camera and I\'m checked in. No more forgetting to sign attendance sheets!',
      rating: 5
    },
    {
      name: 'Prof. Emily Davis',
      role: 'Dean, Harvard',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'The analytics dashboard gives us incredible insights into student engagement. It\'s a game-changer for educational institutions.',
      rating: 5
    }
  ];

  const benefits = [
    {
      icon: DevicePhoneMobileIcon,
      title: 'Mobile-First Design',
      description: 'Works perfectly on any device - phone, tablet, or desktop'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Privacy Protected',
      description: 'All face recognition processing happens locally in your browser'
    },
    {
      icon: ClockIcon,
      title: 'Real-Time Updates',
      description: 'Instant attendance tracking with live notifications'
    },
    {
      icon: CloudIcon,
      title: 'Cloud Synchronized',
      description: 'Your data is always backed up and accessible anywhere'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-2xl animate-bounce"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-indigo-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-40 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-40 left-40 w-2 h-2 bg-green-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-1500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <AcademicCapIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Attendify
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')} 
                className={`text-gray-600 hover:text-indigo-600 transition-colors font-medium ${
                  activeSection === 'features' ? 'text-indigo-600' : ''
                }`}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className={`text-gray-600 hover:text-indigo-600 transition-colors font-medium ${
                  activeSection === 'testimonials' ? 'text-indigo-600' : ''
                }`}
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className={`text-gray-600 hover:text-indigo-600 transition-colors font-medium ${
                  activeSection === 'pricing' ? 'text-indigo-600' : ''
                }`}
              >
                Pricing
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={onLoginClick}
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={onSignupClick}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-indigo-600 text-sm font-medium mb-8 border border-white/20">
              <SparklesIcon className="w-4 h-4 mr-2" />
              AI-Powered Attendance System
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                Smart Attendance
              </span>
              <br />
              <span className="text-gray-800">Made Simple</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your institution's attendance management with cutting-edge face recognition, 
              QR codes, and comprehensive analytics. No app downloads required - works in any browser.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={onSignupClick}
                className="group bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                Start Free Trial
                <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                className="group bg-white/60 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg border border-white/20 hover:bg-white/80 hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                <PlayIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            {/* Live Demo Section */}
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl max-w-4xl mx-auto mb-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Try It Live</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <QrCodeIcon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">QR Code Scanner</h4>
                  <p className="text-gray-600 mb-4">Experience instant attendance marking</p>
                  <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200">
                    Try QR Scanner
                  </button>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <CameraIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Face Recognition</h4>
                  <p className="text-gray-600 mb-4">Test AI-powered attendance</p>
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200">
                    Try Face Recognition
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage attendance efficiently with cutting-edge technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                  <button className="w-full bg-white/60 backdrop-blur-sm text-gray-700 py-2 px-4 rounded-xl font-medium border border-white/20 hover:bg-white/80 transition-all duration-200">
                    {feature.demo}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <benefit.icon className="w-8 h-8 text-indigo-600 mb-4" />
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Loved by Educators Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what students and teachers are saying about Attendify
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonials[currentTestimonial].image} 
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                </div>
                <div className="ml-auto flex">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-xl text-gray-700 italic leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
            </div>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial 
                      ? 'bg-indigo-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your institution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Basic</h3>
              <div className="text-4xl font-bold text-gray-800 mb-6">
                Free
                <span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  Up to 100 students
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  QR code attendance
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  Basic analytics
                </li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-all duration-200">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $29
                <span className="text-lg font-normal text-indigo-100">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white">
                  <CheckCircleIcon className="w-5 h-5 text-green-300 mr-3" />
                  Up to 1,000 students
                </li>
                <li className="flex items-center text-white">
                  <CheckCircleIcon className="w-5 h-5 text-green-300 mr-3" />
                  Face recognition
                </li>
                <li className="flex items-center text-white">
                  <CheckCircleIcon className="w-5 h-5 text-green-300 mr-3" />
                  Advanced analytics
                </li>
                <li className="flex items-center text-white">
                  <CheckCircleIcon className="w-5 h-5 text-green-300 mr-3" />
                  Email notifications
                </li>
              </ul>
              <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200">
                Start Free Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-gray-800 mb-6">
                Custom
                <span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  Unlimited students
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  Custom integrations
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  Priority support
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  On-premise deployment
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Attendance Management?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of institutions already using Attendify to streamline their processes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={onSignupClick}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Start Free Trial
                </button>
                <button
                  onClick={onLoginClick}
                  className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900/90 backdrop-blur-md text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <AcademicCapIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Attendify</span>
              </div>
              <p className="text-gray-400 mb-4">
                AI-powered attendance management for modern educational institutions.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="text-sm">f</span>
                </button>
                <button className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="text-sm">t</span>
                </button>
                <button className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="text-sm">in</span>
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">Features</button></li>
                <li><button className="hover:text-white transition-colors">Pricing</button></li>
                <li><button className="hover:text-white transition-colors">API</button></li>
                <li><button className="hover:text-white transition-colors">Integrations</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">About</button></li>
                <li><button className="hover:text-white transition-colors">Blog</button></li>
                <li><button className="hover:text-white transition-colors">Careers</button></li>
                <li><button className="hover:text-white transition-colors">Press</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">Help Center</button></li>
                <li><button className="hover:text-white transition-colors">Contact</button></li>
                <li><button className="hover:text-white transition-colors">Privacy</button></li>
                <li><button className="hover:text-white transition-colors">Terms</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Attendify. All rights reserved. Made with ❤️ for education.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernLandingPage;