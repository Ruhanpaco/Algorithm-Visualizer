'use client';

import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

type ChangelogEntry = {
  version: string;
  date: string;
  changes: string[];
};

const changelog: ChangelogEntry[] = [
  {
    version: 'v1.0.0',
    date: '2025-02-26',
    changes: [
      'Initial release',
      'Added 8 sorting algorithms: Bubble Sort, Selection Sort, Binary Insertion Sort, Quick Sort, Merge Sort, Heap Sort, Shell Sort, and Radix Sort',
      'Added 2 searching algorithms: Binary Search and Jump Search',
      'Added visualization controls and settings',
      'Added sound effects and animation options',
      'Added array size and speed controls',
      'Added responsive design for mobile devices',
      'Added dark theme interface',
      'Added performance optimizations'
    ]
  },
  {
    version: 'v0.9.1',
    date: '2025-02-26',
    changes: [
      'Added Shell Sort algorithm',
      'Added Radix Sort algorithm',
      'Improved mobile responsiveness',
      'Fixed array size limits for different screen sizes',
      'Improved touch controls for mobile devices'
    ]
  },
  {
    version: 'v0.9.0',
    date: '2025-02-26',
    changes: [
      'Beta release',
      'Implemented core visualization engine',
      'Added basic sorting algorithms',
      'Added initial UI components',
      'Added basic mobile support'
    ]
  }
];

export default function Changelog() {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <Link 
            href="/"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors
              bg-zinc-900/50 px-3 py-2 rounded-lg"
          >
            <IoArrowBack className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base">Back to Visualizer</span>
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">Changelog</h1>

        <div className="space-y-8 md:space-y-12">
          {changelog.map((entry) => (
            <div key={entry.version} className="space-y-3 md:space-y-4 
              bg-zinc-900/30 rounded-lg p-4 md:p-6"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                <h2 className="text-xl md:text-2xl font-semibold">{entry.version}</h2>
                <span className="text-white/50 text-sm md:text-base">{entry.date}</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-white/70 
                text-sm md:text-base ml-2 md:ml-4"
              >
                {entry.changes.map((change, index) => (
                  <li key={index} className="leading-relaxed">{change}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          <p>Algorithm Visualizer {changelog[0].version}</p>
          <p className="mt-2">
            <a 
              href="https://ruhanpacolli.online" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Made by Ruhan Pacolli
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 