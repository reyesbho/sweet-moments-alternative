import { CustomProductBagde } from "@/admin/components/CustomProductBagde";
import { CustomProductSelector } from "@/admin/components/CustomProductSelector";
import { ProductConfigModal } from "@/admin/components/ProductConfigModal";
import { getTasksProductoPedidoInitialState, tasksProductosPedidosReducer } from "@/admin/hook/reducer/tasksProductosPedido";
import type { InputsFormPedido } from "@/admin/interface/interfaces";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Pedido, ProductoPedido } from "@/interfaces/pedidos-response";
import type { Producto } from "@/interfaces/producto";
import { formatCurrency } from "@/lib/format-currency";
import { addHourToDate, formatDateFromTimestamp, getHourFromDate } from "@/lib/format-date";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, ShoppingBag } from "lucide-react";
import { useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Controller } from "react-hook-form";
import { Timestamp } from "firebase/firestore";


interface Props {
    pedido: Pedido,
    isPending: boolean,
    onSubmit: (pedidoLike: Partial<Pedido>) => Promise<void>
}



export const PedidoForm = ({ pedido, isPending, onSubmit }: Props) => {
    const [state, dispatch] = useReducer(tasksProductosPedidosReducer, getTasksProductoPedidoInitialState(pedido));
    const [selectedDate, setSeletedDate] = useState(formatDateFromTimestamp(pedido.fechaEntrega));
    const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, control } = useForm<InputsFormPedido>({
        defaultValues: { ...pedido, selectedHour: getHourFromDate(selectedDate), estatus: pedido.estatus ?? 'TODO' }
    });

    const handleCalendar = (date: Date) => {
        setSeletedDate(date);
    }

    const handleSelectProduct = (product: Producto) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };


    const handleConfirmProduct = (productoPedido: ProductoPedido) => {
        dispatch({ type: 'ADD_PRODUCTO', payload: productoPedido })
    }

    const handleSubmitLocal = (pedidoLike:InputsFormPedido) => {
        const newFechaHoraEntrega = addHourToDate(selectedDate, pedidoLike.selectedHour);
        const newPedido:Partial<Pedido> = {...pedidoLike, productos: state.productos, fechaEntrega: Timestamp.fromDate(newFechaHoraEntrega), total: state.total};
        console.log(newPedido)
        onSubmit(newPedido);
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitLocal)} className="space-y-8">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Left Column - Customer & Order Info */}
                    <div className="space-y-6">
                        {/* Customer Info */}
                        <div className="card-elevated p-6 shadow-md border">
                            <h2 className="font-display font-semibold text-lg text-foreground mb-4">
                                Información del Cliente
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="customerName">Nombre del cliente *</Label>
                                    <Input
                                        id="customerName"
                                        {...register('cliente', { required: true })}
                                        className={cn({ 'border-red-500': errors.cliente })}
                                        placeholder="Nombre completo"
                                        required
                                    />
                                    {errors.cliente && <p className='text-red-500'>Nombre requerido</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="deliveryAddress">Dirección de entrega</Label>
                                    <Input
                                        id="deliveryAddress"
                                        {...register('lugarEntrega')}
                                        className={cn({ 'border-red-500': errors.lugarEntrega })}
                                        placeholder="Calle, número, colonia"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Delivery */}
                        <div className="card-elevated p-6 shadow-md border">
                            <h2 className="font-display font-semibold text-lg text-foreground mb-4">
                                Fecha y Hora de Entrega
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Fecha de entrega *</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    'w-full justify-start text-left font-normal',
                                                    !selectedDate && 'text-muted-foreground'
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {selectedDate ? format(selectedDate, 'PPP', { locale: es }) : 'Seleccionar fecha'}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={handleCalendar}
                                                required
                                                className="pointer-events-auto"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="deliveryTime">Hora de entrega *</Label>
                                    <Input
                                        id="deliveryTime"
                                        type="time"
                                        {...register('selectedHour')}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Notes & Status */}
                        <div className="card-elevated p-6 shadow-md border">
                            <h2 className="font-display font-semibold text-lg text-foreground mb-4">
                                Notas y Estado
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Notas del pedido</Label>
                                    <Textarea
                                        id="notes"
                                        {...register('detalles')}
                                        placeholder="Instrucciones especiales, detalles del evento..."
                                        rows={4}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Estado</Label>
                                    <Controller
                                        name="estatus"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un estado" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="TODO">Por Hacer</SelectItem>
                                                    <SelectItem value="DONE">Entregado</SelectItem>
                                                    <SelectItem value="CANCELED">Cancelado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />

                                </div>
                            </div>
                        </div>

                        {/* Order Summary - Selected Items */}
                        <div className="card-elevated p-6 shadow-md border">
                            <h2 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5 text-primary" />
                                Resumen del Pedido
                            </h2>

                            {state.productos.length > 0 ? (
                                <div className="space-y-3">
                                    {state.productos.map((item, index) => {
                                        return (
                                            <CustomProductBagde
                                                key={index} productoPedido={item}
                                                onRemove={() => dispatch({ type: 'REMOVE_PRODUCTO', payload: item.id })}
                                                onIncreaseQuantity={() => dispatch({ type: 'INCREASE_QUANTITY', payload: item.id })}
                                                onDecreaseQuantity={() => dispatch({ type: 'DECREASE_QUEANTITY', payload: item.id })}
                                            ></CustomProductBagde>
                                        );
                                    })}

                                    {/* Total */}
                                    <div className="flex justify-between items-center pt-3 border-t">
                                        <span className="text-lg font-semibold">Total:</span>
                                        <span className="text-2xl font-bold text-primary">
                                            {formatCurrency(state.total)}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 border-2 border-dashed rounded-lg text-muted-foreground">
                                    <ShoppingBag className="h-10 w-10 mx-auto mb-2 opacity-40" />
                                    <p className="text-sm">No hay productos seleccionados</p>
                                    <p className="text-xs mt-1">Selecciona productos del catálogo</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Product Selection */}
                    <div className="xl:sticky xl:top-4 h-fit shadow-md border">
                        <div className="card-elevated p-6">
                            <h2 className="font-display font-semibold text-lg text-foreground mb-2">
                                Catálogo de Productos
                            </h2>
                            <p className="text-sm text-muted-foreground mb-4">
                                Haz clic en un producto para agregarlo al pedido
                            </p>
                            <CustomProductSelector handleSelecProduct={handleSelectProduct}
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                    <Button type="button" variant="outline" onClick={() => navigate('/pedidos')}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        className="gradient-primary text-primary-foreground"
                        disabled={isPending}
                    >
                        Guardar Cambios
                    </Button>
                </div>
            </form>
            {
                selectedProduct &&
                <ProductConfigModal
                    productoPedido={{ producto: selectedProduct }}
                    open={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedProduct(null);
                    }}
                    onConfirm={handleConfirmProduct}
                />
            }
        </>
    )
}
