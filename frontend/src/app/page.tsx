"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TrendCard from '@/components/TrendCard';
import LineChartComponent from '@/components/LineChartComponent';
import { topTrends, comparisonChartData, heroInsight } from '@/lib/data';
import { useGlobalStore } from '@/lib/store';
import { TrendingUp, AlertTriangle, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const { isGlobalView } = useGlobalStore();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Banner */}
      <Card className="bg-gradient-to-r from-loreal-red to-loreal-red-light text-white">
        <CardContent className="p-8">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                <h1 className="text-2xl font-bold">{heroInsight.title}</h1>
              </div>
              <p className="text-lg opacity-90 max-w-2xl">
                {heroInsight.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 px-4 py-2 rounded-lg">
                  <span className="font-semibold">{heroInsight.metric}</span>
                </div>
                <Button variant="secondary" className="bg-white text-loreal-red hover:bg-gray-100">
                  {heroInsight.action}
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <TrendingUp className="h-16 w-16 opacity-50" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current View Indicator */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Viewing:</span>
        <span className="font-medium text-loreal-red">
          {isGlobalView ? 'Global Market' : 'Malaysia Market'}
        </span>
      </div>

      {/* Top Trends Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Top Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TrendCard type="audio" data={topTrends.audio} />
          <TrendCard type="keyword" data={topTrends.keyword} />
          <TrendCard type="hashtag" data={topTrends.hashtag} />
          <TrendCard type="decay" data={topTrends.decay} />
        </div>
      </div>

      {/* Comparative Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Trend Trajectory: #VanillaGirl (Malaysia vs Global)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span>Global</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-loreal-red"></div>
                <span>Malaysia</span>
              </div>
            </div>
            <div className="h-80">
              <LineChartComponent
                data={comparisonChartData}
                height={320}
                showAxis={true}
                showGrid={true}
                isComparison={true}
              />
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Trend Insight</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Malaysia is now leading the #VanillaGirl trend, showing 62% engagement 
                    while global markets are declining to 30%. This presents a unique 
                    opportunity for localized campaigns.
                  </p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Sparkles className="h-6 w-6" />
              <span>Create Recipe</span>
              <span className="text-xs text-muted-foreground">Build trend combinations</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>Analyze Trends</span>
              <span className="text-xs text-muted-foreground">Chat with AI analyst</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              <span>View Alerts</span>
              <span className="text-xs text-muted-foreground">Check trend warnings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
