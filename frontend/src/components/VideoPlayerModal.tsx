"use client";

import { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    id: string;
    title: string;
    thumbnailUrl: string;
    videoUrl: string;
    creator: string;
    duration: string;
    platform: string;
    likes: number;
  } | null;
}

export default function VideoPlayerModal({ isOpen, onClose, video }: VideoPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !video) return null;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setDuration(e.currentTarget.duration);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{video.title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="relative">
          <video
            className="w-full h-auto max-h-[60vh]"
            poster={video.thumbnailUrl}
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          >
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{video.creator}</span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">{video.platform}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>❤️</span>
              <span>{(video.likes / 1000).toFixed(1)}K</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Duration: {video.duration}
          </div>
        </CardContent>
      </div>
    </div>
  );
}
