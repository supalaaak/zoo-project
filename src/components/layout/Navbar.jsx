// src/components/layout/Navbar.jsx
'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown, User, Settings, LogOut, Menu, X } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path) => {
    return pathname === path ? "border-green-500 text-green-700" : "border-transparent text-gray-500 hover:border-green-500 hover:text-green-700";
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/auth/login');
    setMobileMenuOpen(false);
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
              <Link href="/widgets">
                <span className={`${isActive('/widgets')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Widgets
                </span>
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-green-600 hover:text-green-700 hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          {/* Desktop user menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none">
                  My Account <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
              <span className={`${pathname === '/about' ? 'bg-green-50 border-green-500 text-green-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-green-300 hover:text-green-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                About
              </span>
            </Link>
            <Link href="/widgets" onClick={() => setMobileMenuOpen(false)}>
              <span className={`${pathname === '/widgets' ? 'bg-green-50 border-green-500 text-green-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-green-300 hover:text-green-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Widgets
              </span>
            </Link>
          </div>
          
          {/* Mobile user menu */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {session ? (
              <div className="space-y-1">
                <div className="px-4 py-2 text-sm text-gray-500">
                  Signed in as: {session.user?.email || 'User'}
                </div>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/profile');
                    setMobileMenuOpen(false);
                  }}
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-green-300 hover:text-green-700"
                >
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </div>
                </a>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/settings');
                    setMobileMenuOpen(false);
                  }}
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-green-300 hover:text-green-700"
                >
                  <div className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </div>
                </a>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-600 hover:bg-gray-50 hover:border-red-300"
                >
                  <div className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </div>
                </a>
              </div>
            ) : (
              <div className="px-4 py-2">
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <span className="block px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md cursor-pointer text-center">
                    Sign In
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}