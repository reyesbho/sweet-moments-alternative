import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { ProductoPedido } from "@/interfaces/pedidos-response"
import { formatCurrency } from "@/lib/format-currency"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useState } from "react"


interface Props{
    productoPedido: ProductoPedido
}
export const CustomProductBagde = ({productoPedido}:Props) => {
    const {cantidad, caracteristicas, precio, size,producto} = productoPedido;
    const [quantity, setQuantity] = useState(1);
    return (
        <Card className="p-3">
            <div className="flex gap-3">
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    <img
                        src={producto?.imagen || '/placeholder.svg'}
                        alt={producto.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{producto.name}</h4>
                    <p className="text-xs text-muted-foreground">
                        {formatCurrency(producto.price)} c/u
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-1.5">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setQuantity(prev => prev - 1)}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setQuantity(prev => prev+1)}
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
                        // onClick={() => removeItem(index)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold text-sm">
                        {formatCurrency(quantity * producto.price)}
                    </span>
                </div>
            </div>
        </Card>
    )
}
