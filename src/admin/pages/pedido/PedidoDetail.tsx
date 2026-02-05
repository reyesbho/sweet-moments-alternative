import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Edit,
    MapPin,
    Calendar,
    Clock,
    MessageSquare,
    User
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { usePedido } from '@/admin/hook/usePedido';
import { CustomStatusBadge } from '@/admin/components/CustomStatusBadge';
import { formatDateFromTimestamp, formatDateStringFromTimestamp, getDateStringFromDate, getHourFromDate } from '@/lib/format-date';
import { CustomProductoPedidoBagde } from '@/admin/components/CustomProductoPedidoBagde';
import { formatCurrency } from '@/lib/format-currency';

export const PedidoDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: pedido } = usePedido(id || '');

    if (!pedido) {
        return (
            <div className="flex flex-col items-center justify-center min-h-100 animate-fade-in">
                <p className="text-muted-foreground text-lg">Pedido no encontrado</p>
                <Button variant="ghost" onClick={() => navigate('/pedidos')} className="mt-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a pedidos
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in flex flex-col max-w-11/12 ">
            {/* Header */}
            {/* <CustomJumbotron title='Detalle del pedido' subtitle='Aca puedes ver los detalles del pedido'></CustomJumbotron> */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-display font-bold text-foreground">
                            Pedido {pedido.id}
                        </h1>
                        <CustomStatusBadge status={pedido.estatus} />
                    </div>
                    <p className="text-muted-foreground mt-1">
                        Creado el {formatDateStringFromTimestamp(pedido.fechaCreacion)}
                    </p>
                </div>
                <Button onClick={() => navigate(`/pedidos/${pedido.id}`)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Customer Info */}
                    <div className="card-elevated p-6 shadow-md">
                        <h2 className="font-display font-semibold text-lg text-foreground mb-4">
                            Información del Cliente
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <User className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Nombre</p>
                                    <p className="font-medium text-foreground">{pedido.cliente}</p>
                                </div>
                            </div>
                            {pedido.lugarEntrega && (
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Dirección</p>
                                        <p className="font-medium text-foreground">{pedido.lugarEntrega}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="card-elevated p-6 shadow-md">
                        <h2 className="font-display font-semibold text-lg text-foreground mb-4">
                            Entrega
                        </h2>
                        <div className="flex flex-row gap-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 t" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Fecha</p>
                                    <p className="font-medium text-foreground">
                                        {getDateStringFromDate(formatDateFromTimestamp(pedido.fechaEntrega))}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                                    <Clock className="w-5 h-5 " />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Hora</p>
                                    <p className="font-medium text-foreground">{getHourFromDate(formatDateFromTimestamp(pedido.fechaEntrega))}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="card-elevated p-6 shadow-md">
                        <h2 className="font-display font-semibold text-lg text-foreground mb-4">
                            Productos
                        </h2>
                        <div className="space-y-4">
                            {pedido.productos.map((productoPedido) => (
                                <CustomProductoPedidoBagde
                                    key={productoPedido.id} productoPedido={productoPedido}
                                ></CustomProductoPedidoBagde>
                            ))}
                            <div className="flex items-center justify-between pt-4 border-t border-border">
                                <p className="text-lg font-display font-semibold text-foreground">Total</p>
                                <p className="text-2xl font-display font-bold text-primary">
                                    {formatCurrency(pedido.total)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {pedido.detalles && (
                        <div className="card-elevated p-6 shadow-md">
                            <div className="flex items-center gap-2 mb-3">
                                <MessageSquare className="w-5 h-5 text-muted-foreground" />
                                <h2 className="font-display font-semibold text-lg text-foreground">Notas</h2>
                            </div>
                            <p className="text-muted-foreground">{pedido.detalles }</p>
                        </div>
                    )}
                </div>
        </div>
    );
}
