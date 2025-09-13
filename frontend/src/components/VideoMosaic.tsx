"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Play } from 'lucide-react';
import { videos } from '@/lib/data';
import VideoPlayerModal from './VideoPlayerModal';

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
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    onVideoClick?.(video.id);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {displayVideos.map((video) => (
          <Card 
            key={video.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => handleVideoClick(video)}
          >
          <CardContent className="p-0">
            <div className="relative">
              {/* Video thumbnail */}
              <div className="w-full h-32 rounded-t-lg overflow-hidden group relative">
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center" style={{ display: 'none' }}>
                  <Play className="h-8 w-8 text-gray-400" />
                </div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-white bg-opacity-90 rounded-full p-3">
                      <Play className="h-6 w-6 text-gray-700" />
                    </div>
                  </div>
                </div>
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
      
      <VideoPlayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        video={selectedVideo}
      />
    </>
  );
}
