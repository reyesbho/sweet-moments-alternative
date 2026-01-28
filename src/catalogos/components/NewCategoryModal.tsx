import { useState } from 'react';
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
import { FolderPlus } from 'lucide-react';
import type { Category } from '@/interfaces/producto';

interface NewCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCategoryCreated: (categoryName: Partial<Category>) => void;
  existingCategories: Category[];
}

export function NewCategoryModal({
  open,
  onOpenChange,
  onCategoryCreated,
  existingCategories,
}: NewCategoryModalProps) {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = categoryName.trim();
    
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
    setCategoryName('');
    setError('');
    onOpenChange(false);
  };

  const handleClose = () => {
    setCategoryName('');
    setError('');
    onOpenChange(false);
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
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                setError('');
              }}
              placeholder="Ej: rosca_reyes"
              autoFocus
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Crear Categoría
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
