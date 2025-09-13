"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingDown, ArrowLeft, BarChart3, AlertTriangle, Clock, TrendingUp, Users, Target, Eye, Zap } from 'lucide-react';
import LineChartComponent from '@/components/LineChartComponent';
import Link from 'next/link';

// Extended sample data for declining trends
const decliningTrends = [
  {
    id: 1,
    name: "Clean Girl",
    category: "Makeup Trend",
    decline: -23,
    peakViews: "5.8M",
    currentViews: "4.5M",
    timeToDecline: "3 months",
    platform: "Instagram",
    status: "Declining",
    data: [
      { date: '2024-09-01', value: 80 },
      { date: '2024-09-08', value: 70 },
      { date: '2024-09-15', value: 60 },
      { date: '2024-09-22', value: 50 },
      { date: '2024-09-29', value: 57 }
    ]
  },
  {
    id: 2,
    name: "Soap Brows",
    category: "Brow Trend",
    decline: -45,
    peakViews: "2.1M",
    currentViews: "1.2M",
    timeToDecline: "6 months",
    platform: "TikTok",
    status: "Rapid Decline",
    data: [
      { date: '2024-09-01', value: 70 },
      { date: '2024-09-08', value: 55 },
      { date: '2024-09-15', value: 40 },
      { date: '2024-09-22', value: 30 },
      { date: '2024-09-29', value: 25 }
    ]
  },
  {
    id: 3,
    name: "Overlined Lips",
    category: "Lip Trend",
    decline: -18,
    peakViews: "3.4M",
    currentViews: "2.8M",
    timeToDecline: "2 months",
    platform: "Instagram",
    status: "Slow Decline",
    data: [
      { date: '2024-09-01', value: 85 },
      { date: '2024-09-08', value: 82 },
      { date: '2024-09-15', value: 78 },
      { date: '2024-09-22', value: 75 },
      { date: '2024-09-29', value: 70 }
    ]
  },
  {
    id: 4,
    name: "Heavy Contouring",
    category: "Makeup Technique",
    decline: -52,
    peakViews: "4.2M",
    currentViews: "2.0M",
    timeToDecline: "8 months",
    platform: "YouTube",
    status: "Major Decline",
    data: [
      { date: '2024-09-01', value: 60 },
      { date: '2024-09-08', value: 50 },
      { date: '2024-09-15', value: 40 },
      { date: '2024-09-22', value: 32 },
      { date: '2024-09-29', value: 28 }
    ]
  },
  {
    id: 5,
    name: "Extreme Highlighting",
    category: "Face Technique",
    decline: -34,
    peakViews: "1.8M",
    currentViews: "1.2M",
    timeToDecline: "4 months",
    platform: "TikTok",
    status: "Declining",
    data: [
      { date: '2024-09-01', value: 45 },
      { date: '2024-09-08', value: 40 },
      { date: '2024-09-15', value: 35 },
      { date: '2024-09-22', value: 32 },
      { date: '2024-09-29', value: 30 }
    ]
  },
  {
    id: 6,
    name: "Instagram Eyebrows",
    category: "Brow Trend",
    decline: -67,
    peakViews: "6.7M",
    currentViews: "2.2M",
    timeToDecline: "12 months",
    platform: "Instagram",
    status: "Near End",
    data: [
      { date: '2024-09-01', value: 40 },
      { date: '2024-09-08', value: 32 },
      { date: '2024-09-15', value: 25 },
      { date: '2024-09-22', value: 20 },
      { date: '2024-09-29', value: 15 }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Slow Decline': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'Declining': return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'Rapid Decline': return 'text-red-600 bg-red-50 border-red-200';
    case 'Major Decline': return 'text-red-700 bg-red-100 border-red-300';
    case 'Near End': return 'text-gray-600 bg-gray-50 border-gray-200';
    default: return 'text-gray-500 bg-gray-50 border-gray-200';
  }
};

export default function TrendingDecayPage() {
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
              <TrendingDown className="h-8 w-8 text-red-500" />
              Declining Trends
            </h1>
            <p className="text-muted-foreground">
              Beauty trends losing momentum - opportunities for pivot or phase-out
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-500">-67%</div>
          <div className="text-sm text-muted-foreground">Steepest decline</div>
        </div>
      </div>

      {/* Alert Card */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800">Trend Alert</h3>
              <p className="text-sm text-yellow-700 mt-1">
                6 beauty trends are showing significant decline. Consider adjusting campaigns or 
                pivoting to emerging alternatives. The fastest declining trend has lost 67% momentum 
                in the past quarter.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Decline Highlight */}
      <Card className="border-red-200 bg-gradient-to-r from-red-50 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-100 rounded-full">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-red-800">Critical Decline</h3>
                  <p className="text-sm text-red-600">Trend requiring immediate attention</p>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{decliningTrends[5].name}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="px-2 py-1 bg-red-200 text-red-800 rounded text-xs">
                    {decliningTrends[5].category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {decliningTrends[5].timeToDecline} decline
                  </span>
                  <span className="text-red-600 font-semibold">
                    {decliningTrends[5].decline}%
                  </span>
                </div>
              </div>
            </div>
            <div className="w-64 h-32">
              <LineChartComponent
                data={decliningTrends[5].data}
                color="#dc2626"
                height={128}
                showAxis={false}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Declining Trends List */}
      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          All Declining Trends
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {decliningTrends.map((trend) => (
            <Card key={trend.id} className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-red-100 rounded">
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    </div>
                    <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(trend.status)}`}>
                      {trend.status}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-red-500">
                    {trend.decline}%
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-lg">{trend.name}</h3>
                    <p className="text-sm text-muted-foreground">{trend.category}</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      {trend.platform} • {trend.timeToDecline}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>
                      <div className="font-medium text-foreground">{trend.peakViews}</div>
                      <div>Peak Views</div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{trend.currentViews}</div>
                      <div>Current Views</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Decline Rate: {Math.abs(trend.decline)}%
                    </span>
                    <Button size="sm" variant="outline">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Monitor
                    </Button>
                  </div>
                  
                  <div className="h-16">
                    <LineChartComponent
                      data={trend.data}
                      color="#dc2626"
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

      {/* Decline Risk Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Decline Risk Analysis</span>
            <span className="text-sm text-muted-foreground font-normal">Strategic trend lifecycle assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Slow Decline */}
            <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-yellow-900">Slow Decline</h3>
                <div className="flex items-center gap-1 text-yellow-600 text-sm font-medium">
                  <TrendingDown className="h-4 w-4" />
                  -18% avg
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-yellow-600">1</span>
                  <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded">Active Trends</span>
                </div>
                
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div>
                    <div className="font-medium text-yellow-900">3.4M</div>
                    <div className="text-yellow-600">Peak Views</div>
                  </div>
                  <div>
                    <div className="font-medium text-yellow-900">2 months</div>
                    <div className="text-yellow-600">Avg Timeline</div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-yellow-200">
                  <div className="mb-2">
                    <span className="text-xs text-yellow-600 font-medium">Trends:</span>
                    <div className="text-xs text-yellow-900 mt-1">• Overlined Lips</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-yellow-600">Risk Level</span>
                    <span className="text-xs font-medium text-green-600">Low</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-yellow-600">Action Needed</span>
                    <span className="text-xs font-medium text-yellow-900">Monitor</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-yellow-600">Recovery Time</span>
                    <span className="text-xs font-medium text-blue-600">2-3 weeks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Declining */}
            <div className="p-6 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-orange-900">Declining</h3>
                <div className="flex items-center gap-1 text-red-600 text-sm font-medium">
                  <TrendingDown className="h-4 w-4" />
                  -29% avg
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                  <span className="text-xs text-orange-700 bg-orange-100 px-2 py-1 rounded">Active Trends</span>
                </div>
                
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div>
                    <div className="font-medium text-orange-900">6.6M</div>
                    <div className="text-orange-600">Combined Views</div>
                  </div>
                  <div>
                    <div className="font-medium text-orange-900">3.5 months</div>
                    <div className="text-orange-600">Avg Timeline</div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-orange-200">
                  <div className="mb-2">
                    <span className="text-xs text-orange-600 font-medium">Trends:</span>
                    <div className="text-xs text-orange-900 mt-1">• Clean Girl</div>
                    <div className="text-xs text-orange-900">• Extreme Highlighting</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-orange-600">Risk Level</span>
                    <span className="text-xs font-medium text-yellow-600">Medium</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-orange-600">Action Needed</span>
                    <span className="text-xs font-medium text-orange-900">Review</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-orange-600">Recovery Time</span>
                    <span className="text-xs font-medium text-blue-600">4-6 weeks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rapid Decline */}
            <div className="p-6 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-red-900">Rapid Decline</h3>
                <div className="flex items-center gap-1 text-red-600 text-sm font-medium">
                  <TrendingDown className="h-4 w-4" />
                  -45% avg
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-red-600">1</span>
                  <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded">Active Trends</span>
                </div>
                
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div>
                    <div className="font-medium text-red-900">2.1M</div>
                    <div className="text-red-600">Peak Views</div>
                  </div>
                  <div>
                    <div className="font-medium text-red-900">6 months</div>
                    <div className="text-red-600">Decline Period</div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-red-200">
                  <div className="mb-2">
                    <span className="text-xs text-red-600 font-medium">Trends:</span>
                    <div className="text-xs text-red-900 mt-1">• Soap Brows</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-red-600">Risk Level</span>
                    <span className="text-xs font-medium text-red-600">High</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-red-600">Action Needed</span>
                    <span className="text-xs font-medium text-red-900">Pivot</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-red-600">Recovery Time</span>
                    <span className="text-xs font-medium text-gray-600">8-12 weeks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Major Decline */}
            <div className="p-6 bg-red-100 rounded-lg border border-red-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-red-900">Major Decline</h3>
                <div className="flex items-center gap-1 text-red-700 text-sm font-medium">
                  <TrendingDown className="h-4 w-4" />
                  -52% avg
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-red-700">1</span>
                  <span className="text-xs text-red-800 bg-red-200 px-2 py-1 rounded">Critical</span>
                </div>
                
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div>
                    <div className="font-medium text-red-900">4.2M</div>
                    <div className="text-red-700">Peak Views</div>
                  </div>
                  <div>
                    <div className="font-medium text-red-900">8 months</div>
                    <div className="text-red-700">Decline Period</div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-red-300">
                  <div className="mb-2">
                    <span className="text-xs text-red-700 font-medium">Trends:</span>
                    <div className="text-xs text-red-900 mt-1">• Heavy Contouring</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-red-700">Risk Level</span>
                    <span className="text-xs font-medium text-red-700">Critical</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-red-700">Action Needed</span>
                    <span className="text-xs font-medium text-red-900">Exit</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-red-700">Recovery Time</span>
                    <span className="text-xs font-medium text-gray-600">12+ weeks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Near End */}
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-900">Near End</h3>
                <div className="flex items-center gap-1 text-gray-600 text-sm font-medium">
                  <TrendingDown className="h-4 w-4" />
                  -67% avg
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-600">1</span>
                  <span className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">End Stage</span>
                </div>
                
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div>
                    <div className="font-medium text-gray-900">6.7M</div>
                    <div className="text-gray-600">Peak Views</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">12 months</div>
                    <div className="text-gray-600">Total Lifecycle</div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-gray-200">
                  <div className="mb-2">
                    <span className="text-xs text-gray-600 font-medium">Trends:</span>
                    <div className="text-xs text-gray-900 mt-1">• Instagram Eyebrows</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Risk Level</span>
                    <span className="text-xs font-medium text-gray-700">Terminal</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-600">Action Needed</span>
                    <span className="text-xs font-medium text-gray-900">Archive</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-600">Recovery Time</span>
                    <span className="text-xs font-medium text-gray-600">Unlikely</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Risk Management Insights */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold mb-3 text-gray-900">Risk Management Strategy</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-medium text-gray-900">Highest Risk</div>
                <div className="text-lg font-bold text-red-600">Near End (-67%)</div>
                <div className="text-xs text-gray-600">Immediate exit required</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-medium text-gray-900">Total Risk Exposure</div>
                <div className="text-lg font-bold text-orange-600">17.2M Views</div>
                <div className="text-xs text-gray-600">Across declining trends</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-medium text-gray-900">Avg Decline Rate</div>
                <div className="text-lg font-bold text-red-600">-34%</div>
                <div className="text-xs text-gray-600">Portfolio impact</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm font-medium text-gray-900">Recovery Potential</div>
                <div className="text-lg font-bold text-blue-600">3 Trends</div>
                <div className="text-xs text-gray-600">Salvageable with pivot</div>
              </div>
            </div>
            
            {/* Action Priority Matrix */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="font-semibold mb-3 text-gray-900">Action Priority Matrix</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-red-50 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium">Immediate Action</span>
                  </div>
                  <div className="text-lg font-bold text-red-600">2 trends</div>
                  <div className="text-xs text-red-600 mb-2">Exit/Pivot now</div>
                  <div className="text-xs text-red-800">
                    • Heavy Contouring<br/>
                    • Instagram Eyebrows
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium">Monitor Closely</span>
                  </div>
                  <div className="text-lg font-bold text-yellow-600">3 trends</div>
                  <div className="text-xs text-yellow-600 mb-2">Review weekly</div>
                  <div className="text-xs text-yellow-800">
                    • Clean Girl<br/>
                    • Extreme Highlighting<br/>
                    • Soap Brows
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Watch & Learn</span>
                  </div>
                  <div className="text-lg font-bold text-blue-600">1 trend</div>
                  <div className="text-xs text-blue-600 mb-2">Monthly check</div>
                  <div className="text-xs text-blue-800">
                    • Overlined Lips
                  </div>
                </div>
              </div>
            </div>

            {/* Trend Lifecycle Insights */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="font-semibold mb-3 text-gray-900">Trend Lifecycle Intelligence</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-800">Decline Patterns</h5>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Makeup Trends:</span>
                      <span className="font-medium">6-8 month cycles</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Beauty Techniques:</span>
                      <span className="font-medium">4-6 month cycles</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Impact:</span>
                      <span className="font-medium">Instagram 2x longer</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-800">Recovery Indicators</h5>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Seasonal Return:</span>
                      <span className="font-medium text-green-600">40% chance</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Modified Revival:</span>
                      <span className="font-medium text-blue-600">65% success</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Shift:</span>
                      <span className="font-medium text-purple-600">35% effective</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Pivot to Emerging Trends</h4>
                <p className="text-sm text-blue-700">
                  Replace declining trends like "Clean Girl" with emerging "Vanilla Girl" aesthetic
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900">Monitor Critical Trends</h4>
                <p className="text-sm text-green-700">
                  Set alerts for trends in "Major Decline" status to avoid campaign conflicts
                </p>
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
            <Button>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Set Decline Alerts
            </Button>
            <Button variant="outline">
              <TrendingDown className="h-4 w-4 mr-2" />
              Download Decline Report
            </Button>
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Alternatives
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
