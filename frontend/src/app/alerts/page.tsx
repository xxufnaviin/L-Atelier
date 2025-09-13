"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingDown, TrendingUp, Clock, Info, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const alertsData = [
  {
    id: 1,
    type: 'warning',
    title: 'Declining Trend Alert',
    message: '#CleanGirl trend showing 15% decline in Malaysia over the past 7 days',
    timestamp: '2 hours ago',
    severity: 'medium',
    actionRequired: true
  },
  {
    id: 2,
    type: 'critical',
    title: 'Market Shift Detection',
    message: 'Sudden 40% drop in skincare content engagement - investigate competitor activities',
    timestamp: '4 hours ago',
    severity: 'high',
    actionRequired: true
  },
  {
    id: 3,
    type: 'info',
    title: 'Seasonal Pattern Recognition',
    message: 'Holiday-themed beauty content typically peaks in next 3 weeks based on historical data',
    timestamp: '6 hours ago',
    severity: 'low',
    actionRequired: false
  },
  {
    id: 4,
    type: 'warning',
    title: 'Content Saturation Alert',
    message: '#KoreanSkincare hashtag approaching saturation point - diversification recommended',
    timestamp: '1 day ago',
    severity: 'medium',
    actionRequired: true
  },
  {
    id: 5,
    type: 'success',
    title: 'Trend Opportunity',
    message: '#MinimalistMakeup trending upward - 25% growth potential identified',
    timestamp: '1 day ago',
    severity: 'low',
    actionRequired: false
  }
];

export default function AlertsPage() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-500 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-500 bg-blue-50 border-blue-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-5 w-5" />;
      case 'critical': return <TrendingDown className="h-5 w-5" />;
      case 'info': return <Info className="h-5 w-5" />;
      case 'success': return <TrendingUp className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/trend-analyst">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Trend Analyst
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <AlertTriangle className="h-8 w-8 text-loreal-red" />
          Trend Alerts & Warnings
        </h1>
        <p className="text-muted-foreground">
          Stay informed about critical market changes and trend opportunities
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Action Required</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Opportunities</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertsData.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 ${
                    alert.severity === 'high' ? 'text-red-500' :
                    alert.severity === 'medium' ? 'text-yellow-600' :
                    alert.type === 'success' ? 'text-green-500' : 'text-blue-500'
                  }`}>
                    {getTypeIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm">{alert.title}</h3>
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                    {alert.actionRequired && (
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          Investigate
                        </Button>
                        <Button size="sm" variant="ghost">
                          Mark as Read
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
