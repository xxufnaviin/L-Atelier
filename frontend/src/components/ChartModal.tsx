"use client";

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, Maximize2 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

interface ChartData {
  type: 'line' | 'bar' | 'doughnut' | 'pie';
  data: any;
  options?: any;
}

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartData: ChartData | null;
  title?: string;
}

export default function ChartModal({ isOpen, onClose, chartData, title = "Chart Details" }: ChartModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!isOpen || !chartData || !canvasRef.current) return;

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create new chart
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartRef.current = new ChartJS(ctx, {
      type: chartData.type,
      data: chartData.data,
      options: {
        ...chartData.options,
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          ...chartData.options?.plugins,
          legend: {
            ...chartData.options?.plugins?.legend,
            display: true,
            position: 'top' as const,
          },
          title: {
            ...chartData.options?.plugins?.title,
            display: true,
            text: title,
            font: {
              size: 16,
              weight: 'bold' as const,
            },
          },
        },
        scales: {
          ...chartData.options?.scales,
          x: {
            ...chartData.options?.scales?.x,
            display: true,
            title: {
              display: true,
              text: 'Time Period',
            },
          },
          y: {
            ...chartData.options?.scales?.y,
            display: true,
            title: {
              display: true,
              text: 'Growth Percentage (%)',
            },
          },
        },
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [isOpen, chartData, title]);

  if (!isOpen || !chartData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Maximize2 className="h-5 w-5 text-loreal-red" />
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Chart Content */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="h-[500px] w-full">
            <canvas ref={canvasRef} />
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Click outside the modal or press the X button to close
            </p>
            <Button
              onClick={onClose}
              className="bg-loreal-red hover:bg-loreal-red/90 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
