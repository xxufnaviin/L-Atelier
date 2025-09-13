"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, TrendingUp, Users } from 'lucide-react';

interface ContentDurationCardProps {
  type: string;
  retention: number;
  clickAwayRate: number;
  avgDuration: string;
  engagement: string;
}

export default function ContentDurationCard({
  type,
  retention,
  clickAwayRate,
  avgDuration,
  engagement
}: ContentDurationCardProps) {
  // Extract engagement percentage for calculations
  const engagementValue = parseInt(engagement.replace('%', ''));
  
  // Calculate colors based on performance
  const getRetentionColor = (value: number) => {
    if (value >= 80) return '#10b981'; // Green
    if (value >= 60) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  const getEngagementColor = (value: number) => {
    if (value >= 85) return '#3b82f6'; // Blue
    if (value >= 70) return '#8b5cf6'; // Purple
    return '#6b7280'; // Gray
  };

  const retentionColor = getRetentionColor(retention);
  const engagementColor = getEngagementColor(engagementValue);

  // Circular progress component
  const CircularProgress = ({ 
    value, 
    size = 120, 
    strokeWidth = 8, 
    color = '#10b981' 
  }: { 
    value: number; 
    size?: number; 
    strokeWidth?: number; 
    color?: string; 
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="opacity-30"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color }}>
              {value}%
            </div>
            <div className="text-xs text-gray-500">Retention</div>
          </div>
        </div>
      </div>
    );
  };

  // Engagement indicator component
  const EngagementIndicator = ({ 
    value, 
    color 
  }: { 
    value: number; 
    color: string; 
  }) => {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: color }}
          />
          <span className="text-sm font-medium" style={{ color }}>
            {value}%
          </span>
        </div>
        <span className="text-xs text-gray-500">Engagement</span>
      </div>
    );
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-semibold text-gray-900 group-hover:text-loreal-red transition-colors leading-tight">
            {type}
          </CardTitle>
          <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full ml-2">
            <Clock className="h-3 w-3" />
            <span className="font-medium">{avgDuration}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main retention display with circular progress */}
        <div className="flex items-center justify-center">
          <CircularProgress 
            value={retention} 
            color={retentionColor}
            size={120}
            strokeWidth={8}
          />
        </div>

        {/* Click-away rate */}
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">Click Away Rate</div>
          <div className="text-lg font-semibold text-red-500">
            {clickAwayRate}%
          </div>
        </div>

        {/* Engagement indicator */}
        <div className="flex justify-center">
          <EngagementIndicator 
            value={engagementValue} 
            color={engagementColor}
          />
        </div>

        {/* Performance indicators */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
              <TrendingUp className="h-3 w-3" />
              <span>Performance</span>
            </div>
            <div className={`text-sm font-medium ${
              retention >= 80 ? 'text-green-600' : 
              retention >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {retention >= 80 ? 'Excellent' : 
               retention >= 60 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
              <Users className="h-3 w-3" />
              <span>Engagement</span>
            </div>
            <div className={`text-sm font-medium ${
              engagementValue >= 85 ? 'text-blue-600' : 
              engagementValue >= 70 ? 'text-purple-600' : 'text-gray-600'
            }`}>
              {engagementValue >= 85 ? 'High' : 
               engagementValue >= 70 ? 'Medium' : 'Low'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
