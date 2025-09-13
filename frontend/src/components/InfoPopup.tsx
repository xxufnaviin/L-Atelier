"use client";

import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface InfoPopupProps {
  title: string;
  description: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export default function InfoPopup({ title, description, children, side = 'top' }: InfoPopupProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative group cursor-help">
            {children}
            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <HelpCircle className="h-3 w-3 text-gray-400" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side={side}
          className="max-w-xs p-4 bg-white border border-gray-200 shadow-lg rounded-lg"
          sideOffset={8}
        >
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-gray-900">{title}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
