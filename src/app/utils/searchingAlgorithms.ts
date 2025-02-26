'use client';

import { SortingOptions } from '../types/sorting';

let shouldStop = false;

export const resetSearchFlag = () => {
  shouldStop = false;
};

export const stopSearching = () => {
  shouldStop = true;
};

// Helper function for delay
const createDelay = (options: SortingOptions) => (ms: number) => 
  new Promise(resolve => 
    setTimeout(resolve, options.showAnimation ? ms : 0)
  );

// Helper function for playing sound
const playNote = (audioContext: AudioContext, frequency: number, options: SortingOptions) => {
  if (!options.playSound) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  
  gainNode.gain.value = 0.1;
  
  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  oscillator.stop(audioContext.currentTime + 0.1);
};

// Binary Search
export async function binarySearch(
  array: number[],
  target: number,
  setHighlightedIndices: (indices: number[]) => void,
  setFoundIndex: (index: number | null) => void,
  speed: number,
  options: SortingOptions
): Promise<number> {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const delay = createDelay(options);
  let left = 0;
  let right = array.length - 1;

  // Sort the array first (required for binary search)
  const sortedArray = [...array].sort((a, b) => a - b);

  while (left <= right && !shouldStop) {
    const mid = Math.floor((left + right) / 2);
    
    // Highlight current search range
    setHighlightedIndices([left, mid, right]);
    playNote(audioContext, 200 + sortedArray[mid] * 5, options);
    await delay(500 / speed);

    if (sortedArray[mid] === target) {
      setFoundIndex(mid);
      return mid;
    }

    if (sortedArray[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  setFoundIndex(null);
  return -1;
}

// Jump Search
export async function jumpSearch(
  array: number[],
  target: number,
  setHighlightedIndices: (indices: number[]) => void,
  setFoundIndex: (index: number | null) => void,
  speed: number,
  options: SortingOptions
): Promise<number> {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const delay = createDelay(options);
  
  // Sort the array first (required for jump search)
  const sortedArray = [...array].sort((a, b) => a - b);
  const n = sortedArray.length;
  let step = Math.floor(Math.sqrt(n));

  let prev = 0;
  
  // Finding the block where element is present (if it is present)
  while (!shouldStop && sortedArray[Math.min(step, n) - 1] < target) {
    setHighlightedIndices([prev, Math.min(step, n) - 1]);
    playNote(audioContext, 200 + sortedArray[prev] * 5, options);
    await delay(500 / speed);

    prev = step;
    step += Math.floor(Math.sqrt(n));
    
    if (prev >= n) {
      setFoundIndex(null);
      return -1;
    }
  }

  // Doing a linear search for target in block beginning with prev
  while (!shouldStop && sortedArray[prev] < target) {
    setHighlightedIndices([prev]);
    playNote(audioContext, 200 + sortedArray[prev] * 5, options);
    await delay(500 / speed);

    prev++;
    
    if (prev === Math.min(step, n)) {
      setFoundIndex(null);
      return -1;
    }
  }

  if (sortedArray[prev] === target) {
    setFoundIndex(prev);
    return prev;
  }

  setFoundIndex(null);
  return -1;
} 