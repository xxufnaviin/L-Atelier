"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, TrendingUp, TrendingDown, Eye } from 'lucide-react';
import LineChartComponent from './LineChartComponent';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TrendCardProps {
  type: 'audio' | 'keyword' | 'hashtag' | 'decay';
  data: {
    name: string;
    growth?: number;
    decline?: number;
    views?: string;
    data: Array<{ date: string; value: number }>;
    platform: string;
    demographic: string;
  };
}

export default function TrendCard({ type, data }: TrendCardProps) {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);

  const getIcon = () => {
    switch (type) {
      case 'audio':
        return isPlaying ? 
          <Pause className="h-4 w-4 text-loreal-red" /> : 
          <Play className="h-4 w-4 hover:text-loreal-red transition-colors" />;
      case 'keyword':
        return <TrendingUp className="h-4 w-4" />;
      case 'hashtag':
        return <Eye className="h-4 w-4" />;
      case 'decay':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getNavigationUrl = () => {
    switch (type) {
      case 'audio':
        return '/trending-audio';
      case 'keyword':
        return '/trending-keywords';
      case 'hashtag':
        return '/trending-hashtags';
      case 'decay':
        return '/trending-decay';
      default:
        return '/';
    }
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card navigation
    if (type === 'audio') {
      setIsPlaying(!isPlaying);
      // Here you would implement actual audio playback logic
      console.log(`${isPlaying ? 'Pausing' : 'Playing'} audio: ${data.name}`);
    }
  };

  const handleCardClick = () => {
    router.push(getNavigationUrl());
  };

  const getTitle = () => {
    switch (type) {
      case 'audio':
        return 'Trending Audio';
      case 'keyword':
        return 'Top Keyword';
      case 'hashtag':
        return 'Viral Hashtag';
      case 'decay':
        return 'Declining Trends';
      default:
        return 'Trend';
    }
  };

  const getMetric = () => {
    if (type === 'decay' && data.decline) {
      return `${data.decline}%`;
    }
    if (type === 'hashtag' && data.views) {
      return data.views;
    }
    if (data.growth) {
      return `+${data.growth}%`;
    }
    return '';
  };

  const getMetricColor = () => {
    if (type === 'decay') return 'text-red-500';
    return 'text-green-500';
  };

  const getChartColor = () => {
    if (type === 'decay') return '#ef4444';
    return '#d41e2c';
  };

  return (
    <Card 
      className={`group hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:border-loreal-red/30 ${
        type === 'audio' && isPlaying ? 'ring-2 ring-loreal-red/30 shadow-lg' : ''
      }`}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <span className="flex items-center gap-2">
            <span 
              onClick={type === 'audio' ? handlePlayPause : undefined}
              className={type === 'audio' ? 'cursor-pointer hover:scale-110 transition-transform' : ''}
            >
              {getIcon()}
            </span>
            <span className={type === 'audio' && isPlaying ? 'text-loreal-red' : ''}>
              {getTitle()}
              {type === 'audio' && isPlaying && (
                <span className="ml-2 inline-flex items-center">
                  <span className="animate-pulse w-2 h-2 bg-loreal-red rounded-full"></span>
                  <span className="ml-1 text-xs">Playing</span>
                </span>
              )}
            </span>
          </span>
          <span className={`text-sm font-bold ${getMetricColor()}`}>
            {getMetric()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg group-hover:text-loreal-red transition-colors">
              {data.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{data.platform}</span>
              <span>•</span>
              <span>{data.demographic}</span>
            </div>
          </div>
          
          <div className="h-16">
            <LineChartComponent
              data={data.data}
              color={getChartColor()}
              height={64}
              showAxis={false}
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              Click to view all {getTitle().toLowerCase()}
            </span>
            <div className="text-xs text-loreal-red opacity-0 group-hover:opacity-100 transition-opacity">
              View More →
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
