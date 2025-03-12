// src/components/dashboard/WeatherWidget.jsx
'use client'

import React from 'react';
import { useState, useEffect } from 'react';

export function WeatherWidget() {
  const [weather, setWeather] = useState({
    temperature: 72,
    condition: 'Sunny',
    icon: '☀️',
  });
  
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
    <div className="bg-white overflow-hidden shadow rounded-lg h-full">
      <div className="px-4 py-5 sm:p-6 flex flex-col h-full">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
            <span className="text-2xl">🌤️</span>
          </div>
          <div className="ml-5 w-0 flex-1">
            <h3 className="text-lg font-medium text-gray-900">Weather Observation</h3>
          </div>
        </div>
        <div className="flex-grow flex flex-col">
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
          <div className="mt-auto grid grid-cols-2 gap-3">
            <button className="w-full px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600">
              Log Weather Impact
            </button>
            <button className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Weather History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
