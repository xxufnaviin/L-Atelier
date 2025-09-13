"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LineChartComponent from '@/components/LineChartComponent';
import InfoPopup from '@/components/InfoPopup';
import { comparisonChartData, heroInsight, dataByRegion } from '@/lib/data';
import { useGlobalStore } from '@/lib/store';
import { TrendingUp, Hash, Sparkles, AlertTriangle, Play, Bot, Eye, Users, Clock, BarChart3, Target, Award, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { isGlobalView, openChat } = useGlobalStore();
  const [currentTrendIndex, setCurrentTrendIndex] = useState(0);
  
  // Get regional data based on toggle state
  const currentRegion = isGlobalView ? 'global' : 'malaysia';
  const regionData = dataByRegion[currentRegion];
  
  // Add icons to performance metrics dynamically
  const performanceMetrics = regionData.performanceMetrics.map((metric, index) => ({
    ...metric,
    icon: [Target, Users, Play, Award][index] // Map icons in order
  }));
  
  const latestTrends = regionData.latestTrends;
  const currentHeroInsight = regionData.heroInsight;

  // Auto-scroll latest trends
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrendIndex((prev) => (prev + 1) % latestTrends.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Banner */}
      <Card className="bg-gradient-to-r from-loreal-red to-loreal-red-light text-white">
        <CardContent className="p-8">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                <h1 className="text-2xl font-bold">{currentHeroInsight.title}</h1>
              </div>
              <p className="text-lg opacity-90 max-w-2xl">
                {currentHeroInsight.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">{currentHeroInsight.metric}</span>
                </div>
                <a 
                  href={isGlobalView ? "/recipe-builder" : "/recipe-builder?trend=VanillaGirl"}
                  className="bg-white hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  {isGlobalView ? 'Explore Global Trends' : 'Get Trend Recipe'}
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <TrendingUp className="h-16 w-16 opacity-50" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Link href="/recipe-builder">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
            <Sparkles className="h-6 w-6" />
            <span className="font-medium">Create Recipe</span>
            <span className="text-xs text-muted-foreground">Build trend combinations</span>
          </Button>
        </Link>
        <Link href="/recipe-builder">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
            <Play className="h-6 w-6" />
            <span className="font-medium">Generate Video</span>
            <span className="text-xs text-muted-foreground">Create trending videos</span>
          </Button>
        </Link>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full" onClick={openChat}>
          <Bot className="h-6 w-6" />
          <span className="font-medium">AI Insights</span>
          <span className="text-xs text-muted-foreground">Chat with AI analyst</span>
        </Button>
        <Link href="/trend-analyst">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
            <TrendingUp className="h-6 w-6" />
            <span className="font-medium">Analyze Trends</span>
            <span className="text-xs text-muted-foreground">Deep trend analytics</span>
          </Button>
        </Link>
        <Link href="/trending-keywords">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
            <Hash className="h-6 w-6" />
            <span className="font-medium">Browse Keywords</span>
            <span className="text-xs text-muted-foreground">Explore trending terms</span>
          </Button>
        </Link>
      </div>

      {/* Latest Trends (Auto-scroll) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-loreal-red" />
              Latest Trending Now
            </div>
            <div className="flex items-center gap-1">
              {latestTrends.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTrendIndex ? 'bg-loreal-red' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTrendIndex * 100}%)` }}
            >
              {latestTrends.map((trend, index) => (
                <div key={trend.id} className="min-w-full">
                  <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                      {/* Main Trend Info */}
                      <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-start gap-6">
                          <div className="w-16 h-24 bg-white border border-gray-200 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg">
                              <Sparkles className="h-6 w-6 text-gray-600" />
                          </div>
                          <div className="flex-1 flex flex-col justify-between min-h-[98px]">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">{trend.name}</h3>
                              <p className="text-sm text-gray-600 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                                Trending on {trend.platform}
                              </p>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>2h ago</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>Active now</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="lg:col-span-2 flex justify-center">
                        <div className="grid grid-cols-2 gap-4 max-w-2xl">
                          <div className="text-left p-4 bg-green-50 rounded-lg border border-green-200 h-full">
                            <div className="flex items-center gap-2 mb-3">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-green-700">Engagement</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-3xl font-bold text-green-600">{trend.engagement}</p>
                              <p className="text-xs text-green-600">+12% from yesterday</p>
                            </div>
                          </div>
                          <div className="text-left p-4 bg-blue-50 rounded-lg border border-blue-200 h-full">
                            <div className="flex items-center gap-2 mb-3">
                              <BarChart3 className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-700">Growth</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-3xl font-bold text-blue-600">{trend.growth}</p>
                              <p className="text-xs text-blue-600">+8% this week</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="lg:col-span-1">
                        <div className="space-y-4">
                          <Link href="/recipe-builder">
                            <Button variant="ghost" className="w-full h-11 hover:text-loreal-red transition-colors">
                              <Sparkles className="h-4 w-4 mr-2" />
                              Get Trend Recipe
                            </Button>
                          </Link>
                          <Link href={`/trending-hashtags`}>
                            <Button className="w-full bg-loreal-red hover:bg-loreal-red/90 text-white h-11">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparative Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <span>Trend Information: <span className="text-loreal-red font-bold">#VanillaGirl</span></span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Key Performance Indicators */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Key Performance Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">{metric.title}</p>
                          <p className="text-xl font-bold">{metric.value}</p>
                          <p className={`text-xs font-medium ${metric.color}`}>
                            {metric.change} from last month
                          </p>
                        </div>
                        <div className={`p-2 rounded-full bg-gray-100 ${metric.color}`}>
                          <metric.icon className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              {/* Header with title and info popup */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-loreal-red" />
                    Market Engagement Comparison
                  </h3>
                </div>
                <InfoPopup
                  title="Market Engagement Calculation"
                  description="Combines social media mentions, hashtag usage, search volume, and influencer adoption metrics to create a comprehensive engagement score comparing global vs Malaysian beauty trend performance."
                  side="left"
                >
                  <div className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer">
                    How is this calculated?
                  </div>
                </InfoPopup>
              </div>
              
              {/* Subtitle */}
              <p className="text-sm text-gray-600 mb-4">
                Comparative beauty trend engagement scores across global vs Malaysian markets over time
              </p>
              
              {/* Legend */}
              <div className="flex items-center gap-6 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span>Global</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-loreal-red"></div>
                  <span>Malaysia</span>
                </div>
              </div>
              
              {/* Chart with axis labels */}
              <div className="relative">
                {/* Y-Axis Label */}
                <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500 whitespace-nowrap">
                  Engagement Score (%)
                </div>
                
                <div className="h-80 pt-4">
                  <LineChartComponent
                    data={comparisonChartData}
                    height={300}
                    showAxis={true}
                    showGrid={true}
                    isComparison={true}
                  />
                </div>
                
                {/* X-Axis Label */}
                <div className="text-center text-xs text-gray-500 mt-2">
                  Month (2024)
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">{regionData.trendInsight.title}</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    {regionData.trendInsight.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
