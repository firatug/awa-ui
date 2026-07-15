import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/utils'
import { getChartColors } from './chart-theme'

export interface SparklineProps {
  data: { value: number }[]
  color?: string
  height?: number
  width?: number | string
  className?: string
  showArea?: boolean
}

export function Sparkline({
  data,
  color,
  height = 32,
  width = '100%',
  className,
  showArea = true,
}: SparklineProps) {
  const colors = getChartColors()
  const strokeColor = color ?? colors.primary

  if (data.length === 0) return null

  return (
    <div className={cn('shrink-0', className)} style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <defs>
            <linearGradient id={`sparkline-${strokeColor.replace(/[^a-z0-9]/gi, '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.25} />
              <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={1.5}
            fill={showArea ? `url(#sparkline-${strokeColor.replace(/[^a-z0-9]/gi, '')})` : 'transparent'}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
