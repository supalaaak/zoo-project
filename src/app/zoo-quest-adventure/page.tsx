//src/app/zoo-quest-adventure/page.tsx
'use client'

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  Navbar,
  Footer
} from '@/components';

export default function ZooQuest() {
  // State management
  const [step, setStep] = useState(0);
  const [questData, setQuestData] = useState({
    name: '',
    age: '',
    date: '',
    selectedZoo: '',
    animals: []
  });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  
  const [selectedAnimal1, setSelectedAnimal1] = useState('');
  const [selectedAnimal2, setSelectedAnimal2] = useState('');
  const [selectedAnimal3, setSelectedAnimal3] = useState('');
  const [moonPhase, setMoonPhase] = useState('🌕');
  
  // Sample zoo locations - this would come from an API in production
  const zoos = [
    {
      id: 'national-zoo',
      name: 'National Zoo',
      location: {
        latitude: 38.9295,
        longitude: -77.0499
      },
      animals: ['elephant', 'panda', 'lion', 'tiger', 'gorilla']
    },
    {
      id: 'san-diego-zoo',
      name: 'San Diego Zoo',
      location: {
        latitude: 32.7353,
        longitude: -117.1490
      },
      animals: ['koala', 'panda', 'penguin', 'giraffe', 'rhino']
    },
    {
      id: 'bronx-zoo',
      name: 'Bronx Zoo',
      location: {
        latitude: 40.8506,
        longitude: -73.8769
      },
      animals: ['tiger', 'bear', 'monkey', 'snake', 'zebra']
    },
    {
      id: 'lincoln-park-zoo',
      name: 'Lincoln Park Zoo',
      location: {
        latitude: 41.9217,
        longitude: -87.6329
      },
      animals: ['lion', 'penguin', 'gorilla', 'giraffe', 'bear']
    },
    {
      id: 'other',
      name: 'Other Zoo',
      location: null,
      animals: ['elephant', 'lion', 'giraffe', 'monkey', 'penguin', 'zebra', 'tiger', 'bear', 'hippo', 'snake', 'rhino', 'koala', 'gorilla', 'crocodile', 'panda']
    }
  ];

  

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to access your location. Some features may be limited.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser. Some features may be limited.');
    }
  }, []);

  // Function to get fresh location data
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            console.error('Error getting location:', error);
            reject('Unable to access your location.');
          }
        );
      } else {
        reject('Geolocation is not supported by your browser.');
      }
    });
  };


  // Function to calculate distance between two coordinates in kilometers
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  // Function to check if user is near selected zoo
  const isNearZoo = (zooId : string) => {
    if (!currentLocation) return null; // Can't verify
    
    const selectedZoo = zoos.find(zoo => zoo.id === zooId);
    if (!selectedZoo || !selectedZoo.location) return null; // "Other" zoo or missing location
    
    const distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      selectedZoo.location.latitude,
      selectedZoo.location.longitude
    );
    
    // Return true if within 2km of the zoo
    return distance <= 2;
  };

  // Get available animals based on selected zoo
  const getAvailableAnimals = (zooId : string) => {
    const selectedZoo = zoos.find(zoo => zoo.id === zooId) || zoos.find(zoo => zoo.id === 'other');
    // If there are more than 15 animals, return them all, otherwise return the specific zoo's animals
    const zooAnimals = selectedZoo.animals || [];
    return zooAnimals.length > 0 ? zooAnimals : Object.keys(animalEmojis);
  };

  // Animal emoji mapping
  const animalEmojis = {
    'elephant': '🐘',
    'lion': '🦁',
    'giraffe': '🦒',
    'monkey': '🐒',
    'penguin': '🐧',
    'zebra': '🦓',
    'tiger': '🐅',
    'bear': '🐻',
    'hippo': '🦛',
    'snake': '🐍',
    'rhino': '🦏',
    'koala': '🐨',
    'gorilla': '🦍',
    'crocodile': '🐊',
    'panda': '🐼'
  };
  
  // Rotate moon phases (just like in the landing page)
  useEffect(() => {
    const moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
    let currentPhase = 0;
    
    const interval = setInterval(() => {
      currentPhase = (currentPhase + 1) % moonPhases.length;
      setMoonPhase(moonPhases[currentPhase]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Ensure we have some custom styles for our scrolling
  useEffect(() => {
    // Add custom scrollbar styling if there are many animals
    const style = document.createElement('style');
    style.textContent = `
      .overflow-x-auto::-webkit-scrollbar {
        height: 6px;
      }
      .overflow-x-auto::-webkit-scrollbar-track {
        background: transparent;
      }
      .overflow-x-auto::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 20px;
      }
      .overflow-x-auto {
        scrollbar-width: thin;
        scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Start the quest
  const startQuest = () => {
    const name = document.getElementById('child-name').value;
    const age = document.getElementById('child-age').value;
    const date = document.getElementById('visit-date').value;
    const selectedZoo = document.getElementById('zoo-select').value;
    
    if (!name || !age || !date || !selectedZoo) {
      alert('Please fill out all the fields to start your quest!');
      return;
    }
    
    // Check location if we have it
    const locationCheck = isNearZoo(selectedZoo);
    if (locationCheck === false) {
      const proceed = confirm("It looks like you might not be at this zoo yet. You can still continue in demo mode, but some features may be limited. Continue anyway?");
      if (!proceed) return;
    }
    
    setQuestData({
      ...questData,
      name,
      age,
      date,
      selectedZoo
    });
    
    setStep(1);
  };
  
  // Select an animal
  // Updated selectAnimal function that refreshes location data
  const selectAnimal = async (animal, number) => {
    // Get current timestamp
    const timestamp = new Date().toISOString();
    
    // Get fresh location data
    let locationStr = 'Location not available';
    try {
      const freshLocation = await getCurrentLocation();
      setCurrentLocation(freshLocation); // Update the state with fresh coordinates
      locationStr = `${freshLocation.latitude.toFixed(6)}, ${freshLocation.longitude.toFixed(6)}`;
    } catch (error) {
      console.error('Error updating location:', error);
    }
    
    if (number === 1) {
      setSelectedAnimal1(animal);
      document.getElementById('animal1-name').value = animal.charAt(0).toUpperCase() + animal.slice(1);
      document.getElementById('animal1-timestamp').value = timestamp;
      document.getElementById('animal1-location').value = locationStr;
    } else if (number === 2) {
      setSelectedAnimal2(animal);
      document.getElementById('animal2-name').value = animal.charAt(0).toUpperCase() + animal.slice(1);
      document.getElementById('animal2-timestamp').value = timestamp;
      document.getElementById('animal2-location').value = locationStr;
    } else if (number === 3) {
      setSelectedAnimal3(animal);
      document.getElementById('animal3-name').value = animal.charAt(0).toUpperCase() + animal.slice(1);
      document.getElementById('animal3-timestamp').value = timestamp;
      document.getElementById('animal3-location').value = locationStr;
    }
  };
  
  // Next animal
  const nextAnimal = (currentAnimal) => {
    // Validate current animal data
    const animalName = document.getElementById(`animal${currentAnimal}-name`).value;
    const animalDoing = document.getElementById(`animal${currentAnimal}-doing`).value;
    const animalColor = document.getElementById(`animal${currentAnimal}-color`).value;
    const animalEyes = document.getElementById(`animal${currentAnimal}-eyes`).value;
    const timestamp = document.getElementById(`animal${currentAnimal}-timestamp`).value;
    const location = document.getElementById(`animal${currentAnimal}-location`).value;
    
    if (!animalName || !animalDoing || !animalColor || !animalEyes) {
      alert('Please fill out all the information about this animal!');
      return;
    }
    
    // Save animal data
    const updatedAnimals = [...questData.animals];
    updatedAnimals.push({
      name: animalName,
      doing: animalDoing,
      color: animalColor,
      eyes: animalEyes,
      timestamp: timestamp || new Date().toISOString(),
      location: location || 'Location not available'
    });
    
    setQuestData({
      ...questData,
      animals: updatedAnimals
    });
    
    setStep(currentAnimal + 1);
  };
  
  // Complete quest
  const completeQuest = () => {
    // Validate last animal data
    const animalName = document.getElementById('animal3-name').value;
    const animalDoing = document.getElementById('animal3-doing').value;
    const animalColor = document.getElementById('animal3-color').value;
    const animalEyes = document.getElementById('animal3-eyes').value;
    const timestamp = document.getElementById('animal3-timestamp').value;
    const location = document.getElementById('animal3-location').value;
    
    if (!animalName || !animalDoing || !animalColor || !animalEyes) {
      alert('Please fill out all the information about this animal!');
      return;
    }
    
    // Save last animal data
    const updatedAnimals = [...questData.animals];
    updatedAnimals.push({
      name: animalName,
      doing: animalDoing,
      color: animalColor,
      eyes: animalEyes,
      timestamp: timestamp || new Date().toISOString(),
      location: location || 'Location not available'
    });
    
    setQuestData({
      ...questData,
      animals: updatedAnimals
    });
    
    setStep(4);
  };
  
  // Restart quest
  const restartQuest = () => {
    setQuestData({
      name: '',
      age: '',
      date: '',
      animals: []
    });
    
    setSelectedAnimal1('');
    setSelectedAnimal2('');
    setSelectedAnimal3('');
    
    setStep(0);
  };
  
  // Get progress percentage
  const getProgressPercentage = () => {
    return (step / 4) * 100;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Zoo Quest Adventure | Connect with Nature</title>
        <meta name="description" content="Interactive animal observation platform connecting zoo visits with at-home nature exploration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 py-8 mb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white">Zoo Quest Adventure</h1>
          <p className="mt-2 text-green-100">Discover, observe and connect with amazing animals!</p>
          
          <div className="mt-4 flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm py-2 px-4 rounded-full">
              <div className="flex items-center space-x-2">
                <div className="text-2xl">{moonPhase}</div>
                <span className="text-white text-sm">Today's Moon Phase</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-12">
        {/* Zoo Map or Location Display */}
        {questData.selectedZoo && step > 0 && step < 4 && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Your Zoo Quest Location</h3>
            <div className="bg-blue-50 p-4 rounded-lg h-48 flex items-center justify-center">
              {currentLocation ? (
                <div className="text-center">
                  <div className="text-2xl mb-2">🗺️</div>
                  <p className="font-medium">
                    {zoos.find(zoo => zoo.id === questData.selectedZoo)?.name}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Current coordinates: {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-2xl mb-2">🏞️</div>
                  <p className="font-medium">
                    {zoos.find(zoo => zoo.id === questData.selectedZoo)?.name}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Location services not available
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-6 mb-8">
          <div 
            className="bg-gradient-to-r from-green-500 to-teal-500 h-6 rounded-full text-center text-white text-sm leading-6 transition-all duration-500 ease-in-out"
            style={{ width: `${getProgressPercentage()}%` }}
          >
            {Math.round(getProgressPercentage())}%
          </div>
        </div>

        {/* Quest Cards */}
        {step === 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-50 p-4 border-b border-green-100">
              <h2 className="text-2xl font-bold text-gray-900">Welcome to your Zoo Adventure!</h2>
              <p className="text-gray-600">Let's start your quest by getting to know you a little better.</p>
            </div>
            
            <div className="p-6">
              {locationError && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-700">
                  <p>{locationError}</p>
                </div>
              )}
            
              <div className="mb-4">
                <label htmlFor="zoo-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Which zoo are you visiting?
                </label>
                <select 
                  id="zoo-select" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">--Select a zoo--</option>
                  {zoos.map(zoo => (
                    <option key={zoo.id} value={zoo.id}>{zoo.name}</option>
                  ))}
                </select>
                {currentLocation && (
                  <div className="mt-1 text-xs text-green-600">
                    Location services active. We'll verify your zoo visit!
                  </div>
                )}
              </div>
            
              <div className="mb-4">
                <label htmlFor="visit-date" className="block text-sm font-medium text-gray-700 mb-1">
                  What date are you visiting the zoo?
                </label>
                <input 
                  type="date" 
                  id="visit-date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="child-name" className="block text-sm font-medium text-gray-700 mb-1">
                  What's your name?
                </label>
                <input 
                  type="text" 
                  id="child-name" 
                  placeholder="Enter your name" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required 
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="child-age" className="block text-sm font-medium text-gray-700 mb-1">
                  How old are you?
                </label>
                <input 
                  type="number" 
                  id="child-age" 
                  min="3" 
                  max="12" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required 
                />
              </div>
              
              <button 
                onClick={startQuest}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-4 rounded-md hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
              >
                Start My Quest!
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-amber-50 p-4 border-b border-amber-100">
              <h2 className="text-2xl font-bold text-gray-900">Animal Discovery #1</h2>
              <p className="text-gray-600">Find an animal and record your observations.</p>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">Select the animal you discovered:</p>
              
              {/* Animal selection with fixed first 5 and scrollable remainder */}
              <div className="mb-6">
                {/* First 5 animals always visible */}
                <div className="flex justify-between mb-4">
                  {(questData.selectedZoo && getAvailableAnimals(questData.selectedZoo).length > 0 
                    ? getAvailableAnimals(questData.selectedZoo).slice(0, 5) 
                    : Object.keys(animalEmojis).slice(0, 5)
                  ).map((animal) => (
                    <button 
                      key={animal}
                      onClick={() => selectAnimal(animal, 1)}
                      className={`text-4xl p-3 rounded-full transition-all duration-300 ${
                        selectedAnimal1 === animal ? 'bg-amber-100 scale-110' : 'hover:bg-gray-100 hover:scale-105'
                      }`}
                    >
                      {animalEmojis[animal]}
                    </button>
                  ))}
                </div>
                
                {/* Scrollable section for remaining animals */}
                {(questData.selectedZoo 
                  ? getAvailableAnimals(questData.selectedZoo).length > 5 
                  : Object.keys(animalEmojis).length > 5
                ) && (
                  <div className="relative">
                    <div className="overflow-x-auto pb-2 flex space-x-3 items-center px-1" style={{ scrollbarWidth: 'none' }}>
                      {(questData.selectedZoo && getAvailableAnimals(questData.selectedZoo).length > 0 
                        ? getAvailableAnimals(questData.selectedZoo).slice(5) 
                        : Object.keys(animalEmojis).slice(5)
                      ).map((animal) => (
                        <button 
                          key={animal}
                          onClick={() => selectAnimal(animal, 1)}
                          className={`text-4xl p-3 rounded-full flex-shrink-0 transition-all duration-300 ${
                            selectedAnimal1 === animal ? 'bg-amber-100 scale-110' : 'hover:bg-gray-100 hover:scale-105'
                          }`}
                        >
                          {animalEmojis[animal]}
                        </button>
                      ))}
                    </div>
                    
                    {/* Scroll indicator */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <div className="bg-gradient-to-l from-white to-transparent w-12 h-full"></div>
                      <div className="text-gray-400 animate-bounce">→</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center items-center bg-gradient-to-b from-blue-50 to-green-50 h-48 rounded-lg mb-6">
                <p className="text-8xl animate-bounce">{selectedAnimal1 ? animalEmojis[selectedAnimal1] : '?'}</p>
              </div>
              
              <div className="mb-4">
                <label htmlFor="animal1-name" className="block text-sm font-medium text-gray-700 mb-1">
                  What animal did you discover?
                </label>
                <input 
                  type="text" 
                  id="animal1-name" 
                  placeholder="Type the animal name" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="animal1-doing" className="block text-sm font-medium text-gray-700 mb-1">
                  What was the animal doing when you saw it?
                </label>
                <select 
                  id="animal1-doing"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">--Select--</option>
                  <option value="eating">Eating</option>
                  <option value="sleeping">Sleeping</option>
                  <option value="playing">Playing</option>
                  <option value="swimming">Swimming</option>
                  <option value="running">Running</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="animal1-color" className="block text-sm font-medium text-gray-700 mb-1">
                  What color was the animal?
                </label>
                <input 
                  type="text" 
                  id="animal1-color" 
                  placeholder="Describe the animal's color" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="animal1-eyes" className="block text-sm font-medium text-gray-700 mb-1">
                  What color were the animal's eyes?
                </label>
                <input 
                  type="text" 
                  id="animal1-eyes" 
                  placeholder="Describe the eye color" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required 
                />
              </div>
              
              {/* Hidden fields for tracking */}
              <input type="hidden" id="animal1-timestamp" value="" />
              <input type="hidden" id="animal1-location" value="" />
              
              {currentLocation && (
                <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <div className="flex items-center text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">
                      Location Tracked: {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
                    </span>
                  </div>
                </div>
              )}
              
              <button 
                onClick={() => nextAnimal(1)}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-4 rounded-md hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
              >
                Next Animal
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-emerald-50 p-4 border-b border-emerald-100">
              <h2 className="text-2xl font-bold text-gray-900">Animal Discovery #2</h2>
              <p className="text-gray-600">Find another animal and record your observations.</p>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">Select the animal you discovered:</p>
              
              {/* Animal selection with fixed first 5 and scrollable remainder */}
              <div className="mb-6">
                {/* First 5 animals always visible */}
                <div className="flex justify-between mb-4">
                  {(questData.selectedZoo && getAvailableAnimals(questData.selectedZoo).length > 0 
                    ? getAvailableAnimals(questData.selectedZoo).slice(0, 5) 
                    : Object.keys(animalEmojis).slice(0, 5)
                  ).map((animal) => (
                    <button 
                      key={animal}
                      onClick={() => selectAnimal(animal, 2)}
                      className={`text-4xl p-3 rounded-full transition-all duration-300 ${
                        selectedAnimal2 === animal ? 'bg-emerald-100 scale-110' : 'hover:bg-gray-100 hover:scale-105'
                      }`}
                    >
                      {animalEmojis[animal]}
                    </button>
                  ))}
                </div>
                
                {/* Scrollable section for remaining animals */}
                {(questData.selectedZoo 
                  ? getAvailableAnimals(questData.selectedZoo).length > 5 
                  : Object.keys(animalEmojis).length > 5
                ) && (
                  <div className="relative">
                    <div className="overflow-x-auto pb-2 flex space-x-3 items-center px-1" style={{ scrollbarWidth: 'none' }}>
                      {(questData.selectedZoo && getAvailableAnimals(questData.selectedZoo).length > 0 
                        ? getAvailableAnimals(questData.selectedZoo).slice(5) 
                        : Object.keys(animalEmojis).slice(5)
                      ).map((animal) => (
                        <button 
                          key={animal}
                          onClick={() => selectAnimal(animal, 2)}
                          className={`text-4xl p-3 rounded-full flex-shrink-0 transition-all duration-300 ${
                            selectedAnimal2 === animal ? 'bg-emerald-100 scale-110' : 'hover:bg-gray-100 hover:scale-105'
                          }`}
                        >
                          {animalEmojis[animal]}
                        </button>
                      ))}
                    </div>
                    
                    {/* Scroll indicator */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <div className="bg-gradient-to-l from-white to-transparent w-12 h-full"></div>
                      <div className="text-gray-400 animate-bounce">→</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center items-center bg-gradient-to-b from-green-50 to-emerald-50 h-48 rounded-lg mb-6">
                <p className="text-8xl animate-pulse">{selectedAnimal2 ? animalEmojis[selectedAnimal2] : '?'}</p>
              </div>
              
              <div className="mb-4">
                <label htmlFor="animal2-name" className="block text-sm font-medium text-gray-700 mb-1">
                  What animal did you discover?
                </label>
                <input 
                  type="text" 
                  id="animal2-name" 
                  placeholder="Type the animal name" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="animal2-doing" className="block text-sm font-medium text-gray-700 mb-1">
                  What was the animal doing when you saw it?
                </label>
                <select 
                  id="animal2-doing"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">--Select--</option>
                  <option value="eating">Eating</option>
                  <option value="sleeping">Sleeping</option>
                  <option value="playing">Playing</option>
                  <option value="swimming">Swimming</option>
                  <option value="running">Running</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="animal2-color" className="block text-sm font-medium text-gray-700 mb-1">
                  What color was the animal?
                </label>
                <input 
                  type="text" 
                  id="animal2-color" 
                  placeholder="Describe the animal's color" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="animal2-eyes" className="block text-sm font-medium text-gray-700 mb-1">
                  What color were the animal's eyes?
                </label>
                <input 
                  type="text" 
                  id="animal2-eyes" 
                  placeholder="Describe the eye color" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required 
                />
              </div>
              
              {/* Hidden fields for tracking */}
              <input type="hidden" id="animal2-timestamp" value="" />
              <input type="hidden" id="animal2-location" value="" />
              
              {currentLocation && (
                <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <div className="flex items-center text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">
                      Location Tracked: {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
                    </span>
                  </div>
                </div>
              )}
              
              <button 
                onClick={() => nextAnimal(2)}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-4 rounded-md hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
              >
                Next Animal
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-purple-50 p-4 border-b border-purple-100">
              <h2 className="text-2xl font-bold text-gray-900">Animal Discovery #3</h2>
              <p className="text-gray-600">Find your final animal and record your observations.</p>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">Select the animal you discovered:</p>
              
              {/* Animal selection with fixed first 5 and scrollable remainder */}
              <div className="mb-6">
                {/* First 5 animals always visible */}
                <div className="flex justify-between mb-4">
                  {(questData.selectedZoo && getAvailableAnimals(questData.selectedZoo).length > 0 
                    ? getAvailableAnimals(questData.selectedZoo).slice(0, 5) 
                    : Object.keys(animalEmojis).slice(0, 5)
                  ).map((animal) => (
                    <button 
                      key={animal}
                      onClick={() => selectAnimal(animal, 3)}
                      className={`text-4xl p-3 rounded-full transition-all duration-300 ${
                        selectedAnimal3 === animal ? 'bg-purple-100 scale-110' : 'hover:bg-gray-100 hover:scale-105'
                      }`}
                    >
                      {animalEmojis[animal]}
                    </button>
                  ))}
                </div>
                
                {/* Scrollable section for remaining animals */}
                {(questData.selectedZoo 
                  ? getAvailableAnimals(questData.selectedZoo).length > 5 
                  : Object.keys(animalEmojis).length > 5
                ) && (
                  <div className="relative">
                    <div className="overflow-x-auto pb-2 flex space-x-3 items-center px-1" style={{ scrollbarWidth: 'none' }}>
                      {(questData.selectedZoo && getAvailableAnimals(questData.selectedZoo).length > 0 
                        ? getAvailableAnimals(questData.selectedZoo).slice(5) 
                        : Object.keys(animalEmojis).slice(5)
                      ).map((animal) => (
                        <button 
                          key={animal}
                          onClick={() => selectAnimal(animal, 3)}
                          className={`text-4xl p-3 rounded-full flex-shrink-0 transition-all duration-300 ${
                            selectedAnimal3 === animal ? 'bg-purple-100 scale-110' : 'hover:bg-gray-100 hover:scale-105'
                          }`}
                        >
                          {animalEmojis[animal]}
                        </button>
                      ))}
                    </div>
                    
                    {/* Scroll indicator */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <div className="bg-gradient-to-l from-white to-transparent w-12 h-full"></div>
                      <div className="text-gray-400 animate-bounce">→</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center items-center bg-gradient-to-b from-purple-50 to-pink-50 h-48 rounded-lg mb-6">
                <p className="text-8xl">{selectedAnimal3 ? animalEmojis[selectedAnimal3] : '?'}</p>
              </div>
              
              <div className="mb-4">
                <label htmlFor="animal3-name" className="block text-sm font-medium text-gray-700 mb-1">
                  What animal did you discover?
                </label>
                <input 
                  type="text" 
                  id="animal3-name" 
                  placeholder="Type the animal name" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="animal3-doing" className="block text-sm font-medium text-gray-700 mb-1">
                  What was the animal doing when you saw it?
                </label>
                <select 
                  id="animal3-doing"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">--Select--</option>
                  <option value="eating">Eating</option>
                  <option value="sleeping">Sleeping</option>
                  <option value="playing">Playing</option>
                  <option value="swimming">Swimming</option>
                  <option value="running">Running</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="animal3-color" className="block text-sm font-medium text-gray-700 mb-1">
                  What color was the animal?
                </label>
                <input 
                  type="text" 
                  id="animal3-color" 
                  placeholder="Describe the animal's color" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="animal3-eyes" className="block text-sm font-medium text-gray-700 mb-1">
                  What color were the animal's eyes?
                </label>
                <input 
                  type="text" 
                  id="animal3-eyes" 
                  placeholder="Describe the eye color" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required 
                />
              </div>
              
              {/* Hidden fields for tracking */}
              <input type="hidden" id="animal3-timestamp" value="" />
              <input type="hidden" id="animal3-location" value="" />
              
              {currentLocation && (
                <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <div className="flex items-center text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">
                      Location Tracked: {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
                    </span>
                  </div>
                </div>
              )}
              
              <button 
                onClick={completeQuest}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-4 rounded-md hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
              >
                Complete My Quest!
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 text-white">
              <h2 className="text-2xl font-bold">Congratulations!</h2>
              <p>You have completed your Zoo Quest Adventure!</p>
            </div>
            
            <div className="p-6">
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-dashed border-amber-300 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-xl font-semibold mb-1">{questData.name}</h3>
                  <p className="text-gray-500 mb-1">Date: {new Date(questData.date).toLocaleDateString()}</p>
                  <p className="text-gray-500 mb-1">Age: {questData.age}</p>
                  <p className="text-gray-500 mb-4">Zoo: {zoos.find(zoo => zoo.id === questData.selectedZoo)?.name || 'Unknown Zoo'}</p>
                  <p className="font-medium">You discovered and learned about:</p>
                  <ul className="mt-2 mb-4 space-y-1">
                    {questData.animals.map((animal, index) => (
                      <li key={index} className="text-gray-600">
                        {animal.name} ({animal.color} with {animal.eyes} eyes)
                        {animal.location && animal.location !== 'Location not available' && (
                          <span className="text-xs block text-blue-500">
                            📍 Observed at: {animal.location}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-4">Choose your reward:</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="text-3xl mb-2">🖼️</div>
                  <div className="text-center font-medium">Postcard</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="text-3xl mb-2">🏷️</div>
                  <div className="text-center font-medium">Sticker Pack</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="text-3xl mb-2">🥇</div>
                  <div className="text-center font-medium">Badge</div>
                </div>
              </div>
              
              <div className="text-center text-gray-600 mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="mb-2">Show this screen to the Zoo Gift Shop to claim your reward!</p>
                <p>Continue your adventure at home by observing animals in your backyard.</p>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={restartQuest}
                  className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-4 rounded-md hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
                >
                  Start a New Quest
                </button>
                <Link href="/">
                  <span className="flex-1 inline-flex justify-center bg-gray-100 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300">
                    Return Home
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}