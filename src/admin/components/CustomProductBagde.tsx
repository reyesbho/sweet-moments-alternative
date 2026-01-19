import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { ProductoPedido } from "@/interfaces/pedidos-response"
import { formatCurrency } from "@/lib/format-currency"
import { Minus, Plus, Trash2 } from "lucide-react"


interface Props{
    productoPedido: ProductoPedido,
    onRemove: (producPedido: ProductoPedido) => void,
    onIncreaseQuantity: (id: string) => void,
    onDecreaseQuantity: (id: string) => void
}
export const CustomProductBagde = ({productoPedido, onRemove, onIncreaseQuantity, onDecreaseQuantity }:Props) => {
    const {cantidad, caracteristicas,subtotal, size,producto} = productoPedido;
    return (
        <Card className="p-3">
            <div className="flex gap-3">
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    <img
                        src={producto?.imagen || '/placeholder.svg'}
                        alt={producto.name}
                        className="w-30 h-30 object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{producto.name}</h4>
                    <p className="text-xs text-muted-foreground">
                        {formatCurrency(productoPedido.size.price || 0)} c/u
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-1.5">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => onDecreaseQuantity(productoPedido.id)}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{cantidad}</span>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => onIncreaseQuantity(productoPedido.id)}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                </div>

                {/* Subtotal & Remove */}
                <div className="flex flex-col items-end justify-between">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive hover:text-destructive"
                        onClick={() => onRemove(productoPedido)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold text-sm">
                        {formatCurrency(productoPedido.subtotal)}
                    </span>
                </div>
            </div>
        </Card>
    )
}
