// src/app/widgets/DashboardClient.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Navbar,
  Footer,
  ZooQuestProgressWidget,
  HomeExplorerWidget,
  WeatherWidget,
  MoonPhaseWidget
} from '@/components';

export default function DashboardClient() {
  const [recentObservations, setRecentObservations] = useState([
    { id: 1, type: 'Bird', name: 'Blue Jay', location: 'Backyard', date: '2025-03-01' },
    { id: 2, type: 'Insect', name: 'Monarch Butterfly', location: 'Garden', date: '2025-03-02' },
    { id: 3, type: 'Mammal', name: 'Squirrel', location: 'Park', date: '2025-03-03' },
  ]);
  
  const [quests, setQuests] = useState([
    { 
      id: 1, 
      title: 'Big Cat Explorer', 
      completed: 2, 
      total: 5, 
      icon: '🐯',
      intro: 'Explore the majestic world of big cats! Track their movements, learn about conservation efforts, and discover their unique behaviors.'
    },
    { 
      id: 2, 
      title: 'Aquatic Adventure', 
      completed: 3, 
      total: 4, 
      icon: '🐠',
      intro: 'Dive into the underwater realm! Identify different fish species, learn about coral reefs, and understand marine ecosystems.'
    },
    { 
      id: 3, 
      title: 'Bird Watcher', 
      completed: 1, 
      total: 6, 
      icon: '🦜',
      intro: 'Take flight with our avian friends! Learn bird calls, identify different species, and track migration patterns in your area.'
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />

      {/* Page Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Zoo Quest Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Zoo Quest Widget */}
            <ZooQuestProgressWidget quests={quests} />

            {/* Home Explorer Widget */}
            <HomeExplorerWidget observations={recentObservations} />

            {/* Weather Observation Widget */}
            <WeatherWidget />

            {/* Moon Phase Observation Widget */}
            <MoonPhaseWidget />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}