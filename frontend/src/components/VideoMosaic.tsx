"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Heart, Play } from 'lucide-react';
import { videos } from '@/lib/data';

interface FilterBy {
  audio?: string;
  keyword?: string;
  platform?: string;
}

interface VideoMosaicProps {
  selectedVideos?: string[];
  onVideoClick?: (videoId: string) => void;
  filterBy?: FilterBy;
}

export default function VideoMosaic({ selectedVideos = [], onVideoClick, filterBy }: VideoMosaicProps) {
  // Filter videos based on recipe ingredients
  const getFilteredVideos = () => {
    if (!filterBy) {
      return videos.slice(0, 6);
    }

    let filteredVideos = videos;

    // Filter by audio
    if (filterBy.audio) {
      filteredVideos = filteredVideos.filter(video => video.audioId === filterBy.audio);
    }

    // Filter by keyword
    if (filterBy.keyword) {
      filteredVideos = filteredVideos.filter(video => video.keywordId === filterBy.keyword);
    }

    // Filter by platform
    if (filterBy.platform) {
      filteredVideos = filteredVideos.filter(video => video.platform === filterBy.platform);
    }

    // If no exact matches, fall back to related videos based on individual criteria
    if (filteredVideos.length === 0) {
      filteredVideos = videos.filter(video => {
        return video.audioId === filterBy.audio || 
               video.keywordId === filterBy.keyword || 
               video.platform === filterBy.platform;
      });
    }

    // If still no matches, show most popular videos
    if (filteredVideos.length === 0) {
      filteredVideos = videos.slice().sort((a, b) => b.likes - a.likes);
    }

    return filteredVideos.slice(0, 6);
  };

  const displayVideos = getFilteredVideos();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {displayVideos.map((video) => (
        <Card 
          key={video.id} 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
          onClick={() => onVideoClick?.(video.id)}
        >
          <CardContent className="p-0">
            <div className="relative">
              {/* Placeholder for video thumbnail */}
              <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                <Play className="h-8 w-8 text-gray-400" />
              </div>
              
              {/* Duration overlay */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
              
              {/* Platform badge */}
              <div className="absolute top-2 left-2 bg-loreal-red text-white text-xs px-2 py-1 rounded">
                {video.platform}
              </div>
            </div>
            
            <div className="p-3">
              <h4 className="font-medium text-sm line-clamp-2 mb-2">
                {video.title}
              </h4>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{video.creator}</span>
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  <span>{(video.likes / 1000).toFixed(1)}K</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
