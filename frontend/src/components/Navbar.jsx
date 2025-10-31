'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold gradient-text">PharmaVerify</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/verify" className="text-gray-700 hover:text-blue-600 transition">
              Verify Drug
            </Link>
            <Link href="/mint" className="text-gray-700 hover:text-blue-600 transition">
              Mint Batch
            </Link>
            <a 
              href="https://github.com/yourusername/pharma-verify" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              GitHub
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/verify" className="block py-2 text-gray-700 hover:text-blue-600">
              Verify Drug
            </Link>
            <Link href="/mint" className="block py-2 text-gray-700 hover:text-blue-600">
              Mint Batch
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
