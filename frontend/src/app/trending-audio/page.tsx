"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, TrendingUp, ArrowLeft, BarChart3, Users, Clock } from 'lucide-react';
import LineChartComponent from '@/components/LineChartComponent';
import Link from 'next/link';
import { getColorByPercentage } from '@/utils/trendUtils';
import { topTrends } from '@/lib/data';
import { useState } from 'react';

// Extended sample data for trending audios
const trendingAudios = [
  {
    id: 1,
    name: "Oh No",
    creator: "@capcut_official",
    platform: "TikTok",
    growth: 72,
    uses: "2.4M",
    duration: "0:15",
    demographic: "Gen Z",
    category: "Trending",
    data: [
      { date: '2024-09-01', value: 10 },
      { date: '2024-09-08', value: 25 },
      { date: '2024-09-15', value: 45 },
      { date: '2024-09-22', value: 62 },
      { date: '2024-09-29', value: 72 }
    ]
  },
  {
    id: 2,
    name: "Aesthetic",
    creator: "@beauty_sounds",
    platform: "Instagram",
    growth: 58,
    uses: "1.8M",
    duration: "0:30",
    demographic: "Millennials",
    category: "Beauty",
    data: [
      { date: '2024-09-01', value: 15 },
      { date: '2024-09-08', value: 28 },
      { date: '2024-09-15', value: 42 },
      { date: '2024-09-22', value: 55 },
      { date: '2024-09-29', value: 58 }
    ]
  },
  {
    id: 3,
    name: "Skincare Routine",
    creator: "@skincare_guru",
    platform: "YouTube",
    growth: 45,
    uses: "956K",
    duration: "0:45",
    demographic: "All Ages",
    category: "Educational",
    data: [
      { date: '2024-09-01', value: 20 },
      { date: '2024-09-08', value: 28 },
      { date: '2024-09-15', value: 35 },
      { date: '2024-09-22', value: 42 },
      { date: '2024-09-29', value: 45 }
    ]
  },
  {
    id: 4,
    name: "Glow Up Time",
    creator: "@makeup_artist",
    platform: "TikTok",
    growth: 38,
    uses: "1.2M",
    duration: "0:20",
    demographic: "Gen Z",
    category: "Transformation",
    data: [
      { date: '2024-09-01', value: 12 },
      { date: '2024-09-08', value: 20 },
      { date: '2024-09-15', value: 28 },
      { date: '2024-09-22', value: 35 },
      { date: '2024-09-29', value: 38 }
    ]
  },
  {
    id: 5,
    name: "K-Beauty Vibes",
    creator: "@korean_beauty",
    platform: "Instagram",
    growth: 31,
    uses: "780K",
    duration: "0:25",
    demographic: "Millennials",
    category: "K-Beauty",
    data: [
      { date: '2024-09-01', value: 18 },
      { date: '2024-09-08', value: 22 },
      { date: '2024-09-15', value: 26 },
      { date: '2024-09-22', value: 29 },
      { date: '2024-09-29', value: 31 }
    ]
  },
  {
    id: 6,
    name: "Natural Glow",
    creator: "@clean_beauty",
    platform: "TikTok",
    growth: 27,
    uses: "645K",
    duration: "0:18",
    demographic: "All Ages",
    category: "Natural",
    data: [
      { date: '2024-09-01', value: 14 },
      { date: '2024-09-08', value: 18 },
      { date: '2024-09-15', value: 22 },
      { date: '2024-09-22', value: 25 },
      { date: '2024-09-29', value: 27 }
    ]
  }
];

export default function TrendingAudioPage() {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  
  const handlePlayPause = (audioId: number, audioName: string) => {
    if (playingAudio === audioId) {
      setPlayingAudio(null);
      console.log(`Pausing audio: ${audioName}`);
    } else {
      setPlayingAudio(audioId);
      console.log(`Playing audio: ${audioName}`);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/trend-analyst">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Trend Analyst
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Play className="h-8 w-8 text-loreal-red" />
              Trending Audio
            </h1>
            <p className="text-muted-foreground">
              Discover the most popular audio tracks driving beauty content
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-loreal-red">+72%</div>
          <div className="text-sm text-muted-foreground">Growth this week</div>
        </div>
      </div>

      {/* Top Performer Highlight */}
      <Card className="border-loreal-red/20 bg-gradient-to-r from-loreal-red/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-loreal-red/10 rounded-full">
                  <Play className="h-4 w-4 text-loreal-red" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Top Performer</h3>
                  <p className="text-sm text-muted-foreground">Most trending audio this week</p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{trendingAudios[0].name}</h2>
                <p className="text-muted-foreground">by {trendingAudios[0].creator}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {trendingAudios[0].uses} uses
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {trendingAudios[0].duration}
                  </span>
                  <span className="text-green-500 font-semibold">
                    +{trendingAudios[0].growth}%
                  </span>
                </div>
              </div>
            </div>
            <div className="w-64 h-32">
              <LineChartComponent
                data={trendingAudios[0].data}
                color={getColorByPercentage(trendingAudios[0].growth)}
                height={128}
                showAxis={false}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audio List */}
      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          All Trending Audio
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {trendingAudios.map((audio) => {
            const isPlaying = playingAudio === audio.id;
            return (
              <Card key={audio.id} className={`hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer ${
                isPlaying ? 'ring-2 ring-loreal-red/30 shadow-lg' : ''
              }`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className={`p-1.5 rounded cursor-pointer hover:scale-110 transition-transform ${
                          isPlaying ? 'bg-loreal-red/20 ring-1 ring-loreal-red' : 'bg-loreal-red/10'
                        }`}
                        onClick={() => handlePlayPause(audio.id, audio.name)}
                      >
                        {isPlaying ? (
                          <Pause className="h-3 w-3 text-loreal-red" />
                        ) : (
                          <Play className="h-3 w-3 text-loreal-red" />
                        )}
                      </div>
                      <span className={`text-sm font-medium ${
                        isPlaying ? 'text-loreal-red' : 'text-muted-foreground'
                      }`}>
                        {audio.category}
                        {isPlaying && (
                          <span className="ml-2 inline-flex items-center">
                            <span className="animate-pulse w-1.5 h-1.5 bg-loreal-red rounded-full"></span>
                            <span className="ml-1 text-xs">Playing</span>
                          </span>
                        )}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-green-500">
                      +{audio.growth}%
                    </span>
                  </div>
                </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-lg">{audio.name}</h3>
                    <p className="text-sm text-muted-foreground">by {audio.creator}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{audio.platform}</span>
                    <span>•</span>
                    <span>{audio.demographic}</span>
                    <span>•</span>
                    <span>{audio.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{audio.uses} uses</span>
                    {isPlaying && (
                      <span className="text-xs text-loreal-red font-medium flex items-center gap-1">
                        <span className="animate-pulse w-2 h-2 bg-loreal-red rounded-full"></span>
                        Now Playing
                      </span>
                    )}
                  </div>
                  
                  <div className="h-16">
                    <LineChartComponent
                      data={audio.data}
                      color={getColorByPercentage(audio.growth)}
                      height={64}
                      showAxis={false}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Download Audio Report
            </Button>
            <Button variant="outline">
              Set Audio Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
