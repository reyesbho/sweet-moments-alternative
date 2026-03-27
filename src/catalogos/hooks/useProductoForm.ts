import { useCategories } from "@/admin/hook/useCategories";
import type { Category, Producto, Size } from "@/interfaces/producto";
import { useReducer } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getTaskProductoFormInitialState, useProductoFormReducer } from "./reducer/useProductoFormReducer";

interface Props{
    producto: Producto,
    onSubmit: (productoLike: Partial<Producto>) => Promise<void>
}

interface FormInputs extends Producto {
  file?: File
}
export const useProductoForm = ({producto, onSubmit}:Props) => {
  const { data: categories, mutation: mutationCatetory } = useCategories();
  const [productoFormState, dispatch] = useReducer(useProductoFormReducer, getTaskProductoFormInitialState());
  const form = useForm<FormInputs>({
    defaultValues: producto
  });
  const categoryWatch = form.watch('category');
  const sizesWatch = form.watch('sizes');

  const handleSubmitLocal = (productoLike: Producto) => {
    if(!productoLike.category) {
      form.setError('category', { message: 'Seleccione una categoria' })
      return;
    }

    if (!productoLike.sizes || productoLike.sizes.length <= 0) {
      form.setError('sizes', { message: 'Se requere minimo un tamaño y precio' })
      return;
    };
    onSubmit(productoLike);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    dispatch({type:'SET_IMAGE', payload: files[0]})
    form.setValue('file', files[0]);
  }

  const handleSubmitedNewCatery = async (categoryLike: Partial<Category>) => {
    mutationCatetory.mutate(categoryLike, {
      onSuccess: () => {
        toast.success('Categoria agregada correctamente', { position: 'top-right' });
        dispatch({type: 'CLOSE_CATEGORY_MODAL'});
      },
      onError: () => {
        toast.error('Error al crear la categoria')
      }
    })
  }

  const handleSubmitNewSize = (size: Size) => {
    const isEditing = !!productoFormState.editingSize;
    const newSizes = isEditing
      ? sizesWatch.map(s => s.size === size.size ? size : s)
      : [...sizesWatch, size];
    form.setValue("sizes", newSizes);
    dispatch({type: 'CLOSE_SIZE_MODAL'});
  }

  const handleEditSize = (size: Size) => {
    dispatch({ type: 'OPEN_SIZE_MODAL_EDIT', payload: size });
  }

  const handleSelectCategory = (category: Category) => {
    form.setValue("category", category.descripcion);
    form.clearErrors("category");
  }

  return {
    categories,
    productoFormState,
    sizesWatch,
    categoryWatch,
    isCategoryPending: mutationCatetory.isPending,

    dispatch,
    handleSelectCategory,
    handleEditSize,
    handleSubmitNewSize,
    handleSubmitedNewCatery,
    handleFileChange,
    handleSubmitLocal,
    form
}
}
