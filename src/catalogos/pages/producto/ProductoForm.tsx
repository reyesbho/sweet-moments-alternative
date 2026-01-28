import { useCategories } from "@/admin/hook/useCategories"
import { NewCategoryModal } from "@/catalogos/components/NewCategoryModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { Category, Producto } from "@/interfaces/producto"
import { Package, Upload } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"

interface Props {
    producto: Producto,
    isPending: boolean,
    onSubmit: (productoLike: Partial<Producto>) => Promise<void>
}


export const ProductoForm = ({producto, isPending, onSubmit}:Props) => {
    const {data: categories, mutation: mutationCatetory} =useCategories();
    const [showNewCategoryModal, setShowNewCategoryModal] = useState<boolean>(false);
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors}, control } = useForm<Producto>({
        defaultValues: producto
    });

    const handleSubmitLocal = (productoLike: Producto) => {
        console.log('')
    }

    const handleSubmiteNewCatery = async(categoryLike: Partial<Category>) => {
      mutationCatetory.mutate(categoryLike, {
        onSuccess: () => {
          toast.success('Categoria agregada correctamente', {position: 'top-right'});
          setShowNewCategoryModal(false);
        },
        onError: () => {
          toast.error('Error al crear la categoria')
        }
      })
    }
 
  return (
    <>
    <form onSubmit={handleSubmit(handleSubmitLocal)} className="space-y-6">
        {/* Image Upload */}
        <div className="card-elevated p-6 shadow-md border-solid border-2 rounded-2xl">
          <Label className="text-base font-display font-semibold mb-4 block">
            Imagen del Producto
          </Label>
          <div className="flex items-start gap-6">
            <div className="w-40 h-40 rounded-xl border-2 border-dashed border-border bg-muted/50 overflow-hidden flex items-center justify-center">
              {producto?.imagen ? (
                <img 
                  src={producto.imagen} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="w-12 h-12 text-muted-foreground/40" />
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="inline-flex items-center justify-center px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Upload className="w-4 h-4 mr-2" />
                  Subir imagen
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  {...register('imagen', {required: true})}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-muted-foreground mt-2">
                PNG, JPG o WEBP. Máximo 2MB.
              </p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="card-elevated p-6 shadow-md border-solid border-2 rounded-2xl">
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">
            Información del Producto
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del producto *</Label>
              <Input
                id="name"
                {...register('name',{required: true}) }
                placeholder="Ej: Pastel de Tres Leches"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                {...register('descripcion')}
                placeholder="Describe tu producto..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoría *</Label>
                <Select 
                onValueChange={(value) => {
                    if (value === 'nueva') {
                      setShowNewCategoryModal(true);
                    }
                  }}
                 >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.descripcion}>
                        {category.descripcion}
                      </SelectItem>
                    ))}
                    <SelectItem value="nueva">+ Nueva categoría</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="card-elevated p-6 shadow-md border-solid border-2 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="available" className="text-base font-display font-semibold">
                Activo
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Activa o desactiva la disponibilidad del producto
              </p>
            </div>
            <Switch
              id="available"
              {...register('estatus')}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 ">
          <Button type="button" variant="outline" onClick={() => navigate('/productos')}>
            Cancelar
          </Button>
          <Button type="submit" className="gradient-primary text-primary-foreground">
            Guardar Cambios
          </Button>
        </div>
      </form>
      <NewCategoryModal
        open={showNewCategoryModal}
        onOpenChange={setShowNewCategoryModal}
        existingCategories={categories || []}
        onCategoryCreated={handleSubmiteNewCatery}
      />
    </>
  )
}


