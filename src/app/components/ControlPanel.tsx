'use client';

import { useState } from 'react';
import { SortingAlgorithm } from '../types/sorting';
import VisualizerControls from './VisualizerControls';
import { IoChevronUpOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface ControlPanelProps extends Omit<React.ComponentProps<typeof VisualizerControls>, 'className'> {
  position?: 'right' | 'bottom';
}

export default function ControlPanel({
  position = 'bottom',
  ...props
}: ControlPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (position === 'bottom') {
    return (
      <div className={`
        fixed bottom-0 left-64 right-0 bg-zinc-900/95 backdrop-blur-sm
        transition-all duration-300 z-50
        ${isCollapsed ? 'h-12' : 'h-[280px]'}
      `}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
            bg-zinc-900 p-2 rounded-full z-10"
        >
          <IoChevronUpOutline className={`
            transform transition-transform
            ${isCollapsed ? 'rotate-180' : ''}
          `} />
        </button>
        
        <div className={`
          p-6 h-full overflow-y-auto
          ${isCollapsed ? 'opacity-0' : 'opacity-100'}
          transition-opacity duration-200
        `}>
          <VisualizerControls {...props} />
        </div>
      </div>
    );
  }

  return (
    <div className={`
      fixed right-0 top-0 bg-zinc-900/95 backdrop-blur-sm
      h-full transition-all duration-300
      ${isCollapsed ? 'w-12' : 'w-[320px]'}
    `}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-1/2 -left-3 -translate-y-1/2
          bg-zinc-900 p-2 rounded-full"
      >
        <IoChevronForwardOutline className={`
          transform transition-transform
          ${isCollapsed ? '' : 'rotate-180'}
        `} />
      </button>
      
      <div className="p-6 h-full overflow-y-auto">
        <VisualizerControls {...props} />
      </div>
    </div>
  );
} 