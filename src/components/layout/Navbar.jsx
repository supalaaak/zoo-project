// src/components/layout/Navbar.jsx
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path) => {
    return pathname === path ? "border-green-500 text-green-700" : "border-transparent text-gray-500 hover:border-green-500 hover:text-green-700";
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-2xl font-bold text-green-600 cursor-pointer">Zoo Quest</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/about">
                <span className={`${isActive('/about')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  About
                </span>
              </Link>
              {/* <Link href="/features">
                <span className={`${isActive('/features')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Features
                </span>
              </Link> */}
              <Link href="/widgets">
                <span className={`${isActive('/widgets')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Widgets
                </span>
              </Link>
              {/* <Link href="/for-educators">
                <span className={`${isActive('/for-educators')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  For Educators
                </span>
              </Link> */}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {pathname.includes('/widgets') ? (
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md">
                My Account
              </button>
            ) : (
              <Link href="/auth/login">
                <span className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md cursor-pointer">
                  Sign In
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}