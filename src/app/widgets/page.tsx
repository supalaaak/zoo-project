'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WidgetsPage() {
  const [currentMoonPhase, setCurrentMoonPhase] = useState('🌕');
  const [weather, setWeather] = useState({
    temperature: 72,
    condition: 'Sunny',
    icon: '☀️',
  });
  const [recentObservations, setRecentObservations] = useState([
    { id: 1, type: 'Bird', name: 'Blue Jay', location: 'Backyard', date: '2025-03-01' },
    { id: 2, type: 'Insect', name: 'Monarch Butterfly', location: 'Garden', date: '2025-03-02' },
    { id: 3, type: 'Mammal', name: 'Squirrel', location: 'Park', date: '2025-03-03' },
  ]);
  const [quests, setQuests] = useState([
    { id: 1, title: 'Big Cat Explorer', completed: 2, total: 5, icon: '🐯' },
    { id: 2, title: 'Aquatic Adventure', completed: 3, total: 4, icon: '🐠' },
    { id: 3, title: 'Bird Watcher', completed: 1, total: 6, icon: '🦜' },
  ]);

  // Rotate moon phases
  useEffect(() => {
    const moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
    let currentPhase = 0;
    
    const interval = setInterval(() => {
      currentPhase = (currentPhase + 1) % moonPhases.length;
      setCurrentMoonPhase(moonPhases[currentPhase]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Simulate weather changes
  useEffect(() => {
    const weatherConditions = [
      { temperature: 72, condition: 'Sunny', icon: '☀️' },
      { temperature: 68, condition: 'Partly Cloudy', icon: '🌤️' },
      { temperature: 65, condition: 'Cloudy', icon: '☁️' },
      { temperature: 60, condition: 'Light Rain', icon: '🌦️' },
    ];
    
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * weatherConditions.length);
      setWeather(weatherConditions[randomIndex]);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <span className="text-2xl font-bold text-green-600 cursor-pointer">Zoo Quest</span>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/about">
                  <span className="border-transparent text-gray-500 hover:border-green-500 hover:text-green-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    About
                  </span>
                </Link>
                <Link href="/features" >
                  <span className="border-transparent text-gray-500 hover:border-green-500 hover:text-green-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Features
                  </span>
                </Link>
                <Link href="/widgets" className="border-green-500 text-green-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Widgets
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md">
                My Account
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Zoo Quest Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Zoo Quest Widget */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <span className="text-2xl">🦁</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">Zoo Quest Progress</h3>
                  </div>
                </div>
                <div className="mt-4">
                  {quests.map((quest) => (
                    <div key={quest.id} className="mt-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-xl mr-2">{quest.icon}</span>
                          <span className="text-sm font-medium text-gray-700">{quest.title}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {quest.completed}/{quest.total} completed
                        </span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(quest.completed / quest.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-5">
                    <Link href="/zoo-quest-adventure">
                        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                        Start New Quest
                        </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Home Explorer Widget */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">Home Explorer</h3>
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  <p className="text-sm text-gray-600">Recent observations:</p>
                  {recentObservations.map((observation) => (
                    <div key={observation.id} className="flex items-start border-b border-gray-200 pb-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {observation.name} ({observation.type})
                        </p>
                        <p className="text-xs text-gray-500">
                          {observation.location} • {observation.date}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="mt-5 flex space-x-3">
                    <button className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600">
                      Record Observation
                    </button>
                    <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      View All
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Observation Widget */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <span className="text-2xl">🌤️</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">Weather Observation</h3>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-center py-4">
                    <div className="text-center">
                      <div className="text-5xl mb-3">{weather.icon}</div>
                      <div className="text-3xl font-bold text-gray-900">{weather.temperature}°F</div>
                      <div className="text-gray-500">{weather.condition}</div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    How does today's weather affect local wildlife?
                  </p>
                  <div className="mt-5 flex space-x-3">
                    <button className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600">
                      Log Weather Impact
                    </button>
                    <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      Weather History
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Moon Phase Observation Widget */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                    <span className="text-2xl">🌙</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">Moon Phase Observation</h3>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-center py-6">
                    <div className="text-center">
                      <div className="text-6xl mb-3 animate-pulse">{currentMoonPhase}</div>
                      <div className="text-gray-700 font-medium">Current Moon Phase</div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 text-center">
                    <p>Did you know? Many animals change their behavior according to moon phases!</p>
                  </div>
                  <div className="mt-5 flex space-x-3">
                    <button className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600">
                      Log Nocturnal Activity
                    </button>
                    <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      Moon Calendar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Action */}
          {/* <div className="mt-6 text-center">
            <Link href="/">
              <button className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                Return to Homepage
              </button>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}