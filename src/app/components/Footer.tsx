'use client';

import { FaGithub, FaGlobe } from 'react-icons/fa';
import Link from 'next/link';

const APP_VERSION = 'v1.0.0';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-zinc-900/95 backdrop-blur-sm border-t border-white/10 py-2 md:py-4 px-3 md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-1 md:gap-0">
        <div className="flex items-center gap-2 text-white/70 text-xs md:text-sm">
          <span>Algorithm Visualizer</span>
          <span className="text-white/30">|</span>
          <span className="text-xs md:text-sm hidden md:inline">Built with Next.js & TailwindCSS</span>
          <span className="text-white/30">|</span>
          <span className="text-xs md:text-sm">{APP_VERSION}</span>
          <span className="text-white/30">|</span>
          <Link 
            href="/changelog"
            className="text-xs md:text-sm hover:text-white transition-colors"
          >
            Changelog
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <a 
            href="https://ruhanpacolli.online" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 md:gap-2 text-white/70 hover:text-white transition-colors"
          >
            <FaGlobe className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm">Made by Ruhan Pacolli</span>
          </a>

          <a 
            href="https://github.com/Ruhanpaco" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors"
          >
            <FaGithub className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
} 