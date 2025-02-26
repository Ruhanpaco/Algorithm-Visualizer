'use client';

import { SortingOptions } from '../types/sorting';

let shouldStop = false;

export const resetSortingFlag = () => {
  shouldStop = false;
};

export const stopSorting = () => {
  shouldStop = true;
};

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

// Helper function for playing sound
const playNote = (audioContext: AudioContext | null, frequency: number, options: SortingOptions) => {
  if (!options.playSound || !audioContext) return;
  
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

// Helper function for delay
const createDelay = (options: SortingOptions) => (ms: number) => 
  new Promise(resolve => 
    setTimeout(
      resolve,
      options.showAnimation 
        ? options.animationType === 'smooth'
          ? Math.max(ms, 50)
          : ms 
        : 0
    )
  );

// Helper function to safely create AudioContext
const createAudioContext = () => {
  if (typeof window === 'undefined') return null;
  return new (window.AudioContext || window.webkitAudioContext)() as AudioContext;
};

// Bubble Sort
export async function bubbleSort(
  array: number[],
  setArray: (arr: number[]) => void,
  speed: number,
  options: SortingOptions,
  setCompletedIndices: (indices: number[]) => void
): Promise<void> {
  const audioContext = createAudioContext();
  const arrayCopy = [...array];
  const delay = createDelay(options);
  const completedIndices: number[] = [];

  for (let i = 0; i < arrayCopy.length - 1; i++) {
    for (let j = 0; j < arrayCopy.length - i - 1; j++) {
      if (shouldStop) return;

      if (arrayCopy[j] > arrayCopy[j + 1]) {
        [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
        playNote(audioContext, 200 + arrayCopy[j] * 5, options);
        
        if (options.showAnimation) {
          setArray([...arrayCopy]);
          await delay(100 / speed);
        }
      }
    }
    completedIndices.push(arrayCopy.length - 1 - i);
    setCompletedIndices([...completedIndices]);
  }

  setCompletedIndices(Array.from({ length: arrayCopy.length }, (_, i) => i));
  setArray([...arrayCopy]);
}

// Quick Sort
export async function quickSort(
  array: number[],
  setArray: (arr: number[]) => void,
  speed: number,
  options: SortingOptions,
  setCompletedIndices: (indices: number[]) => void
): Promise<void> {
  const audioContext = createAudioContext();
  const arrayCopy = [...array];
  const delay = createDelay(options);
  const completedIndices: number[] = [];

  async function partition(low: number, high: number): Promise<number> {
    const pivot = arrayCopy[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (shouldStop) return i + 1;

      if (arrayCopy[j] <= pivot) {
        i++;
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
        playNote(audioContext, 200 + arrayCopy[i] * 5, options);

        if (options.showAnimation) {
          setArray([...arrayCopy]);
          await delay(100 / speed);
        }
      }
    }

    [arrayCopy[i + 1], arrayCopy[high]] = [arrayCopy[high], arrayCopy[i + 1]];
    
    if (options.showAnimation) {
      setArray([...arrayCopy]);
      await delay(100 / speed);
    }

    return i + 1;
  }

  async function sort(low: number, high: number) {
    if (low < high && !shouldStop) {
      const pi = await partition(low, high);
      completedIndices.push(pi);
      setCompletedIndices([...completedIndices]);

      await Promise.all([
        sort(low, pi - 1),
        sort(pi + 1, high)
      ]);
    }
  }

  await sort(0, arrayCopy.length - 1);
  setCompletedIndices(Array.from({ length: arrayCopy.length }, (_, i) => i));
  setArray([...arrayCopy]);
}

// Merge Sort
export async function mergeSort(
  array: number[],
  setArray: (arr: number[]) => void,
  speed: number,
  options: SortingOptions,
  setCompletedIndices: (indices: number[]) => void
): Promise<void> {
  const audioContext = createAudioContext();
  const arrayCopy = [...array];
  const delay = createDelay(options);
  const completedIndices: number[] = [];

  async function merge(left: number, mid: number, right: number) {
    if (shouldStop) return;

    const leftArray = arrayCopy.slice(left, mid + 1);
    const rightArray = arrayCopy.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
      if (shouldStop) return;

      if (leftArray[i] <= rightArray[j]) {
        arrayCopy[k] = leftArray[i];
        i++;
      } else {
        arrayCopy[k] = rightArray[j];
        j++;
      }

      playNote(audioContext, 200 + arrayCopy[k] * 5, options);
      
      if (options.showAnimation) {
        setArray([...arrayCopy]);
        await delay(100 / speed);
      }
      k++;
    }

    while (i < leftArray.length) {
      if (shouldStop) return;
      arrayCopy[k] = leftArray[i];
      playNote(audioContext, 200 + arrayCopy[k] * 5, options);
      
      if (options.showAnimation) {
        setArray([...arrayCopy]);
        await delay(100 / speed);
      }
      i++;
      k++;
    }

    while (j < rightArray.length) {
      if (shouldStop) return;
      arrayCopy[k] = rightArray[j];
      playNote(audioContext, 200 + arrayCopy[k] * 5, options);
      
      if (options.showAnimation) {
        setArray([...arrayCopy]);
        await delay(100 / speed);
      }
      j++;
      k++;
    }

    for (let idx = left; idx <= right; idx++) {
      if (!completedIndices.includes(idx)) {
        completedIndices.push(idx);
        setCompletedIndices([...completedIndices]);
      }
    }
  }

  async function sort(left: number, right: number) {
    if (left < right && !shouldStop) {
      const mid = Math.floor((left + right) / 2);
      await sort(left, mid);
      await sort(mid + 1, right);
      await merge(left, mid, right);
    }
  }

  await sort(0, arrayCopy.length - 1);
  setCompletedIndices(Array.from({ length: arrayCopy.length }, (_, i) => i));
  setArray([...arrayCopy]);
}

// Heap Sort
export async function heapSort(
  array: number[],
  setArray: (arr: number[]) => void,
  speed: number,
  options: SortingOptions,
  setCompletedIndices: (indices: number[]) => void
): Promise<void> {
  const audioContext = createAudioContext();
  const arrayCopy = [...array];
  const delay = createDelay(options);
  const completedIndices: number[] = [];

  async function heapify(n: number, i: number) {
    if (shouldStop) return;

    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arrayCopy[left] > arrayCopy[largest]) {
      largest = left;
    }

    if (right < n && arrayCopy[right] > arrayCopy[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [arrayCopy[i], arrayCopy[largest]] = [arrayCopy[largest], arrayCopy[i]];
      playNote(audioContext, 200 + arrayCopy[i] * 5, options);

      if (options.showAnimation) {
        setArray([...arrayCopy]);
        await delay(100 / speed);
      }

      await heapify(n, largest);
    }
  }

  for (let i = Math.floor(arrayCopy.length / 2) - 1; i >= 0; i--) {
    if (shouldStop) return;
    await heapify(arrayCopy.length, i);
  }

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    if (shouldStop) return;

    [arrayCopy[0], arrayCopy[i]] = [arrayCopy[i], arrayCopy[0]];
    playNote(audioContext, 200 + arrayCopy[0] * 5, options);

    if (options.showAnimation) {
      setArray([...arrayCopy]);
      await delay(100 / speed);
    }

    completedIndices.push(i);
    setCompletedIndices([...completedIndices]);

    await heapify(i, 0);
  }

  setCompletedIndices(Array.from({ length: arrayCopy.length }, (_, i) => i));
  setArray([...arrayCopy]);
}

// Selection Sort
export async function selectionSort(
  array: number[],
  setArray: (arr: number[]) => void,
  speed: number,
  options: SortingOptions,
  setCompletedIndices: (indices: number[]) => void
): Promise<void> {
  const audioContext = createAudioContext();
  const arrayCopy = [...array];
  const delay = createDelay(options);
  const completedIndices: number[] = [];

  for (let i = 0; i < arrayCopy.length - 1; i++) {
    if (shouldStop) return;

    let minIdx = i;
    
    // Find the minimum element in the unsorted part
    for (let j = i + 1; j < arrayCopy.length; j++) {
      if (shouldStop) return;
      
      if (arrayCopy[j] < arrayCopy[minIdx]) {
        minIdx = j;
      }
    }

    // Swap the found minimum element with the first element
    if (minIdx !== i) {
      [arrayCopy[i], arrayCopy[minIdx]] = [arrayCopy[minIdx], arrayCopy[i]];
      playNote(audioContext, 200 + arrayCopy[i] * 5, options);

      if (options.showAnimation) {
        setArray([...arrayCopy]);
        await delay(100 / speed);
      }
    }

    completedIndices.push(i);
    setCompletedIndices([...completedIndices]);
  }

  setCompletedIndices(Array.from({ length: arrayCopy.length }, (_, i) => i));
  setArray([...arrayCopy]);
}

// Binary Insertion Sort
export async function binaryInsertionSort(
  array: number[],
  setArray: (arr: number[]) => void,
  speed: number,
  options: SortingOptions,
  setCompletedIndices: (indices: number[]) => void
): Promise<void> {
  const audioContext = createAudioContext();
  const arrayCopy = [...array];
  const delay = createDelay(options);
  const completedIndices: number[] = [];

  // Binary search to find position where element should be inserted
  async function binarySearch(arr: number[], item: number, start: number, end: number): Promise<number> {
    if (start === end) {
      return (item > arr[start]) ? start + 1 : start;
    }

    if (start > end) {
      return start;
    }

    const mid = Math.floor((start + end) / 2);

    if (item === arr[mid]) {
      return mid + 1;
    }

    if (item > arr[mid]) {
      return binarySearch(arr, item, mid + 1, end);
    }

    return binarySearch(arr, item, start, mid - 1);
  }

  // Main sorting loop
  for (let i = 1; i < arrayCopy.length; i++) {
    if (shouldStop) return;

    const current = arrayCopy[i];
    const j = await binarySearch(arrayCopy, current, 0, i - 1);
    
    // Move elements to right to make space for current element
    for (let k = i - 1; k >= j; k--) {
      if (shouldStop) return;
      
      arrayCopy[k + 1] = arrayCopy[k];
      playNote(audioContext, 200 + arrayCopy[k] * 5, options);

      if (options.showAnimation) {
        setArray([...arrayCopy]);
        await delay(100 / speed);
      }
    }

    // Place current element in its correct position
    arrayCopy[j] = current;
    playNote(audioContext, 200 + current * 5, options);

    if (options.showAnimation) {
      setArray([...arrayCopy]);
      await delay(100 / speed);
    }

    completedIndices.push(j);
    setCompletedIndices([...completedIndices.sort((a, b) => a - b)]);
  }

  setCompletedIndices(Array.from({ length: arrayCopy.length }, (_, i) => i));
  setArray([...arrayCopy]);
}

// Shell Sort - A more efficient variation of insertion sort
export async function shellSort(
  array: number[],
  setArray: (arr: number[]) => void,
  speed: number,
  options: SortingOptions,
  setCompletedIndices: (indices: number[]) => void
): Promise<void> {
  const audioContext = createAudioContext();
  const arrayCopy = [...array];
  const delay = createDelay(options);
  const completedIndices: number[] = [];
  const n = arrayCopy.length;

  // Start with a large gap, then reduce the gap
  for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
    if (shouldStop) return;

    // Do a gapped insertion sort
    for (let i = gap; i < n; i++) {
      if (shouldStop) return;

      const temp = arrayCopy[i];
      let j;

      // Shift elements until the correct location is found
      for (j = i; j >= gap && arrayCopy[j - gap] > temp; j -= gap) {
        if (shouldStop) return;

        arrayCopy[j] = arrayCopy[j - gap];
        playNote(audioContext, 200 + arrayCopy[j] * 5, options);

        if (options.showAnimation) {
          setArray([...arrayCopy]);
          await delay(100 / speed);
        }
      }

      // Put temp in its correct location
      arrayCopy[j] = temp;
      playNote(audioContext, 200 + temp * 5, options);

      if (options.showAnimation) {
        setArray([...arrayCopy]);
        await delay(100 / speed);
      }

      completedIndices.push(j);
      setCompletedIndices([...completedIndices]);
    }
  }

  setCompletedIndices(Array.from({ length: arrayCopy.length }, (_, i) => i));
  setArray([...arrayCopy]);
}

// Radix Sort - Non-comparative integer sorting algorithm
export async function radixSort(
  array: number[],
  setArray: (arr: number[]) => void,
  speed: number,
  options: SortingOptions,
  setCompletedIndices: (indices: number[]) => void
): Promise<void> {
  const audioContext = createAudioContext();
  const arrayCopy = [...array];
  const delay = createDelay(options);
  const completedIndices: number[] = [];

  // Find the maximum number to know number of digits
  const max = Math.max(...arrayCopy);

  // Do counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    if (shouldStop) return;

    const output = new Array(arrayCopy.length).fill(0);
    const count = new Array(10).fill(0);

    // Store count of occurrences
    for (let i = 0; i < arrayCopy.length; i++) {
      if (shouldStop) return;
      count[Math.floor(arrayCopy[i] / exp) % 10]++;
    }

    // Change count[i] so that count[i] contains actual position
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = arrayCopy.length - 1; i >= 0; i--) {
      if (shouldStop) return;

      const digit = Math.floor(arrayCopy[i] / exp) % 10;
      output[count[digit] - 1] = arrayCopy[i];
      count[digit]--;

      playNote(audioContext, 200 + arrayCopy[i] * 5, options);

      if (options.showAnimation) {
        arrayCopy[i] = output[i];
        setArray([...arrayCopy]);
        await delay(100 / speed);
      }
    }

    // Copy the output array to arr[]
    for (let i = 0; i < arrayCopy.length; i++) {
      if (shouldStop) return;
      arrayCopy[i] = output[i];
      completedIndices.push(i);
      setCompletedIndices([...completedIndices]);
    }
  }

  setCompletedIndices(Array.from({ length: arrayCopy.length }, (_, i) => i));
  setArray([...arrayCopy]);
} 