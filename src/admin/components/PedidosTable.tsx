import { Button } from "@/components/ui/button";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format-currency";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router";
import { CustomStatusBadge } from "./CustomStatusBadge";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import type { Pedido } from "@/interfaces/pedidos-response";
import { formatDateStringFromTimestamp } from "@/lib/format-date";

export const PedidosTable = ({pedidos}:{pedidos:Pedido[]}) => {
    
    const navigate = useNavigate();
    return (
        <div className="card-elevated overflow-hidden shadow-md border rounded-2xl p-">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                        <TableHead className="font-semibold text-foreground">Cliente</TableHead>
                        <TableHead className="font-semibold text-foreground">Entrega</TableHead>
                        <TableHead className="font-semibold text-foreground">Productos</TableHead>
                        <TableHead className="font-semibold text-foreground">Total</TableHead>
                        <TableHead className="font-semibold text-foreground">Estado</TableHead>
                        <TableHead className="font-semibold text-foreground text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pedidos.map((order, index) => (
                        <TableRow
                            key={order.id}
                            className="hover:bg-muted/50 cursor-pointer animate-fade-in border-border"
                            style={{ animationDelay: `${index * 50}ms` }}
                            onClick={() => navigate(`/pedidos/${order.id}`)}
                        >
                            <TableCell>
                                <div>
                                    <p className="font-medium text-foreground">{order.cliente}</p>
                                    <p className="text-sm text-muted-foreground">{order.lugarEntrega}</p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <p className="font-medium text-foreground">
                                        {formatDateStringFromTimestamp(order.fechaEntrega)}
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <p className="font-medium text-foreground">
                                        {order.productos.reduce((sum, p) => sum + p.cantidad, 0)}
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell className="font-semibold text-foreground">
                                {formatCurrency(order.total)}
                            </TableCell>
                            <TableCell>
                                <CustomStatusBadge status={order.estatus} />
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/pedidos/${order.id}`);
                                        }}>
                                            <Eye className="w-4 h-4 mr-2" />
                                            Ver detalle
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/pedidos/${order.id}/editar`);
                                        }}>
                                            <Edit className="w-4 h-4 mr-2" />
                                            Editar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-destructive"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Eliminar
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

