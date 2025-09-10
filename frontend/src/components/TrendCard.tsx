"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, TrendingUp, TrendingDown, Eye } from 'lucide-react';
import LineChartComponent from './LineChartComponent';

interface TrendCardProps {
  type: 'audio' | 'keyword' | 'hashtag' | 'decay';
  data: {
    name: string;
    growth?: number;
    decline?: number;
    views?: string;
    data: Array<{ date: string; value: number }>;
    platform: string;
    demographic: string;
  };
}

export default function TrendCard({ type, data }: TrendCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'audio':
        return <Play className="h-4 w-4" />;
      case 'keyword':
        return <TrendingUp className="h-4 w-4" />;
      case 'hashtag':
        return <Eye className="h-4 w-4" />;
      case 'decay':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'audio':
        return 'Trending Audio';
      case 'keyword':
        return 'Top Keyword';
      case 'hashtag':
        return 'Viral Hashtag';
      case 'decay':
        return 'Trend Alert';
      default:
        return 'Trend';
    }
  };

  const getMetric = () => {
    if (type === 'decay' && data.decline) {
      return `${data.decline}%`;
    }
    if (type === 'hashtag' && data.views) {
      return data.views;
    }
    if (data.growth) {
      return `+${data.growth}%`;
    }
    return '';
  };

  const getMetricColor = () => {
    if (type === 'decay') return 'text-red-500';
    return 'text-green-500';
  };

  const getChartColor = () => {
    if (type === 'decay') return '#ef4444';
    return '#d41e2c';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <span className="flex items-center gap-2">
            {getIcon()}
            {getTitle()}
          </span>
          <span className={`text-sm font-bold ${getMetricColor()}`}>
            {getMetric()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg">{data.name}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{data.platform}</span>
              <span>•</span>
              <span>{data.demographic}</span>
            </div>
          </div>
          
          <div className="h-16">
            <LineChartComponent
              data={data.data}
              color={getChartColor()}
              height={64}
              showAxis={false}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
