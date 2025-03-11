// src/app/page.tsx

'use client'

import Head from 'next/head';
import Link from 'next/link';
import { 
  Navbar, 
  Footer, 
  MoonPhaseDisplay, 
  SectionHeading, 
  FeatureCard, 
  TestimonialCarousel 
} from '@/components';

export default function Home() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Zoo Quest Adventure | Connect with Nature</title>
        <meta name="description" content="Interactive animal observation platform connecting zoo visits with at-home nature exploration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <Navbar />

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
                  <MoonPhaseDisplay size="text-9xl" bounce={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            subtitle="Features" 
            title="A complete nature observation adventure" 
            description="From zoo visits to backyard explorations, Zoo Quest connects children with the wonders of the natural world."
            center={true}
          />

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <FeatureCard 
                  key={feature.title} 
                  title={feature.title} 
                  description={feature.description} 
                  icon={feature.icon} 
                  color={feature.color} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            subtitle="How It Works" 
            title="Your Journey from Zoo to Home" 
            center={true} 
          />
          
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
          <SectionHeading 
            subtitle="Testimonials" 
            title="What Families Are Saying" 
            center={true} 
          />
          
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </div>

      {/* Partner Zoos */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            subtitle="Partners" 
            title="Participating Zoos" 
            center={true} 
          />
          
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

      {/* Footer */}
      <Footer />
    </div>
  );
}