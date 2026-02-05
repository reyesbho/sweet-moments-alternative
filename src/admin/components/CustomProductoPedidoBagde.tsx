import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { ProductoPedido } from "@/interfaces/pedidos-response"
import { formatCurrency } from "@/lib/format-currency"
import { Minus, Plus, Trash2 } from "lucide-react"


interface Props{
    productoPedido: ProductoPedido,
    onRemove?: (producPedido: ProductoPedido) => void,
    onIncreaseQuantity?: (id: string) => void,
    onDecreaseQuantity?: (id: string) => void,
    mode?: 'view' | 'edit'
}
export const CustomProductoPedidoBagde = ({productoPedido, onRemove = () => {}, onIncreaseQuantity = () => {}, onDecreaseQuantity=() => {}, mode = 'view' }:Props) => {
    const {cantidad, caracteristicas,subtotal, size,producto} = productoPedido;
    return (
        <Card className="p-3">
            <div className="flex gap-3">
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-lg bg-muted">
                    <img
                        src={producto?.imagen || '/placeholder.svg'}
                        alt={producto.name}
                        className="w-14 h-14 object-cover aspect-square rounded-2xl"
                    />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{producto.name}</h4>
                    <p className="text-xs text-muted-foreground">
                        {size.size} - {formatCurrency(size.price || 0)} c/u
                    </p>
                    {mode === 'view' && 
                    <p className="text-xs text-muted-foreground">Cantidad {productoPedido.cantidad}</p>
                    }
                    <p className="text-xs text-muted-foreground">
                        {caracteristicas}
                    </p>

                    {/* Quantity Controls */}
                    {mode === 'edit' && 
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
                    </div>}
                </div>

                {/* Subtotal & Remove */}
                <div className="flex flex-col items-end justify-between">
                    {mode === 'edit' && 
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive hover:text-destructive"
                        onClick={() => onRemove(productoPedido)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>}
                    <span className="font-semibold text-sm">
                        {formatCurrency(subtotal)}
                    </span>
                </div>
            </div>
        </Card>
    )
}
