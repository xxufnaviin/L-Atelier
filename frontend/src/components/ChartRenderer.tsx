"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components - no zoom plugin for static charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartRendererProps {
  data: Array<{
    date?: string;
    day?: number;
    value?: number;
    global?: number;
    malaysia?: number;
    engagement?: number;
    TikTok?: number;
    Instagram?: number;
    YouTube?: number;
    // Pie chart specific
    label?: string;
    positive?: number;
    neutral?: number;
    negative?: number;
  }> | Array<{
    // Alternative pie chart data format
    label: string;
    value: number;
    color?: string;
  }>;
  dataKey?: string;
  color?: string;
  height?: number;
  showAxis?: boolean;
  showGrid?: boolean;
  isComparison?: boolean;
  chartType?: 'line' | 'bar' | 'pie';
  animated?: boolean;
  enableZoom?: boolean; // Legacy prop - charts display fixed date ranges only
  enablePan?: boolean;  // Legacy prop - no scrolling through dates
  showDataPoints?: boolean;
  showResetButton?: boolean; // Legacy prop - static charts need no controls
}

export default function ChartRenderer({
  data,
  dataKey = 'value',
  color = '#d41e2c',
  height = 200,
  showAxis = true,
  showGrid = false,
  isComparison = false,
  chartType = 'line',
  animated = true,
  enableZoom = false,
  enablePan = false,
  showDataPoints = false,
  showResetButton = false
}: ChartRendererProps) {
  // Prepare labels and datasets based on chart type
  let labels, datasets;

  // Check if this is platform comparison (TikTok, Instagram, YouTube)
  const isPlatformComparison = data.some((item: any) => 
    'TikTok' in item || 'Instagram' in item || 'YouTube' in item
  );

  if (chartType === 'pie') {
    // For pie charts, handle different data formats
    if ('label' in data[0] && 'value' in data[0]) {
      // Simple pie data format: [{ label: 'Positive', value: 78 }]
      labels = data.map((item: any) => item.label);
      datasets = [{
        data: data.map((item: any) => item.value),
        backgroundColor: data.map((item: any) => 
          item.color || (
            item.label === 'Positive' ? '#22c55e' :
            item.label === 'Neutral' ? '#eab308' :
            item.label === 'Negative' ? '#ef4444' :
            color
          )
        ),
        borderWidth: 1,
        borderColor: '#ffffff',
      }];
    } else if ('positive' in data[0]) {
      // Sentiment data format: [{ platform: 'TikTok', positive: 78, neutral: 15, negative: 7 }]
      const item = data[0] as any;
      labels = ['Positive', 'Neutral', 'Negative'];
      datasets = [{
        data: [item.positive, item.neutral, item.negative],
        backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
        borderWidth: 1,
        borderColor: '#ffffff',
      }];
    } else {
      // Fallback for other formats
      labels = data.map((item: any) => item.label || item.date || '');
      datasets = [{
        data: data.map((item: any) => item.value || item[dataKey] || 0),
        backgroundColor: [color],
        borderWidth: 1,
        borderColor: '#ffffff',
      }];
    }
  } else {
    // Prepare labels (x-axis) for line and bar charts
    labels = data.map((item: any) => 
      item.date || (item.day ? `Day ${item.day}` : '')
    );
  
    if (isPlatformComparison) {
    // Platform comparison datasets
    datasets = [
      {
        label: 'TikTok',
        data: data.map((item: any) => item.TikTok || 0),
        borderColor: '#8b5cf6',
        backgroundColor: chartType === 'bar' ? '#8b5cf6' : 'rgba(139, 92, 246, 0.1)',
        borderWidth: chartType === 'bar' ? 1 : 3,
        fill: chartType === 'line' ? false : undefined,
        pointRadius: chartType === 'line' && showDataPoints ? 4 : 0,
        pointHoverRadius: chartType === 'line' ? 8 : undefined,
        tension: chartType === 'line' ? 0.4 : undefined,
      },
      {
        label: 'Instagram',
        data: data.map((item: any) => item.Instagram || 0),
        borderColor: '#ec4899',
        backgroundColor: chartType === 'bar' ? '#ec4899' : 'rgba(236, 72, 153, 0.1)',
        borderWidth: chartType === 'bar' ? 1 : 3,
        fill: chartType === 'line' ? false : undefined,
        pointRadius: chartType === 'line' && showDataPoints ? 4 : 0,
        pointHoverRadius: chartType === 'line' ? 8 : undefined,
        tension: chartType === 'line' ? 0.4 : undefined,
      },
      {
        label: 'YouTube',
        data: data.map((item: any) => item.YouTube || 0),
        borderColor: '#ef4444',
        backgroundColor: chartType === 'bar' ? '#ef4444' : 'rgba(239, 68, 68, 0.1)',
        borderWidth: chartType === 'bar' ? 1 : 3,
        fill: chartType === 'line' ? false : undefined,
        pointRadius: chartType === 'line' && showDataPoints ? 4 : 0,
        pointHoverRadius: chartType === 'line' ? 8 : undefined,
        tension: chartType === 'line' ? 0.4 : undefined,
      }
    ];
  } else if (isComparison) {
    // Global vs Malaysia comparison
    datasets = [
      {
        label: 'Global',
        data: data.map((item: any) => item.global || 0),
        borderColor: '#6b7280',
        backgroundColor: chartType === 'bar' ? '#6b7280' : 'rgba(107, 114, 128, 0.1)',
        borderWidth: chartType === 'bar' ? 1 : 3,
        fill: chartType === 'line' ? false : undefined,
        pointRadius: chartType === 'line' && showDataPoints ? 4 : 0,
        pointHoverRadius: chartType === 'line' ? 8 : undefined,
        tension: chartType === 'line' ? 0.4 : undefined,
      },
      {
        label: 'Malaysia',
        data: data.map((item: any) => item.malaysia || 0),
        borderColor: color,
        backgroundColor: chartType === 'bar' ? color : `${color}20`,
        borderWidth: chartType === 'bar' ? 1 : 3,
        fill: chartType === 'line' ? false : undefined,
        pointRadius: chartType === 'line' && showDataPoints ? 4 : 0,
        pointHoverRadius: chartType === 'line' ? 8 : undefined,
        tension: chartType === 'line' ? 0.4 : undefined,
      }
    ];
  } else {
      // Single dataset
      datasets = [
        {
          label: dataKey.charAt(0).toUpperCase() + dataKey.slice(1),
          data: data.map((item: any) => item[dataKey] || 0),
          borderColor: color,
          backgroundColor: chartType === 'bar' ? color : `${color}20`,
          borderWidth: chartType === 'bar' ? 1 : 3,
          fill: chartType === 'line' ? 'start' : undefined,
          pointRadius: chartType === 'line' && showDataPoints ? 4 : 0,
          pointHoverRadius: chartType === 'line' ? 8 : undefined,
          tension: chartType === 'line' ? 0.4 : undefined,
        }
      ];
    }
  }

  const chartData = {
    labels,
    datasets,
  };

  const options: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: chartType === 'pie' ? 'point' as const : 'index' as const,
      intersect: chartType === 'pie' ? true : false,
    },
    plugins: {
      legend: {
        display: chartType === 'pie',
        position: chartType === 'pie' ? 'bottom' as const : 'top' as const,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: color,
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: true,
        titleFont: {
          family: 'Inter, system-ui, -apple-system, sans-serif',
        },
        bodyFont: {
          family: 'Inter, system-ui, -apple-system, sans-serif',
        },
        callbacks: {
          label: function(context: any) {
            if (chartType === 'pie') {
              const label = context.label || '';
              const value = context.parsed;
              const total = context.dataset.data.reduce((sum: number, val: number) => sum + val, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value}% (${percentage}% of total)`;
            } else {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              return `${label}: ${typeof value === 'number' ? value.toFixed(1) : value}${dataKey === 'engagement' ? '%' : ''}`;
            }
          },
        },
      },
      // Charts are now static with fixed date ranges - no zoom or pan functionality
    },
    scales: chartType === 'pie' ? undefined : {
      x: {
        display: showAxis,
        title: {
          display: chartType === 'bar' && isPlatformComparison,
          text: 'Month (2024)',
          color: '#6b7280',
          font: {
            size: 12,
            family: 'Inter, system-ui, -apple-system, sans-serif',
          },
        },
        grid: {
          display: showGrid,
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 1,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
            family: 'Inter, system-ui, -apple-system, sans-serif',
          },
        },
      },
      y: {
        display: showAxis,
        title: {
          display: chartType === 'bar' && isPlatformComparison,
          text: 'Engagement Rate (%)',
          color: '#6b7280',
          font: {
            size: 12,
            family: 'Inter, system-ui, -apple-system, sans-serif',
          },
        },
        grid: {
          display: showGrid,
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 1,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
            family: 'Inter, system-ui, -apple-system, sans-serif',
          },
          callback: function(value: any) {
            return typeof value === 'number' ? 
              (dataKey === 'engagement' || isPlatformComparison ? `${value}%` : value.toString()) : 
              value;
          },
        },
        beginAtZero: true,
      },
    },
    elements: {
      point: {
        hoverBorderWidth: 3,
      },
    },
    animation: animated ? {
      duration: 1000,
      easing: 'easeInOutQuart',
    } : false,
  };

  return (
    <div style={{ height: `${height}px`, position: 'relative' }}>
      {chartType === 'pie' ? (
        <Pie data={chartData} options={options as ChartOptions<'pie'>} />
      ) : chartType === 'bar' ? (
        <Bar data={chartData} options={options as ChartOptions<'bar'>} />
      ) : (
        <Line data={chartData} options={options} />
      )}
      {/* Static charts - no interactive controls needed */}
    </div>
  );
}
