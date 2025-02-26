'use client';

import { useState, useEffect, useCallback } from 'react';
import AlgorithmSidebar from './components/AlgorithmSidebar';
import VisualizerControls from './components/VisualizerControls';
import { bubbleSort, selectionSort, binaryInsertionSort, quickSort, heapSort, mergeSort, shellSort, radixSort, stopSorting, resetSortingFlag } from './utils/sortingAlgorithms';
import { SortingOptions } from './types/sorting';
import { binarySearch, jumpSearch, stopSearching, resetSearchFlag } from './utils/searchingAlgorithms';
import Footer from './components/Footer';

export default function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('');
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(5);
  const [isSorting, setIsSorting] = useState(false);
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [completedIndices, setCompletedIndices] = useState<number[]>([]);
  const [options, setOptions] = useState<SortingOptions>({
    showAnimation: true,
    highlightSorted: true,
    playSound: true,
    animationType: 'basic',
    showValues: false
  });
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [searchTarget, setSearchTarget] = useState<number>(50);
  const [isSearching, setIsSearching] = useState(false);
  const [algorithmType, setAlgorithmType] = useState<'sorting' | 'searching'>('sorting');
  const [sortingTime, setSortingTime] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const generateRandomArray = useCallback((size: number = 50) => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setOriginalArray([...newArray]);
    setCompletedIndices([]);
    setHighlightedIndices([]);
    setFoundIndex(null);
    setSortingTime(null);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
      generateRandomArray(arraySize);
      setIsLoading(false);
    }
  }, [generateRandomArray, arraySize]);

  const handleAlgorithmSelect = (name: string) => {
    setSelectedAlgorithm(name);
    if (name.includes('Search')) {
      setAlgorithmType('searching');
    } else {
      setAlgorithmType('sorting');
    }
    generateRandomArray(arraySize);
    setCompletedIndices([]);
    setSortingTime(null);
  };

  const handleUpdateArraySize = (newSize: number) => {
    setArraySize(newSize);
    const newArray = Array.from({ length: newSize }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setOriginalArray([...newArray]);
    setCompletedIndices([]);
    setHighlightedIndices([]);
    setFoundIndex(null);
    setSortingTime(null);
  };

  const handleSort = async () => {
    if (isSorting) return;
    
    console.log('Starting sort:', selectedAlgorithm);
    console.log('Current array:', array);
    console.log('Array size:', arraySize);
    console.log('Speed:', speed);
    console.log('Options:', options);
    
    if (!selectedAlgorithm) {
      console.log('No algorithm selected');
      return;
    }

    setIsSorting(true);
    resetSortingFlag();
    setCompletedIndices([]);
    setSortingTime(null);

    const startTime = performance.now();

    try {
      const arrayCopy = [...array]; // Create a copy to work with
      
      switch (selectedAlgorithm) {
        case 'Bubble Sort':
          console.log('Running Bubble Sort');
          await bubbleSort(arrayCopy, setArray, speed, options, setCompletedIndices);
          break;
        case 'Selection Sort':
          console.log('Running Selection Sort');
          await selectionSort(arrayCopy, setArray, speed, options, setCompletedIndices);
          break;
        case 'Binary Insertion Sort':
          console.log('Running Binary Insertion Sort');
          await binaryInsertionSort(arrayCopy, setArray, speed, options, setCompletedIndices);
          break;
        case 'Quick Sort':
          console.log('Running Quick Sort');
          await quickSort(arrayCopy, setArray, speed, options, setCompletedIndices);
          break;
        case 'Heap Sort':
          console.log('Running Heap Sort');
          await heapSort(arrayCopy, setArray, speed, options, setCompletedIndices);
          break;
        case 'Merge Sort':
          console.log('Running Merge Sort');
          await mergeSort(arrayCopy, setArray, speed, options, setCompletedIndices);
          break;
        case 'Shell Sort':
          console.log('Running Shell Sort');
          await shellSort(arrayCopy, setArray, speed, options, setCompletedIndices);
          break;
        case 'Radix Sort':
          console.log('Running Radix Sort');
          await radixSort(arrayCopy, setArray, speed, options, setCompletedIndices);
          break;
        default:
          console.log('Invalid algorithm selected:', selectedAlgorithm);
          break;
      }

      const endTime = performance.now();
      setSortingTime(endTime - startTime);
    } catch (error) {
      console.error('Sorting error:', error);
    } finally {
      setIsSorting(false);
    }
  };

  const handleStop = () => {
    stopSorting();
    setIsSorting(false);
  };

  const handleReset = () => {
    if (algorithmType === 'sorting') {
      generateRandomArray(arraySize);
      setIsSorting(false);
      setCompletedIndices([]);
      setSortingTime(null);
    } else {
      // Reset search visualization
      setHighlightedIndices([]);
      setFoundIndex(null);
      setIsSearching(false);
      generateRandomArray(arraySize);
    }
  };

  const handleSearch = async () => {
    if (isSearching) return;
    
    setIsSearching(true);
    resetSearchFlag();
    setHighlightedIndices([]);
    setFoundIndex(null);

    try {
      switch (selectedAlgorithm) {
        case 'Binary Search':
          await binarySearch(array, searchTarget, (indices, found) => {
            setHighlightedIndices(indices);
            if (found !== undefined) setFoundIndex(found ? indices[0] : null);
          }, speed, options);
          break;
        case 'Jump Search':
          await jumpSearch(array, searchTarget, (indices, found) => {
            setHighlightedIndices(indices);
            if (found !== undefined) setFoundIndex(found ? indices[0] : null);
          }, speed, options);
          break;
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <AlgorithmSidebar onSelectAlgorithm={handleAlgorithmSelect} />
      
      <main className="md:pl-64 min-h-screen flex flex-col pb-[400px] px-2 md:px-4">
        {/* Algorithm name display */}
        <div className="p-2 md:p-4">
          <h1 className="text-white text-xl md:text-2xl font-bold">
            {selectedAlgorithm || "Select an Algorithm"}
          </h1>
        </div>

        {/* Visualization area */}
        <div className="flex-1 flex items-center justify-center p-2 md:p-4">
          <div className="w-full h-[50vh] md:h-[60vh] flex items-start justify-center gap-[1px] md:gap-1 
            bg-zinc-900/30 rounded-lg p-2 md:p-8 pb-8 md:pb-12 relative"
          >
            {array && array.length > 0 ? (
              array.map((value, idx) => (
                <div
                  key={idx}
                  className="relative flex flex-col items-center"
                  style={{
                    height: '100%',
                    width: `${Math.max(
                      typeof window !== 'undefined' ? (
                        window.innerWidth < 640 ? 1 : // Mobile
                        window.innerWidth < 768 ? 1.5 : // Tablet
                        800 / arraySize // Desktop
                      ) : 2, // Default for SSR
                      typeof window !== 'undefined' ? (
                        window.innerWidth < 640 ? 0.5 : // Mobile min
                        window.innerWidth < 768 ? 1 : // Tablet min
                        2 // Desktop min
                      ) : 2 // Default for SSR
                    )}px`
                  }}
                >
                  <div
                    style={{ 
                      height: `${value}%`,
                      width: '100%',
                      marginTop: 'auto',
                      transition: options.animationType === 'smooth' 
                        ? 'all 0.2s ease-in-out' 
                        : 'none'
                    }}
                    className={`
                      ${options.animationType === 'basic' ? 'transition-colors duration-200' : ''}
                      ${highlightedIndices.includes(idx) 
                        ? 'bg-blue-500' 
                        : foundIndex === idx 
                          ? 'bg-green-500'
                          : completedIndices.includes(idx) && options.highlightSorted
                            ? 'bg-purple-500'
                            : 'bg-white'}
                      rounded-[1px] md:rounded-sm
                    `}
                  />
                  {options.showValues && (
                    <div className="absolute -bottom-6 md:-bottom-8 text-white text-[10px] md:text-xs">
                      {value}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/20 border-t-white"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {isClient && (
        <VisualizerControls
          onUpdateSpeed={setSpeed}
          onUpdateSize={handleUpdateArraySize}
          onSort={handleSort}
          onSearch={handleSearch}
          onReset={handleReset}
          onStop={algorithmType === 'sorting' ? handleStop : stopSearching}
          isSorting={isSorting}
          isSearching={isSearching}
          selectedAlgorithm={selectedAlgorithm}
          options={options}
          onUpdateOptions={setOptions}
          arraySize={arraySize}
          speed={speed}
          searchTarget={searchTarget}
          onUpdateSearchTarget={setSearchTarget}
          algorithmType={algorithmType}
          sortingTime={sortingTime}
        />
      )}

      <Footer />
    </div>
  );
}
