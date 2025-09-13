"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, TrendingDown, MessageSquare, BarChart3, Users, Calendar, Smile, Frown, Meh, AlertTriangle, TrendingUp, Eye, Play, Activity, Target } from 'lucide-react';
import LineChartComponent from '@/components/LineChartComponent';
import ChartRenderer from '@/components/ChartRenderer';
import TrendCard from '@/components/TrendCard';
import InfoPopup from '@/components/InfoPopup';
import ContentDurationCard from '@/components/ContentDurationCard';
import { topTrends } from '@/lib/data';
import { getTrendColor } from '@/utils/trendUtils';

// Platform Performance Data
const platformPerformanceData = [
  { date: 'Jan', TikTok: 65, Instagram: 78, YouTube: 45 },
  { date: 'Feb', TikTok: 72, Instagram: 82, YouTube: 52 },
  { date: 'Mar', TikTok: 85, Instagram: 89, YouTube: 61 },
  { date: 'Apr', TikTok: 91, Instagram: 94, YouTube: 68 },
  { date: 'May', TikTok: 89, Instagram: 91, YouTube: 72 },
  { date: 'Jun', TikTok: 94, Instagram: 96, YouTube: 75 }
];

// Sample data for the new analytics
const contentDurationData = [
  { id: 1, type: "Short Videos (15-30s)", retention: 85, clickAwayRate: 15, avgDuration: "22s", engagement: "94%" },
  { id: 2, type: "Medium Videos (30-60s)", retention: 72, clickAwayRate: 28, avgDuration: "45s", engagement: "87%" },
  { id: 3, type: "Long Videos (60s+)", retention: 45, clickAwayRate: 55, avgDuration: "1m 30s", engagement: "65%" },
  { id: 4, type: "Image Posts", retention: 78, clickAwayRate: 22, avgDuration: "8s", engagement: "76%" },
  { id: 5, type: "Carousel Posts", retention: 82, clickAwayRate: 18, avgDuration: "25s", engagement: "89%" }
];

const recurringTrendsData = [
  {
    timeSlot: "Morning (6-10 AM)",
    trends: ["Skincare Routines", "Morning Glow", "Fresh Face"],
    peakDay: "Monday",
    engagement: "78%",
    data: [
      { date: '6AM', value: 45 },
      { date: '8AM', value: 78 },
      { date: '10AM', value: 65 }
    ]
  },
  {
    timeSlot: "Afternoon (12-4 PM)",
    trends: ["Quick Touch-ups", "Lunch Break Beauty", "Work-from-Home Looks"],
    peakDay: "Wednesday",
    engagement: "65%",
    data: [
      { date: '12PM', value: 55 },
      { date: '2PM', value: 65 },
      { date: '4PM', value: 58 }
    ]
  },
  {
    timeSlot: "Evening (6-10 PM)",
    trends: ["Date Night Makeup", "Night Out Prep", "Evening Skincare"],
    peakDay: "Friday",
    engagement: "89%",
    data: [
      { date: '6PM', value: 70 },
      { date: '8PM', value: 89 },
      { date: '10PM', value: 75 }
    ]
  }
];

const sentimentData = [
  { platform: "TikTok", positive: 78, neutral: 15, negative: 7, totalComments: "2.4M" },
  { platform: "Instagram", positive: 82, neutral: 12, negative: 6, totalComments: "1.8M" },
  { platform: "YouTube", positive: 75, neutral: 18, negative: 7, totalComments: "956K" }
];

const trendDecayData = [
  {
    trend: "Clean Girl",
    status: "Early Decline",
    declineRate: -23,
    timeLeft: "2-3 months",
    severity: "moderate",
    data: [
      { date: 'Week 1', value: 100 },
      { date: 'Week 2', value: 95 },
      { date: 'Week 3', value: 85 },
      { date: 'Week 4', value: 77 }
    ]
  },
  {
    trend: "Soap Brows",
    status: "Rapid Decline",
    declineRate: -45,
    timeLeft: "2-4 weeks",
    severity: "high",
    data: [
      { date: 'Week 1', value: 80 },
      { date: 'Week 2', value: 65 },
      { date: 'Week 3', value: 50 },
      { date: 'Week 4', value: 44 }
    ]
  },
  {
    trend: "Heavy Contouring",
    status: "Critical Decline",
    declineRate: -67,
    timeLeft: "1-2 weeks",
    severity: "critical",
    data: [
      { date: 'Week 1', value: 60 },
      { date: 'Week 2', value: 45 },
      { date: 'Week 3', value: 30 },
      { date: 'Week 4', value: 20 }
    ]
  }
];

// Trend trajectory data for different trend types
const trendTrajectoryData = {
  makeup: {
    name: "Makeup Trends",
    trends: {
      "Clean Girl": {
        description: "Minimal, natural makeup look with dewy skin",
        category: "Rising",
        color: "#10b981",
        data: [
          { date: 'Jan', value: 20 },
          { date: 'Feb', value: 35 },
          { date: 'Mar', value: 52 },
          { date: 'Apr', value: 68 },
          { date: 'May', value: 75 },
          { date: 'Jun', value: 82 },
          { date: 'Jul', value: 88 },
          { date: 'Aug', value: 92 }
        ]
      },
      "Bold Lips": {
        description: "Statement lip colors and textures",
        category: "Stable",
        color: "#3b82f6",
        data: [
          { date: 'Jan', value: 65 },
          { date: 'Feb', value: 68 },
          { date: 'Mar', value: 70 },
          { date: 'Apr', value: 72 },
          { date: 'May', value: 69 },
          { date: 'Jun', value: 71 },
          { date: 'Jul', value: 70 },
          { date: 'Aug', value: 73 }
        ]
      },
      "Heavy Contouring": {
        description: "Dramatic contouring and highlighting",
        category: "Declining",
        color: "#ef4444",
        data: [
          { date: 'Jan', value: 85 },
          { date: 'Feb', value: 78 },
          { date: 'Mar', value: 65 },
          { date: 'Apr', value: 52 },
          { date: 'May', value: 45 },
          { date: 'Jun', value: 38 },
          { date: 'Jul', value: 32 },
          { date: 'Aug', value: 28 }
        ]
      }
    }
  },
  skincare: {
    name: "Skincare Trends",
    trends: {
      "Glass Skin": {
        description: "Ultra-smooth, reflective skin appearance",
        category: "Rising",
        color: "#10b981",
        data: [
          { date: 'Jan', value: 25 },
          { date: 'Feb', value: 42 },
          { date: 'Mar', value: 58 },
          { date: 'Apr', value: 72 },
          { date: 'May', value: 81 },
          { date: 'Jun', value: 87 },
          { date: 'Jul', value: 91 },
          { date: 'Aug', value: 94 }
        ]
      },
      "Slugging": {
        description: "Overnight occlusive skincare method",
        category: "Stable",
        color: "#3b82f6",
        data: [
          { date: 'Jan', value: 45 },
          { date: 'Feb', value: 48 },
          { date: 'Mar', value: 52 },
          { date: 'Apr', value: 55 },
          { date: 'May', value: 58 },
          { date: 'Jun', value: 56 },
          { date: 'Jul', value: 59 },
          { date: 'Aug', value: 61 }
        ]
      },
      "10-Step Routine": {
        description: "Multi-step Korean skincare regimen",
        category: "Declining",
        color: "#ef4444",
        data: [
          { date: 'Jan', value: 90 },
          { date: 'Feb', value: 82 },
          { date: 'Mar', value: 71 },
          { date: 'Apr', value: 58 },
          { date: 'May', value: 45 },
          { date: 'Jun', value: 38 },
          { date: 'Jul', value: 33 },
          { date: 'Aug', value: 29 }
        ]
      }
    }
  },
  haircare: {
    name: "Hair Care Trends",
    trends: {
      "Hair Oiling": {
        description: "Pre-wash oil treatments for hair health",
        category: "Rising",
        color: "#10b981",
        data: [
          { date: 'Jan', value: 30 },
          { date: 'Feb', value: 45 },
          { date: 'Mar', value: 62 },
          { date: 'Apr', value: 74 },
          { date: 'May', value: 83 },
          { date: 'Jun', value: 88 },
          { date: 'Jul', value: 92 },
          { date: 'Aug', value: 96 }
        ]
      },
      "Scalp Care": {
        description: "Dedicated scalp treatments and massages",
        category: "Stable",
        color: "#3b82f6",
        data: [
          { date: 'Jan', value: 55 },
          { date: 'Feb', value: 58 },
          { date: 'Mar', value: 62 },
          { date: 'Apr', value: 65 },
          { date: 'May', value: 67 },
          { date: 'Jun', value: 69 },
          { date: 'Jul', value: 68 },
          { date: 'Aug', value: 71 }
        ]
      },
      "Heat Styling": {
        description: "High-heat styling tools and techniques",
        category: "Declining",
        color: "#ef4444",
        data: [
          { date: 'Jan', value: 78 },
          { date: 'Feb', value: 72 },
          { date: 'Mar', value: 65 },
          { date: 'Apr', value: 58 },
          { date: 'May', value: 52 },
          { date: 'Jun', value: 48 },
          { date: 'Jul', value: 43 },
          { date: 'Aug', value: 39 }
        ]
      }
    }
  },
  wellness: {
    name: "Beauty Wellness",
    trends: {
      "Gua Sha": {
        description: "Facial massage with stone tools",
        category: "Rising",
        color: "#10b981",
        data: [
          { date: 'Jan', value: 22 },
          { date: 'Feb', value: 38 },
          { date: 'Mar', value: 55 },
          { date: 'Apr', value: 69 },
          { date: 'May', value: 78 },
          { date: 'Jun', value: 84 },
          { date: 'Jul', value: 89 },
          { date: 'Aug', value: 93 }
        ]
      },
      "Face Yoga": {
        description: "Facial exercises for anti-aging",
        category: "Stable",
        color: "#3b82f6",
        data: [
          { date: 'Jan', value: 40 },
          { date: 'Feb', value: 43 },
          { date: 'Mar', value: 46 },
          { date: 'Apr', value: 49 },
          { date: 'May', value: 51 },
          { date: 'Jun', value: 48 },
          { date: 'Jul', value: 50 },
          { date: 'Aug', value: 52 }
        ]
      },
      "Detox Masks": {
        description: "Clay and charcoal purifying treatments",
        category: "Declining",
        color: "#ef4444",
        data: [
          { date: 'Jan', value: 70 },
          { date: 'Feb', value: 65 },
          { date: 'Mar', value: 58 },
          { date: 'Apr', value: 51 },
          { date: 'May', value: 46 },
          { date: 'Jun', value: 41 },
          { date: 'Jul', value: 37 },
          { date: 'Aug', value: 34 }
        ]
      }
    }
  }
};

export default function TrendAnalyst() {
  const [selectedTrendType, setSelectedTrendType] = useState('makeup');
  const [selectedTrend, setSelectedTrend] = useState('Clean Girl');

  // Handle trend type change
  const handleTrendTypeChange = (value: string) => {
    setSelectedTrendType(value);
    // Set first trend of the selected type as default
    const firstTrend = Object.keys(trendTrajectoryData[value as keyof typeof trendTrajectoryData].trends)[0];
    setSelectedTrend(firstTrend);
  };

  const getCurrentTrendData = () => {
    const trendType = trendTrajectoryData[selectedTrendType as keyof typeof trendTrajectoryData];
    return trendType?.trends[selectedTrend as keyof typeof trendType.trends];
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <BarChart3 className="h-8 w-8 text-loreal-red" />
          Advanced Trend Analytics
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Deep insights into content performance, timing patterns, sentiment analysis, and trend lifecycle monitoring
        </p>
      </div>

      {/* Top Trends Grid */}
      <div>
        <h2 className="text-3xl font-bold mb-2">Top Trends</h2>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Each mini line graph shows the trend's popularity score (0-100) over the past 8 months. 
            The percentage indicates overall growth/decline during this period.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TrendCard type="audio" data={topTrends.audio} />
          <TrendCard type="keyword" data={topTrends.keyword} />
          <TrendCard type="hashtag" data={topTrends.hashtag} />
          <TrendCard type="decay" data={topTrends.decay} />
        </div>
      </div>

      {/* Platform Performance Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-loreal-red" />
                Platform Engagement Rate Trends
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Average engagement rate (likes + shares + comments ÷ total views) per platform over time
              </p>
            </div>
            <InfoPopup
              title="Engagement Rate Calculation"
              description="Engagement Rate = (Total Likes + Shares + Comments) ÷ Total Views × 100. This metric shows how actively users interact with beauty content on each platform. Higher rates indicate stronger audience connection and content effectiveness."
              side="left"
            >
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <span>How is this calculated?</span>
              </div>
            </InfoPopup>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span>TikTok</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                <span>Instagram</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>YouTube</span>
              </div>
            </div>
            <div className="h-80">
              <ChartRenderer
                data={platformPerformanceData}
                height={320}
                showAxis={true}
                showGrid={true}
                chartType="bar"
                animated={true}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="font-semibold text-purple-600">TikTok</p>
                <p className="text-muted-foreground">94% engagement rate</p>
                <p className="text-xs text-purple-500">High viral potential</p>
              </div>
              <div className="p-3 bg-pink-50 rounded-lg">
                <p className="font-semibold text-pink-600">Instagram</p>
                <p className="text-muted-foreground">96% engagement rate</p>
                <p className="text-xs text-pink-500">Highest performance</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="font-semibold text-red-600">YouTube</p>
                <p className="text-muted-foreground">75% engagement rate</p>
                <p className="text-xs text-red-500">Steady growth trend</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Duration & Retention Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-loreal-red" />
            Content Duration & Consumer Retention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {contentDurationData.map((content) => (
              <ContentDurationCard
                key={content.id}
                type={content.type}
                retention={content.retention}
                clickAwayRate={content.clickAwayRate}
                avgDuration={content.avgDuration}
                engagement={content.engagement}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recurring Trends & Time-based Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-loreal-red" />
            Recurring Trends & Time Patterns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Small charts show engagement patterns across time slots. Values represent engagement percentages, with higher peaks indicating stronger audience activity.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {recurringTrendsData.map((timeData, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">{timeData.timeSlot}</h3>
                  <p className="text-sm text-muted-foreground">Peak: {timeData.peakDay}s</p>
                  </div>
                
                <div className="space-y-2 mb-4">
                  <h4 className="font-medium text-sm">Trending Topics:</h4>
                  {timeData.trends.map((trend, idx) => (
                    <span key={idx} className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded mr-2">
                      {trend}
                    </span>
                  ))}
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Engagement Rate</span>
                    <span className="font-semibold text-loreal-red">{timeData.engagement}</span>
                  </div>
                  <div className="h-16">
                    <LineChartComponent
                      data={timeData.data}
                      color={getTrendColor(timeData.data)}
                      height={64}
                      showAxis={false}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sentiment Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-loreal-red" />
            Sentiment Analysis from Comments & Ratings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Pie charts display sentiment distribution across platforms from user comments and ratings.
            </p>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
            {/* Charts Section */}
            <div className="xl:col-span-2">
              <div className="grid grid-cols-1 gap-6">
                {sentimentData.map((platform, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">{platform.platform}</h3>
                      <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                        {platform.totalComments} comments
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      {/* Pie Chart */}
                      <div className="flex justify-center">
                        <div className="w-48 h-48">
                          <ChartRenderer
                            data={[platform]}
                            chartType="pie"
                            height={192}
                            animated={true}
                          />
                        </div>
                      </div>
                      
                      {/* Percentage Breakdown */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-700">Positive</span>
                          </div>
                          <span className="text-lg font-bold text-green-600">{platform.positive}%</span>
                        </div>
                        
                        <div className="flex items-center justify-between py-2 px-3 bg-yellow-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-700">Neutral</span>
                          </div>
                          <span className="text-lg font-bold text-yellow-600">{platform.neutral}%</span>
                        </div>
                        
                        <div className="flex items-center justify-between py-2 px-3 bg-red-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-700">Negative</span>
                          </div>
                          <span className="text-lg font-bold text-red-600">{platform.negative}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sentiment Insights Section */}
            <div className="xl:col-span-1">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Sentiment Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <Smile className="h-4 w-4" />
                      Top Positive Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["glowing", "amazing", "perfect", "love it", "game changer"].map((keyword, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-200 text-green-800 text-xs rounded-full font-medium">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <Frown className="h-4 w-4" />
                      Common Concerns
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["too expensive", "doesn't work", "skin irritation", "false claims"].map((concern, idx) => (
                        <span key={idx} className="px-3 py-1 bg-red-200 text-red-800 text-xs rounded-full font-medium">
                          {concern}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Platform Insights
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span><strong>Instagram:</strong> More detailed reviews with before/after photos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span><strong>TikTok:</strong> Quick reactions, viral sharing patterns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span><strong>YouTube:</strong> In-depth tutorials and honest long-term reviews</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Recommendation
                    </h4>
                    <p className="text-sm text-purple-700 leading-relaxed">
                      Instagram shows highest positive sentiment (82%). Focus content strategy on this platform for maximum brand perception impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trend Trajectory Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-loreal-red" />
            Trend Trajectory Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-6">
              {/* Trend Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Trend Category</label>
                  <Select value={selectedTrendType} onValueChange={handleTrendTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trend category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(trendTrajectoryData).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Specific Trend</label>
                  <Select value={selectedTrend} onValueChange={setSelectedTrend}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specific trend" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(trendTrajectoryData[selectedTrendType as keyof typeof trendTrajectoryData].trends).map(([key, trend]) => (
                        <SelectItem key={key} value={key}>
                          {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Selected Trend Display */}
              {(() => {
                const currentTrend = getCurrentTrendData() as any;
                if (!currentTrend) return null;

                const getCategoryIcon = (category: string) => {
                  switch (category) {
                    case 'Rising': return <TrendingUp className="h-4 w-4 text-green-600" />;
                    case 'Stable': return <Eye className="h-4 w-4 text-blue-600" />;
                    case 'Declining': return <TrendingDown className="h-4 w-4 text-red-600" />;
                    default: return <Activity className="h-4 w-4 text-gray-600" />;
                  }
                };

                const getCategoryColor = (category: string) => {
                  switch (category) {
                    case 'Rising': return 'bg-green-50 border-green-200 text-green-800';
                    case 'Stable': return 'bg-blue-50 border-blue-200 text-blue-800';
                    case 'Declining': return 'bg-red-50 border-red-200 text-red-800';
                    default: return 'bg-gray-50 border-gray-200 text-gray-800';
                  }
                };

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Trend Info */}
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold">{selectedTrend}</h3>
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getCategoryColor(currentTrend.category)}`}>
                            {getCategoryIcon(currentTrend.category)}
                            {currentTrend.category}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          {currentTrend.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Current Score</div>
                            <div className="text-2xl font-bold" style={{ color: currentTrend.color }}>
                              {currentTrend.data[currentTrend.data.length - 1].value}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              out of 100 (popularity index)
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Growth Rate</div>
                            <div className="text-2xl font-bold" style={{ color: currentTrend.color }}>
                              {(() => {
                                const first = currentTrend.data[0].value;
                                const last = currentTrend.data[currentTrend.data.length - 1].value;
                                const change = ((last - first) / first * 100).toFixed(1);
                                return `${Number(change) > 0 ? '+' : ''}${change}%`;
                              })()}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              change over 8 months
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Insights */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">Trend Insights</h4>
                        <div className="space-y-2 text-sm">
                          {currentTrend.category === 'Rising' && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded">
                              <div className="flex items-center gap-2 font-medium text-green-800">
                                <TrendingUp className="h-4 w-4" />
                                Growth Opportunity
                              </div>
                              <p className="text-green-700 mt-1">
                                This trend shows strong upward momentum. Consider increasing investment in related content and campaigns.
                              </p>
                            </div>
                          )}
                          {currentTrend.category === 'Stable' && (
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                              <div className="flex items-center gap-2 font-medium text-blue-800">
                                <Eye className="h-4 w-4" />
                                Steady Performance
                              </div>
                              <p className="text-blue-700 mt-1">
                                This trend maintains consistent engagement. Perfect for ongoing campaigns with reliable ROI.
                              </p>
                            </div>
                          )}
                          {currentTrend.category === 'Declining' && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded">
                              <div className="flex items-center gap-2 font-medium text-red-800">
                                <TrendingDown className="h-4 w-4" />
                                Declining Interest
                              </div>
                              <p className="text-red-700 mt-1">
                                This trend is losing popularity. Consider pivoting resources to emerging alternatives.
                              </p>
              </div>
            )}
                        </div>
                      </div>
          </div>

                    {/* Chart */}
                    <div className="space-y-4">
                      {/* Header with title and info popup */}
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Social Media Trend Score (8 Months)</h4>
                        <InfoPopup
                          title="Trend Score Calculation"
                          description="Combines social media mentions, hashtag usage, influencer adoption, and search volume into a 0-100 score. Higher scores indicate stronger trend momentum across platforms."
                          side="left"
                        >
                          <div className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer">
                            What does this measure?
                          </div>
                        </InfoPopup>
                      </div>
                      
                      {/* Subtitle */}
                      <p className="text-sm text-gray-600 mb-4">
                        Aggregated score from TikTok mentions, Instagram hashtags, Google searches, and influencer posts
                      </p>
                      
                      {/* Chart with axis labels */}
                      <div className="relative">
                        {/* Y-Axis Label */}
                        <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500 whitespace-nowrap">
                          Trend Score (0-100)
                        </div>
                        
                        <div className="h-64">
                          <LineChartComponent
                            data={currentTrend.data}
                            color={currentTrend.color}
                            height={256}
                            showAxis={true}
                          />
                        </div>
                        
                        {/* X-Axis Label */}
                        <div className="text-center text-xs text-gray-500 mt-2">
                          Months (2024)
                        </div>
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center text-sm">
                        <InfoPopup
                          title="Peak Trend Score"
                          description="The highest social media trend score achieved during the 8-month period. Combines mentions across TikTok, Instagram, Google searches, and influencer posts. Use this to identify trends with the greatest viral potential."
                          side="top"
                        >
                          <div className="p-3 border rounded transition-colors hover:bg-gray-50">
                            <div className="font-medium text-muted-foreground">Peak Trend Score</div>
                            <div className="text-lg font-bold" style={{ color: currentTrend.color }}>
                              {Math.max(...currentTrend.data.map((d: any) => d.value))}
                            </div>
                          </div>
                        </InfoPopup>

                        <InfoPopup
                          title="Low Trend Score"
                          description="The lowest social media trend score recorded during the 8-month period. Helps identify the trend's baseline popularity and potential decline points. A higher low score indicates more consistent mainstream appeal."
                          side="top"
                        >
                          <div className="p-3 border rounded transition-colors hover:bg-gray-50">
                            <div className="font-medium text-muted-foreground">Low Trend Score</div>
                            <div className="text-lg font-bold" style={{ color: currentTrend.color }}>
                              {Math.min(...currentTrend.data.map((d: any) => d.value))}
                            </div>
                          </div>
                        </InfoPopup>

                        <InfoPopup
                          title="Trend Volatility"
                          description="Measures how much the trend's social media score fluctuates over the 8-month period. Higher volatility indicates unpredictable trends that may spike or fade quickly. Lower volatility suggests stable, consistent popularity that's safer for long-term marketing campaigns."
                          side="top"
                        >
                          <div className="p-3 border rounded transition-colors hover:bg-gray-50">
                            <div className="font-medium text-muted-foreground">Trend Volatility</div>
                            <div className="text-lg font-bold" style={{ color: currentTrend.color }}>
                              {(() => {
                                const values = currentTrend.data.map((d: any) => d.value);
                                const avg = values.reduce((a: any, b: any) => a + b, 0) / values.length;
                                const variance = values.reduce((acc: any, val: any) => acc + Math.pow(val - avg, 2), 0) / values.length;
                                const volatility = Math.sqrt(variance);
                                return volatility.toFixed(1);
                              })()}
                            </div>
                          </div>
                        </InfoPopup>
                      </div>
                    </div>
                  </div>
                );
              })()}
          </div>
        </CardContent>
      </Card>

      {/* Trend Decay Detection */}
      <Card>
          <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            Trend Decay Detection & Monitoring
          </CardTitle>
          </CardHeader>
          <CardContent>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Mini charts show trend popularity decline over time. Values represent decline percentages, with steeper slopes indicating faster decay rates.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {trendDecayData.map((trend, index) => {
              const getSeverityColor = (severity: string) => {
                switch (severity) {
                  case 'moderate': return 'border-yellow-200 bg-yellow-50';
                  case 'high': return 'border-orange-200 bg-orange-50';
                  case 'critical': return 'border-red-200 bg-red-50';
                  default: return 'border-gray-200 bg-gray-50';
                }
              };

              const getSeverityTextColor = (severity: string) => {
                switch (severity) {
                  case 'moderate': return 'text-yellow-800';
                  case 'high': return 'text-orange-800';
                  case 'critical': return 'text-red-800';
                  default: return 'text-gray-800';
                }
              };

              return (
                <div key={index} className={`border rounded-lg p-4 ${getSeverityColor(trend.severity)}`}>
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg">{trend.trend}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-sm font-medium ${getSeverityTextColor(trend.severity)}`}>
                        {trend.status}
                      </span>
                      <span className="text-sm text-red-600 font-semibold">
                        {trend.declineRate}%
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground mb-2">Estimated Time Left</div>
                    <div className="text-lg font-semibold">{trend.timeLeft}</div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground mb-2">Decline Trajectory</div>
                    <div className="h-16">
                      <LineChartComponent
                        data={trend.data}
                        color="#dc2626"
                        height={64}
                        showAxis={false}
                      />
                    </div>
                  </div>

                <Button
                    size="sm" 
                  variant="outline"
                    className={`w-full ${trend.severity === 'critical' ? 'border-red-500 text-red-700 hover:bg-red-50' : ''}`}
                >
                    <AlertTriangle className="h-3 w-3 mr-2" />
                    Set Alert
                </Button>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Decay Detection Alerts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                <span>Early decline detected (1 trend)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-orange-500 rounded-full"></div>
                <span>Rapid decline alert (1 trend)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
                <span>Critical decline warning (1 trend)</span>
              </div>
            </div>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}
