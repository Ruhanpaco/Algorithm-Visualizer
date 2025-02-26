'use client';

import { BiRefresh } from 'react-icons/bi';
import { BsSpeedometer } from 'react-icons/bs';
import { HiOutlineViewList } from 'react-icons/hi';
import { FaPlay, FaRedo } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { useState } from 'react';

interface SortingOptions {
  showAnimation: boolean;
  highlightSorted: boolean;
  playSound: boolean;
  animationType: 'basic' | 'smooth';
  showValues: boolean;
}

interface VisualizerControlsProps {
  onGenerateNewArray: () => void;
  onUpdateSpeed: (speed: number) => void;
  onUpdateSize: (size: number) => void;
  onSort: () => void;
  onReset: () => void;
  onStop: () => void;
  isSorting: boolean;
  selectedAlgorithm: string;
  options: SortingOptions;
  onUpdateOptions: (options: SortingOptions) => void;
  arraySize: number;
  speed: number;
  isSearching?: boolean;
  onSearch?: () => void;
  searchTarget?: number;
  onUpdateSearchTarget?: (target: number) => void;
  algorithmType?: 'sorting' | 'searching';
  showGenerateArray?: boolean;
  sortingTime?: number | null;
}

export default function VisualizerControls({
  onGenerateNewArray,
  onUpdateSpeed,
  onUpdateSize,
  onSort,
  onReset,
  onStop,
  isSorting,
  selectedAlgorithm,
  options,
  onUpdateOptions,
  arraySize,
  speed,
  isSearching = false,
  onSearch,
  searchTarget = 50,
  onUpdateSearchTarget,
  algorithmType = 'sorting',
  showGenerateArray = true,
  sortingTime
}: VisualizerControlsProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div 
      className="fixed right-0 md:right-4 bottom-[56px] md:bottom-[68px] 
        bg-zinc-900/95 backdrop-blur-sm p-3 md:p-6 rounded-t-lg md:rounded-lg text-white 
        w-full md:w-auto md:min-w-[300px] shadow-xl 
        max-h-[60vh] md:max-h-[calc(100vh-96px)] overflow-y-auto
        md:max-w-[400px]"
    >
      <div className="space-y-4 md:space-y-6">
        {/* Settings Toggle */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg md:text-xl font-semibold">
              {selectedAlgorithm || "Select Algorithm"}
            </h2>
            {sortingTime && algorithmType === 'sorting' && (
              <p className="text-xs md:text-sm text-white/50 mt-1">
                Time: {sortingTime.toFixed(2)}ms
              </p>
            )}
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <IoSettings className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="space-y-4 border-t border-white/20 pt-4">
            <h3 className="text-sm font-medium text-white/70">Visualization Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg">
                <span className="text-sm">Show Animation</span>
                <input
                  type="checkbox"
                  checked={options.showAnimation}
                  onChange={(e) => onUpdateOptions({
                    ...options,
                    showAnimation: e.target.checked
                  })}
                  className="w-4 h-4"
                />
              </label>
              
              {options.showAnimation && (
                <div className="ml-4 space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={options.animationType === 'basic'}
                      onChange={() => onUpdateOptions({
                        ...options,
                        animationType: 'basic'
                      })}
                    />
                    <span className="text-sm">Basic Animation</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={options.animationType === 'smooth'}
                      onChange={() => onUpdateOptions({
                        ...options,
                        animationType: 'smooth'
                      })}
                    />
                    <span className="text-sm">Smooth Animation</span>
                  </label>
                </div>
              )}

              <label className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg">
                <span className="text-sm">Highlight Sorted</span>
                <input
                  type="checkbox"
                  checked={options.highlightSorted}
                  onChange={(e) => onUpdateOptions({
                    ...options,
                    highlightSorted: e.target.checked
                  })}
                  className="w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg">
                <span className="text-sm">Sound Effects</span>
                <input
                  type="checkbox"
                  checked={options.playSound}
                  onChange={(e) => onUpdateOptions({
                    ...options,
                    playSound: e.target.checked
                  })}
                  className="w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg">
                <span className="text-sm">Show Values</span>
                <input
                  type="checkbox"
                  checked={options.showValues}
                  onChange={(e) => onUpdateOptions({
                    ...options,
                    showValues: e.target.checked
                  })}
                  className="w-4 h-4"
                />
              </label>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 flex items-center gap-2">
              <HiOutlineViewList />
              Array Size: {arraySize}
            </label>
            <input 
              type="range" 
              min="5" 
              max={window.innerWidth < 640 ? 80 : // Mobile
                   window.innerWidth < 768 ? 120 : // Tablet
                   385} // Desktop
              step="5"
              value={arraySize}
              onChange={(e) => onUpdateSize(Number(e.target.value))}
              className="w-full h-2 md:h-1.5 accent-white rounded-lg appearance-none bg-white/20"
              disabled={isSorting}
            />
          </div>
          
          <div>
            <label className="block text-sm mb-2 flex items-center gap-2">
              <BsSpeedometer />
              Speed: {speed}x
            </label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={speed}
              onChange={(e) => onUpdateSpeed(Number(e.target.value))}
              className="w-full accent-white"
              disabled={isSorting}
            />
          </div>
        </div>

        {/* Show different controls based on algorithm type */}
        {algorithmType === 'sorting' ? (
          // Sorting Controls
          <div className="space-y-3 pt-2">
            {showGenerateArray && (
              <button
                onClick={onGenerateNewArray}
                disabled={isSorting}
                className="w-full bg-white text-black py-2.5 rounded-lg hover:bg-gray-200 
                  flex items-center justify-center gap-2 font-medium disabled:opacity-50 
                  disabled:cursor-not-allowed transition-all duration-200"
              >
                <BiRefresh className="w-5 h-5" />
                Generate New Array
              </button>
            )}

            {selectedAlgorithm && (
              <div className="flex gap-2">
                <button
                  onClick={isSorting ? onStop : onSort}
                  className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 
                    font-medium transition-all duration-200
                    ${isSorting 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'}`}
                >
                  {isSorting ? (
                    <>
                      <FaRedo className="w-4 h-4" />
                      Stop
                    </>
                  ) : (
                    <>
                      <FaPlay className="w-4 h-4" />
                      Start Sort
                    </>
                  )}
                </button>
                
                <button
                  onClick={onReset}
                  disabled={isSorting}
                  className="flex-1 border border-white py-2.5 rounded-lg
                    hover:bg-white/10 flex items-center justify-center gap-2 
                    font-medium disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200"
                >
                  <BiRefresh className="w-4 h-4" />
                  Reset
                </button>
              </div>
            )}
          </div>
        ) : (
          // Searching Controls
          <div className="space-y-3 pt-2">
            {showGenerateArray && (
              <button
                onClick={onGenerateNewArray}
                disabled={isSearching}
                className="w-full bg-white text-black py-2.5 rounded-lg hover:bg-gray-200 
                  flex items-center justify-center gap-2 font-medium disabled:opacity-50 
                  disabled:cursor-not-allowed transition-all duration-200"
              >
                <BiRefresh className="w-5 h-5" />
                Generate New Array
              </button>
            )}

            {/* Search Target Input */}
            <div>
              <label className="block text-sm mb-2">Search Target: {searchTarget}</label>
              <input
                type="range"
                min="0"
                max="100"
                value={searchTarget}
                onChange={(e) => onUpdateSearchTarget?.(Number(e.target.value))}
                className="w-full accent-white"
                disabled={isSearching}
              />
            </div>

            {selectedAlgorithm && (
              <div className="flex gap-2">
                <button
                  onClick={isSearching ? onStop : onSearch}
                  className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 
                    font-medium transition-all duration-200
                    ${isSearching 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                  {isSearching ? (
                    <>
                      <FaRedo className="w-4 h-4" />
                      Stop
                    </>
                  ) : (
                    <>
                      <FaPlay className="w-4 h-4" />
                      Start Search
                    </>
                  )}
                </button>

                <button
                  onClick={onReset}
                  disabled={isSearching}
                  className="flex-1 border border-white py-2.5 rounded-lg
                    hover:bg-white/10 flex items-center justify-center gap-2 
                    font-medium disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200"
                >
                  <BiRefresh className="w-4 h-4" />
                  Reset
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 