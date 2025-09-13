"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ArrowLeft, BarChart3, Hash, Share2, Heart, TrendingUp, Users, Target } from 'lucide-react';
import LineChartComponent from '@/components/LineChartComponent';
import Link from 'next/link';
import { getColorByPercentage } from '@/utils/trendUtils';

// Extended sample data for trending hashtags
const trendingHashtags = [
  {
    id: 1,
    name: "#VanillaGirl",
    category: "Makeup Trend",
    growth: 89,
    views: "2.4M",
    posts: "156K",
    engagement: "94%",
    platform: "TikTok",
    demographic: "Gen Z",
    data: [
      { date: '2024-09-01', value: 5 },
      { date: '2024-09-08', value: 15 },
      { date: '2024-09-15', value: 35 },
      { date: '2024-09-22', value: 65 },
      { date: '2024-09-29', value: 89 }
    ]
  },
  {
    id: 2,
    name: "#GlassSkin",
    category: "Skincare Goal",
    growth: 67,
    views: "3.8M",
    posts: "289K",
    engagement: "91%",
    platform: "Instagram",
    demographic: "Millennials",
    data: [
      { date: '2024-09-01', value: 25 },
      { date: '2024-09-08', value: 35 },
      { date: '2024-09-15', value: 48 },
      { date: '2024-09-22', value: 58 },
      { date: '2024-09-29', value: 67 }
    ]
  },
  {
    id: 3,
    name: "#KoreanSkincare",
    category: "Beauty Routine",
    growth: 54,
    views: "5.2M",
    posts: "423K",
    engagement: "88%",
    platform: "YouTube",
    demographic: "All Ages",
    data: [
      { date: '2024-09-01', value: 30 },
      { date: '2024-09-08', value: 38 },
      { date: '2024-09-15', value: 44 },
      { date: '2024-09-22', value: 49 },
      { date: '2024-09-29', value: 54 }
    ]
  },
  {
    id: 4,
    name: "#DewySkin",
    category: "Skin Goal",
    growth: 42,
    views: "1.9M",
    posts: "178K",
    engagement: "85%",
    platform: "TikTok",
    demographic: "Gen Z",
    data: [
      { date: '2024-09-01', value: 18 },
      { date: '2024-09-08', value: 26 },
      { date: '2024-09-15', value: 32 },
      { date: '2024-09-22', value: 38 },
      { date: '2024-09-29', value: 42 }
    ]
  },
  {
    id: 5,
    name: "#NoMakeupMakeup",
    category: "Natural Look",
    growth: 36,
    views: "1.3M",
    posts: "134K",
    engagement: "82%",
    platform: "Instagram",
    demographic: "Millennials",
    data: [
      { date: '2024-09-01', value: 20 },
      { date: '2024-09-08', value: 25 },
      { date: '2024-09-15', value: 29 },
      { date: '2024-09-22', value: 33 },
      { date: '2024-09-29', value: 36 }
    ]
  },
  {
    id: 6,
    name: "#SkincareTips",
    category: "Educational",
    growth: 29,
    views: "2.7M",
    posts: "245K",
    engagement: "79%",
    platform: "YouTube",
    demographic: "All Ages",
    data: [
      { date: '2024-09-01', value: 15 },
      { date: '2024-09-08', value: 19 },
      { date: '2024-09-15', value: 23 },
      { date: '2024-09-22', value: 26 },
      { date: '2024-09-29', value: 29 }
    ]
  }
];

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case 'TikTok': return 'text-black bg-gray-100';
    case 'Instagram': return 'text-pink-700 bg-pink-100';
    case 'YouTube': return 'text-red-700 bg-red-100';
    default: return 'text-gray-700 bg-gray-100';
  }
};

export default function TrendingHashtagsPage() {
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
              <Hash className="h-8 w-8 text-loreal-red" />
              Trending Hashtags
            </h1>
            <p className="text-muted-foreground">
              Viral hashtags driving beauty conversations worldwide
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-loreal-red">2.4M</div>
          <div className="text-sm text-muted-foreground">Peak hashtag views</div>
        </div>
      </div>

      {/* Top Performer Highlight */}
      <Card className="border-loreal-red/20 bg-gradient-to-r from-loreal-red/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-loreal-red/10 rounded-full">
                  <Eye className="h-4 w-4 text-loreal-red" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Viral Hashtag</h3>
                  <p className="text-sm text-muted-foreground">Most viewed this week</p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{trendingHashtags[0].name}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                    {trendingHashtags[0].category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {trendingHashtags[0].views} views
                  </span>
                  <span className="text-green-500 font-semibold">
                    +{trendingHashtags[0].growth}%
                  </span>
                </div>
              </div>
            </div>
            <div className="w-64 h-32">
              <LineChartComponent
                data={trendingHashtags[0].data}
                color={getColorByPercentage(trendingHashtags[0].growth)}
                height={128}
                showAxis={false}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hashtags List */}
      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          All Trending Hashtags
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {trendingHashtags.map((hashtag) => (
            <Card key={hashtag.id} className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-loreal-red/10 rounded">
                      <Hash className="h-3 w-3 text-loreal-red" />
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${getPlatformColor(hashtag.platform)}`}>
                      {hashtag.platform}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-green-500">
                    +{hashtag.growth}%
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-lg">{hashtag.name}</h3>
                    <p className="text-sm text-muted-foreground">{hashtag.category}</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      {hashtag.demographic}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>
                      <div className="font-medium text-foreground flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {hashtag.views}
                      </div>
                      <div>Views</div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground flex items-center gap-1">
                        <Share2 className="h-3 w-3" />
                        {hashtag.posts}
                      </div>
                      <div>Posts</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {hashtag.engagement} engagement
                    </span>
                  </div>
                  
                  <div className="h-16">
                    <LineChartComponent
                      data={hashtag.data}
                      color={getColorByPercentage(hashtag.growth)}
                      height={64}
                      showAxis={false}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Platform Performance Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Platform Performance Analysis</span>
            <span className="text-sm text-muted-foreground font-normal">Strategic breakdown by platform</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* TikTok Platform */}
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-900">TikTok</h3>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  +66% avg
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-600">2</span>
                  <span className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">Active Hashtags</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="font-medium text-gray-900">4.3M</div>
                    <div className="text-gray-600">Total Views</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">334K</div>
                    <div className="text-gray-600">Total Posts</div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Top Performer</span>
                    <span className="text-xs font-medium text-gray-900">#VanillaGirl</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-600">Avg Engagement</span>
                    <span className="text-xs font-medium text-gray-900">90%</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-600">Primary Demo</span>
                    <span className="text-xs font-medium text-gray-900">Gen Z</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-600">Content Focus</span>
                    <span className="text-xs font-medium text-purple-600">Beauty Trends</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instagram Platform */}
            <div className="p-6 bg-pink-50 rounded-lg border border-pink-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-pink-900">Instagram</h3>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  +52% avg
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-pink-600">2</span>
                  <span className="text-xs text-pink-700 bg-pink-100 px-2 py-1 rounded">Active Hashtags</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="font-medium text-pink-900">5.1M</div>
                    <div className="text-pink-600">Total Views</div>
                  </div>
                  <div>
                    <div className="font-medium text-pink-900">423K</div>
                    <div className="text-pink-600">Total Posts</div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-pink-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-pink-600">Top Performer</span>
                    <span className="text-xs font-medium text-pink-900">#GlassSkin</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-pink-600">Avg Engagement</span>
                    <span className="text-xs font-medium text-pink-900">87%</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-pink-600">Primary Demo</span>
                    <span className="text-xs font-medium text-pink-900">Millennials</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-pink-600">Content Focus</span>
                    <span className="text-xs font-medium text-blue-600">Skincare Goals</span>
                  </div>
                </div>
              </div>
            </div>

            {/* YouTube Platform */}
            <div className="p-6 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-red-900">YouTube</h3>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  +42% avg
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-red-600">2</span>
                  <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded">Active Hashtags</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="font-medium text-red-900">7.9M</div>
                    <div className="text-red-600">Total Views</div>
                  </div>
                  <div>
                    <div className="font-medium text-red-900">668K</div>
                    <div className="text-red-600">Total Posts</div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-red-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-red-600">Top Performer</span>
                    <span className="text-xs font-medium text-red-900">#KoreanSkincare</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-red-600">Avg Engagement</span>
                    <span className="text-xs font-medium text-red-900">84%</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-red-600">Primary Demo</span>
                    <span className="text-xs font-medium text-red-900">All Ages</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-red-600">Content Focus</span>
                    <span className="text-xs font-medium text-green-600">Education</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Platform Strategy Insights */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold mb-3 text-gray-900">Platform Strategy Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-medium text-gray-900">Highest Growth</div>
                <div className="text-lg font-bold text-gray-600">TikTok (+66%)</div>
                <div className="text-xs text-gray-600">Viral beauty trends</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-medium text-gray-900">Most Volume</div>
                <div className="text-lg font-bold text-red-600">YouTube (7.9M)</div>
                <div className="text-xs text-gray-600">Educational content hub</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-medium text-gray-900">Best Engagement</div>
                <div className="text-lg font-bold text-gray-600">TikTok (90%)</div>
                <div className="text-xs text-gray-600">Quick viral content</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-medium text-gray-900">Untapped Potential</div>
                <div className="text-lg font-bold text-pink-600">Instagram</div>
                <div className="text-xs text-gray-600">Visual aesthetic focus</div>
              </div>
            </div>
            
            {/* Demographic Breakdown */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="font-semibold mb-3 text-gray-900">Audience Demographics</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">Gen Z</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">33%</div>
                    <div className="text-xs text-purple-600">TikTok dominant</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Millennials</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">33%</div>
                    <div className="text-xs text-blue-600">Instagram focused</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">All Ages</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">33%</div>
                    <div className="text-xs text-green-600">YouTube learning</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Download Hashtag Report
            </Button>
            <Button variant="outline">
              Set Hashtag Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
