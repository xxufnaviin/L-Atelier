"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useGlobalStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Bell, X, TrendingUp, AlertTriangle, Sparkles, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { isGlobalView, toggleView } = useGlobalStore();
  const [hasNotifications, setHasNotifications] = useState(true);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  // Sample notification data
  const notifications = [
    {
      id: 1,
      type: 'trend',
      title: 'New Trending Alert',
      message: '#GlassSkin is gaining momentum in Malaysia with 92% engagement rate',
      time: '5 minutes ago',
      read: false,
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'alert',
      title: 'Campaign Performance Alert',
      message: 'Your #VanillaGirl campaign has exceeded predicted ROI by 24%',
      time: '1 hour ago',
      read: false,
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      id: 3,
      type: 'insight',
      title: 'AI Insight Generated',
      message: 'New beauty trend opportunity detected: #CleanGirl trending 45% higher',
      time: '3 hours ago',
      read: false,
      icon: Sparkles,
      color: 'text-purple-600'
    }
  ];

  const handleNotificationClick = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    setShowProfileDropdown(false); // Close profile dropdown when opening notifications
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowNotificationDropdown(false); // Close notification dropdown when opening profile
  };

  const handleMarkAsRead = (notificationId: number) => {
    // Mark specific notification as read
    console.log(`Marking notification ${notificationId} as read`);
  };

  const handleMarkAllAsRead = () => {
    setHasNotifications(false);
    setNotificationCount(0);
    setShowNotificationDropdown(false);
  };

  // Handle clicks outside dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Handle notification dropdown
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowNotificationDropdown(false);
      }
      
      // Handle profile dropdown
      if (
        profileDropdownRef.current && 
        !profileDropdownRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/recipe-builder', label: 'Recipe Builder' },
    { href: '/trend-analyst', label: 'Trend Analyst' },
  ];

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-italiana text-2xl font-medium text-gray-900 tracking-wide">
              L'Atelier
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-loreal-red",
                  pathname === item.href
                    ? "text-loreal-red border-b-2 border-loreal-red pb-1"
                    : "text-gray-600"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section - View Toggle & Notifications */}
          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="flex items-center space-x-3">
              <span className={cn(
                "text-sm font-medium transition-colors",
                !isGlobalView ? "text-loreal-red" : "text-gray-600"
              )}>
                Malaysia
              </span>
              <Switch
                checked={isGlobalView}
                onCheckedChange={toggleView}
              />
              <span className={cn(
                "text-sm font-medium transition-colors",
                isGlobalView ? "text-loreal-red" : "text-gray-600"
              )}>
                Global
              </span>
            </div>

            {/* Notification Button */}
            <div className="relative">
              <Button
                ref={buttonRef}
                variant="ghost"
                size="sm"
                onClick={handleNotificationClick}
                className={cn(
                  "relative p-2 hover:bg-gray-100 rounded-full transition-colors",
                  showNotificationDropdown && "bg-gray-100"
                )}
              >
                <Bell className="h-5 w-5 text-gray-600 hover:text-loreal-red transition-colors" />
                {hasNotifications && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-loreal-red rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  </div>
                )}
              </Button>

              {/* Notification Dropdown */}
              {showNotificationDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute right-4 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-30 max-h-96 overflow-y-auto"
                  style={{ maxWidth: 'calc(100vw - 2rem)' }}
                >
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMarkAllAsRead}
                        className="text-xs text-loreal-red hover:text-loreal-red hover:bg-red-50"
                      >
                        Mark all read
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowNotificationDropdown(false)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="py-2">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-gray-500">
                        <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No new notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0",
                            !notification.read && "bg-blue-50/50"
                          )}
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={cn("mt-1 p-2 rounded-full bg-gray-100", notification.color)}>
                              <notification.icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <div className="ml-2 h-2 w-2 bg-loreal-red rounded-full"></div>
                                )}
                              </div>
                              <p className="mt-1 text-xs text-gray-600 leading-relaxed" style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}>
                                {notification.message}
                              </p>
                              <p className="mt-1 text-xs text-gray-400">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className="px-4 py-3 border-t border-gray-100">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-center text-sm text-loreal-red hover:text-loreal-red hover:bg-red-50"
                        onClick={() => {
                          setShowNotificationDropdown(false);
                          // Navigate to notifications page if exists
                        }}
                      >
                        View all notifications
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Button */}
            <div className="relative">
              <Button
                ref={profileButtonRef}
                variant="ghost"
                size="sm"
                onClick={handleProfileClick}
                className={cn(
                  "relative p-2 hover:bg-gray-100 rounded-full transition-colors",
                  showProfileDropdown && "bg-gray-100"
                )}
              >
                <User className="h-5 w-5 text-gray-600 hover:text-loreal-red transition-colors" />
              </Button>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div
                  ref={profileDropdownRef}
                  className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-loreal-red to-loreal-red-light rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Nicholas Tan</h3>
                        <p className="text-sm text-gray-500">Marketing Manager</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      View Profile
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      Account Settings
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      Preferences
                    </button>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        Help & Support
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors">
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
