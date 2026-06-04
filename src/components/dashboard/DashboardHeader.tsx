'use client'
import React, { useEffect, useState } from 'react';
import { Bell, Calendar, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DashboardHeader = () => {
  const [currentDate, setCurrentDate] = useState('');

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
    const timer = setInterval(updateDate, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full h-16 border-b border-gray-200 flex items-center justify-between gap-4 font-mono shrink-0 select-none bg-white sticky top-0 z-40 px-6">
      {/* Left: Breadcrumbs and Date */}
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

      {/* Center: Search */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search logs, goals..."
            className="pl-10 h-9 text-sm"
          />
        </div>
      </div>

      {/* Right: User Actions */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={16} className="text-gray-600" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">Developer</p>
              <p className="text-xs text-gray-500">dev@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default DashboardHeader;
