/**
 * Utility functions for trend analysis and color assignment
 */

export interface TrendDataPoint {
  date: string;
  value: number;
}

export interface TrendAnalysis {
  direction: 'rising' | 'declining' | 'stable';
  percentageChange: number;
  color: string;
}

/**
 * Analyzes trend data to determine direction and appropriate color
 * @param data Array of data points with date and value
 * @returns Trend analysis with direction, percentage change, and color
 */
export function analyzeTrend(data: TrendDataPoint[]): TrendAnalysis {
  if (data.length < 2) {
    return {
      direction: 'stable',
      percentageChange: 0,
      color: '#3b82f6' // Blue for stable
    };
  }

  const firstValue = data[0].value;
  const lastValue = data[data.length - 1].value;
  const percentageChange = ((lastValue - firstValue) / firstValue) * 100;

  // Consider trends with less than 5% change as stable
  const threshold = 5;
  
  if (percentageChange > threshold) {
    return {
      direction: 'rising',
      percentageChange,
      color: '#10b981' // Green for rising
    };
  } else if (percentageChange < -threshold) {
    return {
      direction: 'declining',
      percentageChange,
      color: '#ef4444' // Red for declining
    };
  } else {
    return {
      direction: 'stable',
      percentageChange,
      color: '#3b82f6' // Blue for stable
    };
  }
}

/**
 * Gets the appropriate color for a trend based on its direction
 * @param data Array of data points
 * @param fallbackColor Color to use if trend analysis fails
 * @returns Hex color string
 */
export function getTrendColor(data: TrendDataPoint[], fallbackColor: string = '#d41e2c'): string {
  try {
    const analysis = analyzeTrend(data);
    return analysis.color;
  } catch (error) {
    console.warn('Error analyzing trend data:', error);
    return fallbackColor;
  }
}

/**
 * Gets the appropriate color for a trend based on growth/decline percentage
 * @param growthPercentage Positive for growth, negative for decline
 * @returns Hex color string
 */
export function getColorByPercentage(growthPercentage: number): string {
  if (growthPercentage > 0) {
    return '#10b981'; // Green for growth
  } else if (growthPercentage < 0) {
    return '#ef4444'; // Red for decline
  } else {
    return '#3b82f6'; // Blue for stable
  }
}
