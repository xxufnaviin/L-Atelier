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
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 w-full hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#d473e6', borderColor: '#d473e6', color: 'white' }}
          >
            <Sparkles className="h-6 w-6" />
            <span className="font-medium">Create Recipe</span>
            <span className="text-xs opacity-90">Build trend combinations</span>
          </Button>
        </Link>
        <Link href="/recipe-builder">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 w-full hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#b6e0d4', borderColor: '#b6e0d4', color: '#1f2937' }}
          >
            <Play className="h-6 w-6" />
            <span className="font-medium">Generate Video</span>
            <span className="text-xs opacity-80">Create trending videos</span>
          </Button>
        </Link>
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 w-full hover:opacity-90 transition-opacity" 
          onClick={openChat}
          style={{ backgroundColor: '#fae97a', borderColor: '#fae97a', color: '#1f2937' }}
        >
          <Bot className="h-6 w-6" />
          <span className="font-medium">AI Insights</span>
          <span className="text-xs opacity-80">Chat with AI analyst</span>
        </Button>
        <Link href="/trend-analyst">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 w-full hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#f1c5fa', borderColor: '#f1c5fa', color: '#1f2937' }}
          >
            <TrendingUp className="h-6 w-6" />
            <span className="font-medium">Analyze Trends</span>
            <span className="text-xs opacity-80">Deep trend analytics</span>
          </Button>
        </Link>
        <Link href="/trending-keywords">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2 w-full hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#fac5d7', borderColor: '#fac5d7', color: '#1f2937' }}
          >
            <Hash className="h-6 w-6" />
            <span className="font-medium">Browse Keywords</span>
            <span className="text-xs opacity-80">Explore trending terms</span>
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
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-10 shadow-lg border border-gray-200">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                      {/* Left: Hashtag and Platform */}
                      <div className="text-center lg:text-left flex-1">
                        <div className="inline-flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full shadow-sm mb-3">
                          <div className="w-1.5 h-1.5 bg-loreal-red rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium text-gray-600">LIVE TRENDING</span>
                        </div>
                        <h3 className="text-2xl font-bold text-loreal-red mb-3 tracking-tight">{trend.name}</h3>
                        <div className="flex items-center justify-center lg:justify-start gap-2">
                          <span className="text-gray-600 text-base">Trending on</span>
                          <span className="bg-black text-white px-3 py-1 rounded-full text-base font-semibold">{trend.platform}</span>
                        </div>
                      </div>
                      
                      {/* Center: Metrics */}
                      <div className="flex gap-6 flex-1 justify-center">
                        <div className="text-center bg-white/70 rounded-xl p-4 shadow-md border border-green-200 min-w-[100px]">
                          <p className="text-2xl font-bold text-green-600 mb-1">{trend.engagement}</p>
                          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Engagement</p>
                        </div>
                        <div className="text-center bg-white/70 rounded-xl p-4 shadow-md border border-blue-200 min-w-[100px]">
                          <p className="text-2xl font-bold text-blue-600 mb-1">{trend.growth}</p>
                          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Growth</p>
                        </div>
                      </div>
                      
                      {/* Right: Action Button */}
                      <div className="flex justify-center flex-1">
                        <Link href={`/trending-hashtags`}>
                          <Button className="bg-loreal-red hover:bg-loreal-red/90 text-white px-4 py-4 rounded-md font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                            <Eye className="h-5 w-5 mr-3" />
                            View Details
                          </Button>
                        </Link>
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
