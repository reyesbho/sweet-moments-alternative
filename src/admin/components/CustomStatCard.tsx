import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
}

export const CustomStatsCard = ({ title, value, icon, trend, className, iconClassName }: StatsCardProps) => {
  return (
    <div className={cn('border shadow-md rounded-2xl card-elevated p-5 animate-fade-in', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-display font-semibold mt-1 text-foreground">{value}</p>
          {trend && (
            <p className={cn(
              'text-xs mt-2 font-medium',
              trend.isPositive ? 'text-status-delivered' : 'text-status-cancelled'
            )}>
              {trend.isPositive ? '+' : ''}{trend.value}% vs mes anterior
            </p>
          )}
        </div>
        <div className={cn(
          'w-11 h-11 rounded-xl flex items-center justify-center',
          iconClassName || 'bg-primary/10 text-primary'
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
}
