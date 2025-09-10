"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { useGlobalStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const { isGlobalView, toggleView } = useGlobalStore();

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
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-loreal-red to-loreal-red-light rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="font-bold text-xl text-gray-900">
              GlowPulse <span className="text-loreal-red">AI</span>
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
        </div>
      </div>
    </nav>
  );
}
