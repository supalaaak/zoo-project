// src/components/dashboard/ZooQuestProgressWidget.jsx
'use client'

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export function ZooQuestProgressWidget({ quests }) {
  const [expandedQuestId, setExpandedQuestId] = useState(null);

  return (
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
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors duration-200"
                onClick={() => setExpandedQuestId(expandedQuestId === quest.id ? null : quest.id)}
              >
                <div className="flex items-center">
                  <span className="text-xl mr-2">{quest.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{quest.title}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">
                    {quest.completed}/{quest.total} completed
                  </span>
                  <svg 
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${expandedQuestId === quest.id ? 'transform rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${(quest.completed / quest.total) * 100}%` }}
                ></div>
              </div>
              
              {/* Expanded Content */}
              {expandedQuestId === quest.id && (
                <div className="mt-3 bg-gray-50 p-4 rounded-md overflow-hidden transition-all duration-300 ease-in-out">
                  {/* Introduction */}
                  <p className="text-sm text-gray-600 mb-4">{quest.intro}</p>
                  
                  {/* Rewards */}
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
                  
                  {/* Button to start quest */}
                  <button className="w-full px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                    Start This Quest
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className="mt-5">
            <Link href="/zoo-quest-adventure">
                <button className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                Start New Quest
                </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

ZooQuestProgressWidget.propTypes = {
  quests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      intro: PropTypes.string.isRequired
    })
  ).isRequired
};