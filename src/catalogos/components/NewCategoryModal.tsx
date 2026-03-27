import { useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FolderPlus, Loader2 } from 'lucide-react';
import type { Category } from '@/interfaces/producto';

interface NewCategoryModalProps {
  open: boolean;
  onOpenChange: () => void;
  onCategoryCreated: (categoryName: Partial<Category>) => void;
  existingCategories: Category[];
  isPending?: boolean;
}

export function NewCategoryModal({
  open,
  onOpenChange,
  onCategoryCreated,
  existingCategories,
  isPending = false,
}: NewCategoryModalProps) {
  const [error, setError] = useState('');
  const categoryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = categoryRef.current?.value;
    
    if (!trimmedName) {
      setError('El nombre de la categoría es requerido');
      return;
    }

    if(!trimmedName.match(/^[a-z_]+$/)){
      setError('Caracter invalid, solo se permite minusculas y guion bajo');
      return;
    }
    
    if (existingCategories.some(cat => cat.descripcion.toLowerCase() === trimmedName.toLowerCase())) {
      setError('Esta categoría ya existe');
      return;
    }
    
    onCategoryCreated({descripcion: trimmedName});
    setError('');
    onOpenChange();
  };

  const handleClose = () => {
    setError('');
    onOpenChange();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FolderPlus className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Nueva Categoría</DialogTitle>
              <DialogDescription>
                Crea una nueva categoría para organizar tus productos
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">Nombre de la categoría *</Label>
            <Input
              id="category-name"
              ref={categoryRef}
              placeholder="Ej: rosca_reyes"
              autoFocus
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
          
          <DialogFooter className="gap-2 ">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Guardando...</>
                : 'Agregar categoría'
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
