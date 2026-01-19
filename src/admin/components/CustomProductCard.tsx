import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import type { Producto } from "@/interfaces/producto"
import { formatCurrency } from "@/lib/format-currency"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

interface Props {
    producto: Producto
    onSelect: (product: Producto) => void
}
export const CustomProductCard = ({ producto, onSelect }: Props) => {
    return (
        <Card
            className={cn(
                "relative overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg group border-2"
            )}
            onClick={() => onSelect(producto)}
        >

            {/* Product Image */}
            <div className="relative h-28 overflow-hidden bg-muted">
                <img
                    src={producto.imagen || '/placeholder.svg'}
                    alt={producto.name}
                    className={cn(
                        "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105")}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <Badge
                    variant="secondary"
                    className="absolute bottom-2 left-2 bg-background/90 text-foreground text-xs"
                >
                    {producto.category}
                </Badge>

            </div>

            {/* Product Info */}
            <div className="p-3 space-y-1.5">
                <div className="flex flex-row justify-between items-center">
                    <h4 className="font-semibold text-sm line-clamp-1">{producto.name}</h4>
                    <div className="flex items-center">
                        <Button
                            type="button"
                            size="sm"
                            variant={"default"}
                            className="h-7 text-xs"
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelect(producto);
                            }}
                        >
                            <Plus className="h-3 w-3 mr-1" />
                            Agregar
                        </Button>
                    </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 min-h-8">
                    {producto.descripcion}
                </p>

                <div className="flex flex-row flex-wrap gap-2">
                    {producto.sizes.map(size => (
                        <div key={size.size} className="flex flex-col gap-1 items-start">
                            <Label>{size.size}</Label>
                            <Badge className="bg-gray-200 text-black">{formatCurrency(size.price ?? 0)}</Badge>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}
