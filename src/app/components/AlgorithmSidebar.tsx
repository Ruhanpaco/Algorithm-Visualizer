'use client';

import { useState } from 'react';
import { FaSort, FaSearch } from 'react-icons/fa';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { BsGrid3X3 } from 'react-icons/bs';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { AlgorithmCategory } from '../types/sorting';

type Algorithm = {
  name: string;
  category: AlgorithmCategory;
  timeComplexity: string;
  spaceComplexity: string;
  description?: string;
};

const algorithms: Algorithm[] = [
  // Sorting Algorithms
  { 
    name: 'Bubble Sort', 
    category: 'sorting',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Simple comparison-based sorting algorithm'
  },
  { 
    name: 'Selection Sort',
    category: 'sorting',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Simple and efficient for small lists'
  },
  { 
    name: 'Binary Insertion Sort',
    category: 'sorting',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Insertion sort with binary search optimization'
  },
  { 
    name: 'Quick Sort', 
    category: 'sorting',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    description: 'Efficient, in-place sorting algorithm'
  },
  { 
    name: 'Merge Sort', 
    category: 'sorting',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Stable, divide-and-conquer sorting algorithm'
  },
  { 
    name: 'Heap Sort', 
    category: 'sorting',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    description: 'Comparison-based sorting using binary heap'
  },
  { 
    name: 'Shell Sort',
    category: 'sorting',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    description: 'Efficient variation of insertion sort'
  },
  { 
    name: 'Radix Sort',
    category: 'sorting',
    timeComplexity: 'O(nk)',
    spaceComplexity: 'O(n + k)',
    description: 'Non-comparative integer sorting'
  },
  
  // Searching Algorithms
  { 
    name: 'Binary Search',
    category: 'searching',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Efficient search in sorted arrays'
  },
  { 
    name: 'Jump Search',
    category: 'searching',
    timeComplexity: 'O(√n)',
    spaceComplexity: 'O(1)',
    description: 'Block-jumping search in sorted arrays'
  }
];

const getCategoryIcon = (category: AlgorithmCategory) => {
  switch (category) {
    case 'sorting':
      return <FaSort className="w-4 h-4" />;
    case 'searching':
      return <FaSearch className="w-4 h-4" />;
    case 'array':
      return <AiOutlineOrderedList className="w-4 h-4" />;
    case 'matrix':
      return <BsGrid3X3 className="w-4 h-4" />;
    default:
      return null;
  }
};

export default function AlgorithmSidebar({ 
  onSelectAlgorithm 
}: { 
  onSelectAlgorithm: (name: string) => void 
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedAlgo, setSelectedAlgo] = useState<string>('');

  const handleAlgorithmSelect = (algo: Algorithm) => {
    console.log('Selected algorithm:', algo.name);
    setSelectedAlgo(algo.name);
    onSelectAlgorithm(algo.name);
  };

  return (
    <div 
      className={`
        fixed top-0 left-0 h-full bg-zinc-900 text-white transition-all duration-300
        ${isOpen ? 'w-64 md:w-64' : 'w-0 md:w-20'}
        z-40 border-r border-white/10
        md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 bg-zinc-900 p-1 rounded-full"
      >
        {isOpen ? <IoChevronBackOutline /> : <IoChevronForwardOutline />}
      </button>

      <div className="p-6">
        <h2 className={`text-xl font-bold mb-6 ${!isOpen && 'hidden'}`}>
          Algorithms
        </h2>

        <div className="space-y-2">
          {algorithms.map((algo) => (
            <button
              key={algo.name}
              onClick={() => handleAlgorithmSelect(algo)}
              className={`
                w-full text-left p-2 hover:bg-zinc-800 rounded
                flex items-center gap-2
                ${!isOpen && 'justify-center'}
                ${selectedAlgo === algo.name ? 'bg-zinc-800' : ''}
              `}
            >
              {getCategoryIcon(algo.category)}
              {isOpen && (
                <div>
                  <div className="font-medium">{algo.name}</div>
                  <div className="text-xs text-gray-400">
                    Time: {algo.timeComplexity} | Space: {algo.spaceComplexity}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 