import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import { ArrowLeft, CalendarIcon, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useForm } from 'react-hook-form'
import type { Pedido, ProductoPedido } from "@/interfaces/pedidos-response";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomProductBagde } from "@/admin/components/CustomProductBagde";
import { useProductos } from "@/admin/hook/useProductos";
import { CustomProductSelector } from "@/admin/components/CustomProductSelector";
import CustomJumbotron from "@/admin/components/CustomJumbotron";
import { useState } from "react";
import type { Producto } from "@/interfaces/producto";

interface Props {
  title: string,
  subtitle: string,
  pedido: Pedido,
  isPending: boolean,
  onSubmit: (pedidoLike: Partial<Pedido>) => Promise<void>
}


const PedidoPage = ({ title, subtitle, pedido, isPending, onSubmit }: Props) => {
  const [productsSelected, setProductsSelected] = useState<Producto[]>([])
  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<Pedido>({
    defaultValues: pedido
  });
  const { data } = useProductos();
  const navigate = useNavigate();
  return (
    <div className="space-y-6 animate-fade-in">
      <CustomJumbotron title="Nuevo Pedido" subtitle="Generar" ></CustomJumbotron>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">Dirección de entrega</Label>
                  <Input
                    id="deliveryAddress"
                    {...register('lugarEntrega', { required: true })}
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
                          // !deliveryDate && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {/* {deliveryDate ? format(deliveryDate, 'PPP', { locale: es }) : 'Seleccionar fecha'} */}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        // selected={deliveryDate}
                        // onSelect={setDeliveryDate}
                        initialFocus
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
                    // value={formData.deliveryTime}
                    // onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
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
                    // value={formData.notes}
                    // onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Instrucciones especiales, detalles del evento..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select
                    // value={formData.status}
                    // onValueChange={(value) => setFormData({ ...formData, status: value as OrderStatus })}
                    {...register('estatus', { required: true })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="por-hacer">Por Hacer</SelectItem>
                      <SelectItem value="entregado">Entregado</SelectItem>
                      <SelectItem value="cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Order Summary - Selected Items */}
            <div className="card-elevated p-6 shadow-md border">
              <h2 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Resumen del Pedido
              </h2>

              {productsSelected.length > 0 ? (
                <div className="space-y-3">
                  {productsSelected.map((item, index) => {
                    const product = { producto: item } as ProductoPedido;
                    return (
                      <CustomProductBagde key={index} productoPedido={product}></CustomProductBagde>
                    );
                  })}

                  {/* Total */}
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-primary">
                      {/* {formatCurrency(pedido.total || 0)} */}
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
              <CustomProductSelector
              // products={availableProducts}
              // selectedProductIds={items.map(item => item.productId)}
              // onSelectProduct={handleSelectProduct}
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
            'Guardar Cambios'
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PedidoPage
