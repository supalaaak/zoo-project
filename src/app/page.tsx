// pages/index.js
'use client'

import Head from 'next/head';
import Link from 'next/link';
// import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [moonPhase, setMoonPhase] = useState('🌕');
  
  // Features for the features section
  const features = [
    {
      title: "Zoo Quests",
      description: "Discover and learn about amazing animals during your zoo visit with interactive quests",
      icon: "🦁",
      color: "bg-amber-100 text-amber-800",
    },
    {
      title: "Home Observations",
      description: "Continue your adventure at home by observing animals, weather patterns, and the moon",
      icon: "🦉",
      color: "bg-emerald-100 text-emerald-800",
    },
    {
      title: "Collection & Badges",
      description: "Earn special badges, stickers, and rewards for your nature observations",
      icon: "🏆",
      color: "bg-purple-100 text-purple-800",
    },
    {
      title: "Animal Connections",
      description: "Understand how weather and moon phases affect animal behavior",
      icon: "🌙",
      color: "bg-blue-100 text-blue-800",
    },
  ];
  
  // Testimonials for the testimonials section
  const testimonials = [
    {
      quote: "My daughter used to rush through the zoo, but now she spends time observing and recording. She's been keeping her nature journal for 3 months!",
      name: "Emma's Mom",
      role: "Parent",
    },
    {
      quote: "Zoo Quest has transformed our field trips. Students are actively engaged in scientific observation rather than just passive visitors.",
      name: "Mr. Johnson",
      role: "3rd Grade Teacher",
    },
    {
      quote: "The connection between zoo visits and home observation has created wonderful learning moments for our whole family.",
      name: "The Rodriguez Family",
      role: "Zoo Members",
    },
  ];
  
  // Rotate through testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  // Rotate moon phases
  useEffect(() => {
    const moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
    let currentPhase = 0;
    
    const interval = setInterval(() => {
      currentPhase = (currentPhase + 1) % moonPhases.length;
      setMoonPhase(moonPhases[currentPhase]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Zoo Quest Adventure | Connect with Nature</title>
        <meta name="description" content="Interactive animal observation platform connecting zoo visits with at-home nature exploration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-green-600">Zoo Quest</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/about">
                  <span className="border-transparent text-gray-500 hover:border-green-500 hover:text-green-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    About
                  </span>
                </Link>
                <Link href="/features">
                  <span className="border-transparent text-gray-500 hover:border-green-500 hover:text-green-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Features
                  </span>
                </Link>
                <Link href="/for-educators">
                  <span className="border-transparent text-gray-500 hover:border-green-500 hover:text-green-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    For Educators
                  </span>
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link href="/login">
                <span className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md">
                  Sign In
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-teal-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:space-x-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Discover. Observe. Connect.
              </h1>
              <p className="mt-6 max-w-3xl text-xl text-green-50">
                Transform zoo visits into lasting connections with nature through interactive quests and at-home observation adventures.
              </p>
              <div className="mt-10 max-w-sm sm:flex sm:space-x-4">
                <div className="rounded-md shadow">
                  <Link href="/widgets">
                    <span className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                      Get Started
                    </span>
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0">
                  <Link href="/about">
                    <span className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-800 hover:bg-green-900 md:py-4 md:text-lg md:px-10">
                      Learn More
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 md:mt-0 md:w-1/2">
              <div className="relative h-64 sm:h-72 md:h-96 rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="text-9xl animate-bounce">
                    {moonPhase}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A complete nature observation adventure
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              From zoo visits to backyard explorations, Zoo Quest connects children with the wonders of the natural world.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.title} className="relative">
                  <dt>
                    <div className={`absolute flex items-center justify-center h-12 w-12 rounded-md ${feature.color}`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Your Journey from Zoo to Home
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-between">
              <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center border-4 border-white">
                <span className="text-2xl">🦒</span>
              </div>
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center border-4 border-white">
                <span className="text-2xl">📱</span>
              </div>
              <div className="bg-purple-100 rounded-full h-16 w-16 flex items-center justify-center border-4 border-white">
                <span className="text-2xl">🏠</span>
              </div>
              <div className="bg-amber-100 rounded-full h-16 w-16 flex items-center justify-center border-4 border-white">
                <span className="text-2xl">🔍</span>
              </div>
              <div className="bg-emerald-100 rounded-full h-16 w-16 flex items-center justify-center border-4 border-white">
                <span className="text-2xl">🏆</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Visit the Zoo</h3>
              <p className="mt-2 text-sm text-gray-500">Start your adventure at any participating zoo</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Complete Quests</h3>
              <p className="mt-2 text-sm text-gray-500">Observe animals and complete interactive challenges</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Take It Home</h3>
              <p className="mt-2 text-sm text-gray-500">Continue your adventure in your backyard or local park</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Observe Nature</h3>
              <p className="mt-2 text-sm text-gray-500">Record animals, weather, and moon observations</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Earn Rewards</h3>
              <p className="mt-2 text-sm text-gray-500">Collect badges and redeem rewards on your next zoo visit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What Families Are Saying
            </p>
          </div>
          
          <div className="relative h-64 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="h-full flex flex-col justify-center">
                <p className="text-xl italic text-gray-600 text-center">&quot;{testimonial.quote}&quot;</p>
                  <div className="mt-6 text-center">
                    <p className="text-base font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 w-3 mx-1 rounded-full ${
                  currentSlide === index ? 'bg-green-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Partner Zoos */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Partners</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Participating Zoos
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="h-16 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 font-medium">Central City Zoo</span>
            </div>
            <div className="h-16 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 font-medium">Forest Park Zoo</span>
            </div>
            <div className="h-16 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 font-medium">Mountain View Zoo</span>
            </div>
            <div className="h-16 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 font-medium">Oceanside Aquarium</span>
            </div>
          </div>
        </div>
      </div>

      {/* Download App Section */}
      {/* <div className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block">Ready to start your adventure?</span>
                <span className="block text-green-200">Download the Zoo Quest app today.</span>
              </h2>
              <p className="mt-4 text-lg text-green-100">
                Available for iOS and Android devices. Take your quest with you wherever you go!
              </p>
              <div className="mt-8 flex space-x-4">
                <a href="#" className="bg-white rounded-md py-3 px-6 flex items-center space-x-2">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="text-xs text-gray-600">Download on the</p>
                    <p className="text-sm font-semibold text-gray-900">App Store</p>
                  </div>
                </a>
                <a href="#" className="bg-white rounded-md py-3 px-6 flex items-center space-x-2">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <p className="text-xs text-gray-600">Get it on</p>
                    <p className="text-sm font-semibold text-gray-900">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/3">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <span className="text-7xl">📱</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">About</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Our Story</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Team</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">For Teachers</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">For Parents</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">For Zoos</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Activity Guides</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Help Center</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">FAQs</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Contact Us</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Twitter</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Facebook</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Instagram</a></li>
                <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; {new Date().getFullYear()} Zoo Quest Adventure. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}