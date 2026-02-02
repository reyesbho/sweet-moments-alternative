import SizeBadge from "@/admin/components/SizeBadge"
import { NewCategoryModal } from "@/catalogos/components/NewCategoryModal"
import { NewSizeModal } from "@/catalogos/components/NewSizeModal"
import { useProductoForm } from "@/catalogos/hooks/useProductoForm"
import { ErroItem } from "@/components/custom/ErrorItem"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { Producto } from "@/interfaces/producto"
import { Package, Upload } from "lucide-react"
import { Controller } from "react-hook-form"
import { useNavigate } from "react-router"

interface Props {
  producto: Producto,
  isPending: boolean,
  onSubmit: (productoLike: Partial<Producto>) => Promise<void>
}


export const ProductoForm = ({ producto, isPending, onSubmit }: Props) => {
  const navigate = useNavigate();
  const {
    dispatch, 
    sizesWatch, 
    categoryWatch, 
    categories, 
    handleSubmitLocal, 
    productoFormState,
    handleFileChange, 
    handleSubmitedNewCatery,
    handleSubmitNewSize,
    handleSelectCategory, 
    form:{handleSubmit, register, formState:{errors}, control}
  } = useProductoForm({producto, onSubmit});

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
              {productoFormState.selectedImage ?
                (<img
                  src={URL.createObjectURL(productoFormState.selectedImage)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />)
                :
                (producto?.imagen ? (<img
                  src={producto.imagen}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />) : <Package className="w-12 h-12 text-muted-foreground/40" />)
              }

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
                  onChange={handleFileChange}
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
                {...register('name', { required: { value: true, message: 'El nombre es requerido' }, max: { value: 200, message: 'Maximo 200 caracteres' } })}
                placeholder="Ej: Pastel de Tres Leches"
                required
              />
              <ErroItem error={errors.name}></ErroItem>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                {...register('descripcion', { max: 200 })}
                placeholder="Describe tu producto..."
                rows={3}
              />
              <ErroItem error={errors.descripcion}></ErroItem>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sizes">Tamaños y precios</Label>
              <Button type="button" onClick={() => dispatch({type:"OPEN_SIZE_MODAL"})}>+ Agregar tamaño y precio</Button>
              <div className="flex flex-row gap-3 flex-wrap">
                {sizesWatch.length > 0 && sizesWatch.map(size => (
                  <SizeBadge key={size.size} size={size} ></SizeBadge>
                ))}
              </div>
            </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Categoría *</Label>
                  <Button className="text-sm" type="button" onClick={() => dispatch({type: 'OPEN_CATEGORY_MODAL'})}> + Nueva categoria</Button>
                </div>
                <ErroItem error={errors.category}></ErroItem>
                <div className="flex flex-row flex-wrap gap-1">
                  {categories && categories.map(cat => {
                    const isSelected = categoryWatch === cat.descripcion;
                    return (
                      <Badge key={cat.id} className="cursor-pointer py-2" variant={isSelected ? 'default' : 'outline'} onClick={() => handleSelectCategory(cat)} >{cat.descripcion}</Badge>
                    )
                  })}
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
            <Controller
              name="estatus"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <Switch
                  id="available"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            >
            </Controller>

          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 ">
          <Button type="button" variant="outline" onClick={() => navigate('/productos')}>
            Cancelar
          </Button>
          <Button disabled={isPending} type="submit" className="gradient-primary text-primary-foreground">
            Guardar Cambios
          </Button>
        </div>
      </form>
      <NewCategoryModal
        open={productoFormState.showNewCategoryModal}
        onOpenChange={() => dispatch({type: 'CLOSE_CATEGORY_MODAL'})}
        existingCategories={categories || []}
        onCategoryCreated={handleSubmitedNewCatery}
      />
      <NewSizeModal
        open={productoFormState.showNewSizeModal}
        onOpenChange={() => dispatch({type: 'CLOSE_SIZE_MODAL'})}
        existingSizes={sizesWatch}
        onSizeAdded={handleSubmitNewSize}
      >
      </NewSizeModal>
    </>
  )
}


