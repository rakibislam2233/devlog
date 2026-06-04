'use client'
import React, { useEffect, useState } from 'react';
import { Bell, Calendar, User, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession, signOut } from '@/lib/auth/client'; 
import { useRouter } from 'next/navigation';

const DashboardHeader = () => {
  const [currentDate, setCurrentDate] = useState('');
  
  // Destructuring data and isPending from useSession hook
  const { data: sessionData, isPending } = useSession();
  const userData = sessionData?.user;
  const router = useRouter();

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    };

    updateDate();
    // Refresh date string every minute
    const timer = setInterval(updateDate, 60000);
    return () => clearInterval(timer);
  }, []);

  // Handle user logout sequence
  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/auth/login');
        },
      },
    });
  };

  return (
    <header className="w-full h-16 border-b border-gray-200 flex items-center justify-between gap-4 font-mono shrink-0 select-none bg-white sticky top-0 z-40 px-6">
      {/* Left: Breadcrumbs and Current Date */}
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">DevLog</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">Dashboard</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
          <Calendar size={14} />
          <span>{currentDate}</span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search logs, goals..."
            className="pl-10 h-9 text-sm"
          />
        </div>
      </div>

      {/* Right: User Utilities & Profiles */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        {/* User Identity Segment */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200 min-h-[36px]">
          {isPending ? (
            /* --- SKELETON LOADER START --- */
            <div className="flex items-center gap-2 animate-pulse">
              {/* Avatar Skeleton */}
              <div className="w-8 h-8 bg-gray-200 rounded-full shrink-0" />
              
              {/* Name & Email Skeleton */}
              <div className="space-y-1.5 hidden sm:block">
                <div className="h-3.5 w-24 bg-gray-200" />
                <div className="h-2.5 w-32 bg-gray-150 bg-gray-200" />
              </div>
              
              {/* Logout Button Skeleton */}
              <div className="w-8 h-8 bg-gray-100 ml-1" />
            </div>
            /* --- SKELETON LOADER END --- */
          ) : (
            /* --- ACTUAL USER DATA LAYOUT --- */
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {/* Avatar container */}
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                  {userData?.image ? (
                    <img 
                      src={userData.image} 
                      alt={userData.name || "User profile"} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={16} className="text-gray-600" />
                  )}
                </div>
                
                {/* Dynamic user metadata */}
                <div className="text-sm hidden sm:block max-w-[150px]">
                  <p className="font-medium text-gray-900 truncate">
                    {userData?.name || "Developer"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {userData?.email || "dev@example.com"}
                  </p>
                </div>
              </div>

              {/* Explicit Sign Out Action Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSignOut}
                title="Sign Out"
                className="text-gray-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;