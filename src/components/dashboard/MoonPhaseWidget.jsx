// src/components/dashboard/MoonPhaseWidget.jsx
'use client'

import React from 'react';
import { MoonPhaseDisplay } from '../ui/MoonPhaseDisplay';

export function MoonPhaseWidget() {
  return (
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
              <MoonPhaseDisplay interval={3000} bounce={false} />
              <div className="text-gray-700 font-medium">Current Moon Phase</div>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600 text-center">
            <p>Did you know? Many animals change their behavior according to moon phases!</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button className="w-full px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600">
              Log Nocturnal Activity
            </button>
            <button className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Moon Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}