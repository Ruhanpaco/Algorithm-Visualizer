export type AnimationType = 'basic' | 'smooth';
export type AlgorithmCategory = 'sorting' | 'searching' | 'array' | 'matrix';

export interface SortingOptions {
  showAnimation: boolean;
  highlightSorted: boolean;
  playSound: boolean;
  animationType: AnimationType;
  showValues: boolean;
} 