"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import Chart.js components to avoid SSR issues
const ChartComponent = dynamic(
  () => import('./ChartRenderer'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded animate-pulse">
        <div className="text-gray-400">Loading chart...</div>
      </div>
    )
  }
);

interface LineChartComponentProps {
  data: Array<{
    date?: string;
    day?: number;
    value?: number;
    global?: number;
    malaysia?: number;
    engagement?: number;
  }>;
  dataKey?: string;
  color?: string;
  height?: number;
  showAxis?: boolean;
  showGrid?: boolean;
  isComparison?: boolean;
  animated?: boolean;
  enableZoom?: boolean; // Legacy prop - charts are now static
  enablePan?: boolean;  // Legacy prop - charts are now static
  showDataPoints?: boolean;
  showResetButton?: boolean; // Legacy prop - no controls needed
}

export default function LineChartComponent(props: LineChartComponentProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div 
        style={{ height: `${props.height || 200}px` }} 
        className="flex items-center justify-center bg-gray-50 rounded animate-pulse"
      >
        <div className="text-gray-400">Loading chart...</div>
      </div>
    );
  }

  return <ChartComponent {...props} />;
}
