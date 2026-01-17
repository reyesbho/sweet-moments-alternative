import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EstatusPedido } from '@/interfaces/pedidos-response';

interface StatusBadgeProps {
    status: EstatusPedido;
    className?: string;
}

const statusConfig: Record<EstatusPedido, { label: string; icon: typeof Clock; className: string }> = {
    'DELETE': {
        label: 'Eliminado',
        icon: Clock,
        className: 'status-badge-delete border',
    },
    'BACKLOG': {
        label: 'Incompleto',
        icon: Clock,
        className: 'status-badge-backlog border',
    },
    'TODO': {
        label: 'Por Hacer',
        icon: Clock,
        className: 'status-badge-todo border',
    },
    'DONE': {
        label: 'Entregado',
        icon: CheckCircle2,
        className: 'status-badge-done border',
    },
    'CANCELED': {
        label: 'Cancelado',
        icon: XCircle,
        className: 'status-badge-cancelled border',
    },
};

export const CustomStatusBadge = ({ status, className }: StatusBadgeProps) => {
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <Badge
            variant="outline"
            className={cn(
                'gap-1.5 font-medium px-2.5 py-1',
                config.className,
                className
            )}
        >
            <Icon className="w-3.5 h-3.5" />
            {config.label}
        </Badge>
    );
}
