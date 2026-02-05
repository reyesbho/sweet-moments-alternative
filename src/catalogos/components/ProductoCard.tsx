import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, MoreHorizontal, Trash2, Package } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router';
import type { Producto } from '@/interfaces/producto';
import { formatCurrency } from '@/lib/format-currency';

interface productoCardProps {
    producto: Producto;
}

export const ProductoCard = ({ producto }: productoCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="cursor-pointer card-elevated overflow-hidden group animate-slide-up hover:shadow-lg transition-shadow duration-300 shadow-md rounded-2xl">
            <div className="aspect-4/3 bg-muted relative overflow-hidden">
                {producto.imagen ? (
                    <img
                        src={producto.imagen}
                        alt={producto.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-muted-foreground/40" />
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <Badge
                        variant="secondary"
                        className={cn(
                            'font-medium',
                            producto.estatus
                                ? 'bg-status-done '
                                : 'bg-status-delete '
                        )}
                    >
                        {producto.estatus ? 'Disponible' : 'No disponible'}
                    </Badge>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <Badge variant="outline" className="mb-2 text-xs">
                            {producto.category}
                        </Badge>
                        <h3 className="font-display font-semibold text-foreground truncate">
                            {producto.name}
                        </h3>
                        <p className="text-sm text-muted-foreground my-2">
                            {producto.descripcion}
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/catalogos/productos/${producto.id}`)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Eliminar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <hr></hr>
                <div className="flex flex-row flex-wrap gap-2 my-2">
                    {producto.sizes.map(size => (
                        <div key={size.size} className="flex flex-col gap-1 items-center">
                            <Badge className="bg-amber-300 text-black ">
                                <p>{size.size}</p>
                                <p>{formatCurrency(size.price ?? 0)}</p>
                            </Badge>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
