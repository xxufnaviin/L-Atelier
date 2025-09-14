"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, ArrowLeft, BarChart3, Hash, Search, Target } from 'lucide-react';
import LineChartComponent from '@/components/LineChartComponent';
import Link from 'next/link';
import { getColorByPercentage } from '@/utils/trendUtils';

// Extended sample data for trending keywords
const trendingKeywords = [
  {
    id: 1,
    name: "Glass Skin",
    category: "Skincare",
    growth: 45,
    mentions: "1.8M",
    engagement: "89%",
    difficulty: "Medium",
    searchVolume: "125K",
    data: [
      { date: '2024-09-01', value: 20 },
      { date: '2024-09-08', value: 28 },
      { date: '2024-09-15', value: 35 },
      { date: '2024-09-22', value: 40 },
      { date: '2024-09-29', value: 45 }
    ]
  },
  {
    id: 2,
    name: "Vanilla Girl",
    category: "Makeup",
    growth: 89,
    mentions: "2.4M",
    engagement: "94%",
    difficulty: "High",
    searchVolume: "89K",
    data: [
      { date: '2024-09-01', value: 5 },
      { date: '2024-09-08', value: 15 },
      { date: '2024-09-15', value: 35 },
      { date: '2024-09-22', value: 65 },
      { date: '2024-09-29', value: 89 }
    ]
  },
  {
    id: 3,
    name: "Korean Skincare",
    category: "Skincare",
    growth: 67,
    mentions: "3.2M",
    engagement: "91%",
    difficulty: "High",
    searchVolume: "156K",
    data: [
      { date: '2024-09-01', value: 25 },
      { date: '2024-09-08', value: 35 },
      { date: '2024-09-15', value: 48 },
      { date: '2024-09-22', value: 58 },
      { date: '2024-09-29', value: 67 }
    ]
  },
  {
    id: 4,
    name: "Dewy Makeup",
    category: "Makeup",
    growth: 52,
    mentions: "1.6M",
    engagement: "87%",
    difficulty: "Medium",
    searchVolume: "98K",
    data: [
      { date: '2024-09-01', value: 18 },
      { date: '2024-09-08', value: 28 },
      { date: '2024-09-15', value: 38 },
      { date: '2024-09-22', value: 45 },
      { date: '2024-09-29', value: 52 }
    ]
  },
  {
    id: 5,
    name: "Natural Glow",
    category: "Lifestyle",
    growth: 34,
    mentions: "945K",
    engagement: "82%",
    difficulty: "Low",
    searchVolume: "67K",
    data: [
      { date: '2024-09-01', value: 22 },
      { date: '2024-09-08', value: 26 },
      { date: '2024-09-15', value: 29 },
      { date: '2024-09-22', value: 32 },
      { date: '2024-09-29', value: 34 }
    ]
  },
  {
    id: 6,
    name: "Minimalist Beauty",
    category: "Lifestyle",
    growth: 28,
    mentions: "678K",
    engagement: "79%",
    difficulty: "Low",
    searchVolume: "45K",
    data: [
      { date: '2024-09-01', value: 15 },
      { date: '2024-09-08', value: 19 },
      { date: '2024-09-15', value: 23 },
      { date: '2024-09-22', value: 26 },
      { date: '2024-09-29', value: 28 }
    ]
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'High': return 'text-red-500 bg-red-50 border-red-200';
    case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'Low': return 'text-green-600 bg-green-50 border-green-200';
    default: return 'text-gray-500 bg-gray-50 border-gray-200';
  }
};

export default function TrendingKeywordsPage() {
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
              Trending Keywords
            </h1>
            <p className="text-muted-foreground">
              Most searched and mentioned beauty keywords across platforms
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-loreal-red">+89%</div>
          <div className="text-sm text-muted-foreground">Peak keyword growth</div>
        </div>
      </div>

      {/* Top Performer Highlight */}
      <Card className="border-loreal-red/20 bg-gradient-to-r from-loreal-red/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-loreal-red/10 rounded-full">
                  <TrendingUp className="h-4 w-4 text-loreal-red" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Breakout Keyword</h3>
                  <p className="text-sm text-muted-foreground">Fastest growing this week</p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{trendingKeywords[1].name}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {trendingKeywords[1].category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Search className="h-3 w-3" />
                    {trendingKeywords[1].mentions} mentions
                  </span>
                  <span className="text-green-500 font-semibold">
                    +{trendingKeywords[1].growth}%
                  </span>
                </div>
              </div>
            </div>
            <div className="w-64 h-32">
              <LineChartComponent
                data={trendingKeywords[1].data}
                color={getColorByPercentage(trendingKeywords[1].growth)}
                height={128}
                showAxis={false}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Keywords List */}
      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          All Trending Keywords
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {trendingKeywords.map((keyword) => (
            <Card key={keyword.id} className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-loreal-red/10 rounded">
                      <Hash className="h-3 w-3 text-loreal-red" />
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {keyword.category}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-green-500">
                    +{keyword.growth}%
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-lg">{keyword.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded border ${getDifficultyColor(keyword.difficulty)}`}>
                        {keyword.difficulty} Competition
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>
                      <div className="font-medium text-foreground">{keyword.mentions}</div>
                      <div>Mentions</div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{keyword.searchVolume}</div>
                      <div>Search Volume</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{keyword.engagement} engagement</span>
                  </div>
                  
                  <div className="h-16">
                    <LineChartComponent
                      data={keyword.data}
                      color={getColorByPercentage(keyword.growth)}
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

      {/* Keyword Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Category Performance Analysis</span>
            <span className="text-sm text-muted-foreground font-normal">Comprehensive breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Skincare Category */}
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-blue-900">Skincare</h3>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  +52% avg
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">4</span>
                  <span className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded">Active Keywords</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="font-medium text-blue-900">4.9M</div>
                    <div className="text-blue-600">Total Mentions</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-900">388K</div>
                    <div className="text-blue-600">Search Volume</div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-600">Top Performer</span>
                    <span className="text-xs font-medium text-blue-900">Korean Skincare</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-blue-600">Avg Engagement</span>
                    <span className="text-xs font-medium text-blue-900">89%</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-blue-600">Competition</span>
                    <span className="text-xs font-medium text-orange-600">Medium-High</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Makeup Category */}
            <div className="p-6 bg-pink-50 rounded-lg border border-pink-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-pink-900">Makeup</h3>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  +78% avg
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-pink-600">3</span>
                  <span className="text-xs text-pink-700 bg-pink-100 px-2 py-1 rounded">Active Keywords</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="font-medium text-pink-900">4.8M</div>
                    <div className="text-pink-600">Total Mentions</div>
                  </div>
                  <div>
                    <div className="font-medium text-pink-900">226K</div>
                    <div className="text-pink-600">Search Volume</div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-pink-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-pink-600">Top Performer</span>
                    <span className="text-xs font-medium text-pink-900">Vanilla Girl</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-pink-600">Avg Engagement</span>
                    <span className="text-xs font-medium text-pink-900">90%</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-pink-600">Competition</span>
                    <span className="text-xs font-medium text-red-600">High</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lifestyle Category */}
            <div className="p-6 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-green-900">Lifestyle</h3>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  +31% avg
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">2</span>
                  <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">Active Keywords</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="font-medium text-green-900">1.6M</div>
                    <div className="text-green-600">Total Mentions</div>
                  </div>
                  <div>
                    <div className="font-medium text-green-900">112K</div>
                    <div className="text-green-600">Search Volume</div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-green-600">Top Performer</span>
                    <span className="text-xs font-medium text-green-900">Natural Glow</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-green-600">Avg Engagement</span>
                    <span className="text-xs font-medium text-green-900">81%</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-green-600">Competition</span>
                    <span className="text-xs font-medium text-green-600">Low</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Category Insights Summary */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold mb-3 text-gray-900">Key Category Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-medium text-gray-900">Highest Growth</div>
                <div className="text-lg font-bold text-pink-600">Makeup (+78%)</div>
                <div className="text-xs text-gray-600">Driven by beauty trends</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-medium text-gray-900">Most Volume</div>
                <div className="text-lg font-bold text-blue-600">Skincare (4.9M)</div>
                <div className="text-xs text-gray-600">Consistent high interest</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-medium text-gray-900">Best Engagement</div>
                <div className="text-lg font-bold text-pink-600">Makeup (90%)</div>
                <div className="text-xs text-gray-600">High interaction rates</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-medium text-gray-900">Opportunity</div>
                <div className="text-lg font-bold text-green-600">Lifestyle</div>
                <div className="text-xs text-gray-600">Low competition niche</div>
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
              <TrendingUp className="h-4 w-4 mr-2" />
              Download Keywords Report
            </Button>
            <Button variant="outline">
              Set Keyword Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
