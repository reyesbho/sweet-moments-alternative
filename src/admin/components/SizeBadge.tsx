import type { Size } from '@/interfaces/producto';
import { formatCurrency } from '@/lib/format-currency';
import { cn } from '@/lib/utils';

interface Props{
    size: Size,
    isSelected?: boolean,
    onSelected?: (size: Size) => void
}
const SizeBadge = ({size, isSelected=false, onSelected}:Props) => {

    return (
        <button
            type="button"
            onClick={() => onSelected?.(size)}
            className={cn(
                'flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all',
                isSelected
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
            )}
        >
            <span className="font-medium text-sm">{size.size}</span>
            <span
                className={cn(
                    'text-xs',
                    isSelected ? 'text-primary' : 'text-muted-foreground'
                )}
            >
                {formatCurrency(size.price || 0)}
            </span>
        </button>
    )
}

export default SizeBadge
