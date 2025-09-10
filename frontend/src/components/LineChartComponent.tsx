"use client";

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

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
}

export default function LineChartComponent({
  data,
  dataKey = 'value',
  color = '#d41e2c',
  height = 200,
  showAxis = true,
  showGrid = false,
  isComparison = false
}: LineChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        {showGrid && <XAxis dataKey={data[0]?.date ? 'date' : 'day'} hide={!showAxis} />}
        {showGrid && <YAxis hide={!showAxis} />}
        
        {isComparison ? (
          <>
            <Line
              type="monotone"
              dataKey="global"
              stroke="#6b7280"
              strokeWidth={2}
              dot={false}
              name="Global"
            />
            <Line
              type="monotone"
              dataKey="malaysia"
              stroke={color}
              strokeWidth={2}
              dot={false}
              name="Malaysia"
            />
          </>
        ) : (
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
