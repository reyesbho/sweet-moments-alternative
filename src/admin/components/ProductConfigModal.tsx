import { useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import type { Size } from '@/interfaces/producto';
import type { ProductoPedido } from '@/interfaces/pedidos-response';
import { v4 as uuidv4 } from 'uuid';
import { formatCurrency } from '@/lib/format-currency';
import SizeBadge from './SizeBadge';


interface ProductConfigModalProps {
  productoPedido: Partial<ProductoPedido>;
  open: boolean;
  onClose: () => void;
  onConfirm: (product: ProductoPedido) => void;
}


export function ProductConfigModal({
  productoPedido,
  open,
  onClose,
  onConfirm,
}: ProductConfigModalProps) {
  const { producto: product } = productoPedido;
  const [sizeSelected, setSizeSelected] = useState<Size | undefined>(productoPedido.producto?.sizes.find(size => size.size === 'Por defecto'));
  const [errorSize, setErrorSize] = useState<String | null>(null)
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const subTotal = useMemo(() => {
    if (!sizeSelected) return 0;
    return sizeSelected.price * quantity;
  }, [sizeSelected, quantity])

  const handleClose = () => {
    // Reset state when closing
    setSizeSelected({ size: 'Por defecto', price: 0 });
    setQuantity(1);
    setNotes('');
    onClose();
  };

  if (!productoPedido || !product) return null;

  const handleConfirm = () => {
    if (!sizeSelected) {
      setErrorSize('Seleccione un tamaño')
      return;
    }

    const productoFinal: ProductoPedido = {
      id: productoPedido.id ?? uuidv4(),
      producto: productoPedido.producto!,
      size: sizeSelected,
      cantidad: quantity,
      caracteristicas: notes,
      subtotal: subTotal,
    };

    onConfirm(productoFinal);

    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Configurar Producto
          </DialogTitle>
          <DialogDescription>
            Personaliza tu pedido antes de agregarlo
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Product Preview */}
          <div className="flex gap-4 p-3 bg-muted/50 rounded-lg">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
              <img
                src={product.imagen || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                {product.descripcion}
              </p>
              <Badge variant="secondary" className="mt-2 text-xs">
                {product.category}
              </Badge>
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tamaño</Label>
            {errorSize && <p className='text-red-500'>Seleccione un tamaño</p>}
            <div className="grid grid-cols-3 gap-2">
              {product.sizes.map((sizeOption) => {
                const isSelected = sizeSelected?.size === sizeOption.size;
                return (
                  <SizeBadge key={sizeOption?.size} size={sizeOption} isSelected={isSelected} onSelected={(sizeSelected) => {setErrorSize(''); setSizeSelected(sizeSelected);}}></SizeBadge>
                );
              })}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Cantidad</Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="product-notes" className="text-sm font-medium">
              Notas especiales
            </Label>
            <Textarea
              id="product-notes"
              placeholder="Ej: Sin gluten, decoración especial, mensaje personalizado..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Subtotal */}
          <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
            <span className="text-sm font-medium text-muted-foreground">Subtotal:</span>
            <span className="text-xl font-bold text-primary">{formatCurrency(subTotal)}</span>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="gradient-primary text-primary-foreground"
          >
            Agregar al Pedido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
