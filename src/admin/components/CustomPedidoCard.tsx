import type { Pedido } from "@/interfaces/pedidos-response"
import { useNavigate } from "react-router";
import { CustomStatusBadge } from "./CustomStatusBadge";
import { Clock, MapPin } from "lucide-react";
import { formatDateStringFromTimestamp } from "@/lib/format-date";
import { formatCurrency } from "@/lib/format-currency";

export interface Props{
    pedido:Pedido
}
export const CustomPedidoCard = ({pedido}:Props) => {
    const navigate = useNavigate();
    
    if (!pedido) return <h1>Loading....</h1>;

    return (
        <div
            key={pedido.id}
            onClick={() => navigate(`/pedidos/${pedido.id}`)}
            className="p-4 bg-muted/50 rounded-xl hover:bg-muted cursor-pointer transition-colors shadow-lg"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-sm text-primary font-medium">
                            {pedido.id}
                        </span>
                        <CustomStatusBadge status={pedido.estatus} />
                    </div>
                    <h3 className="font-semibold text-foreground">
                        {pedido.cliente}
                    </h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatDateStringFromTimestamp(pedido.fechaEntrega)}
                        </div>
                        {pedido.lugarEntrega && (
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {pedido.lugarEntrega}
                            </div>
                        )}
                    </div>
                    <div className="mt-3">
                        <p className="text-sm text-muted-foreground">
                            {pedido.productos.length} producto{pedido.productos.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xl font-display font-bold text-primary">
                        {formatCurrency(pedido.total)}
                    </p>
                </div>
            </div>
        </div>
    )
}
