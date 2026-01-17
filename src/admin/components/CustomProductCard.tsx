import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Producto } from "@/interfaces/producto"
import { formatCurrency } from "@/lib/format-currency"
import { cn } from "@/lib/utils"
import { Check, Plus } from "lucide-react"

interface Props {
    producto: Producto,
    selected?: boolean
}
export const CustomProductCard = ({ producto, selected = false}: Props) => {
    return (
        <Card
            className={cn(
                "relative overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg group border-2",
                selected ? "border-primary shadow-lg bg-primary/5" : "border-transparent hover:border-primary/30"
            )}
            // onClick={() => onSelectProduct(product)}
        >
            {/* Selection Indicator */}
            {selected && (
                <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg">
                    <Check className="h-4 w-4" />
                </div>
            )}

            {/* Product Image */}
            <div className="relative h-28 overflow-hidden bg-muted">
                <img
                    src={producto.imagen || '/placeholder.svg'}
                    alt={producto.name}
                    className={cn(
                        "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
                        selected && "brightness-95"
                    )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <Badge
                    variant="secondary"
                    className="absolute bottom-2 left-2 bg-background/90 text-foreground text-xs"
                >
                    {producto.category}
                </Badge>
            </div>

            {/* Product Info */}
            <div className="p-3 space-y-1.5">
                <h4 className="font-semibold text-sm line-clamp-1">{producto.name}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
                    {producto.descripcion}
                </p>
                <div className="flex items-center justify-between pt-1">
                    <span className="text-base font-bold text-primary">
                        {formatCurrency((isNaN(producto.price) ? 0 : producto.price))}
                    </span>
                    <Button
                        type="button"
                        size="sm"
                        variant={selected ? "secondary" : "default"}
                        className="h-7 text-xs"
                        // onClick={(e) => {
                        //     e.stopPropagation();
                        //     onSelectProduct(producto);
                        // }}
                    >
                        {selected ? (
                            <Check className="h-3 w-3 mr-1" />
                        ) : (
                            <Plus className="h-3 w-3 mr-1" />
                        )}
                        {selected ? 'Agregado' : 'Agregar'}
                    </Button>
                </div>
            </div>
        </Card>
    )
}
