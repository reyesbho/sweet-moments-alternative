import {useParams } from 'react-router';
import { useProducto } from '@/catalogos/hooks/useProducto';
import CustomJumbotron from '@/admin/components/CustomJumbotron';
import { ProductoForm } from './ProductoForm';
import type { Producto } from '@/interfaces/producto';

const ProductoCatalogo = () => {
  const { id } = useParams();
  const {data: producto, isPending, } = useProducto(id || '');
  const title = (id === 'new' ? 'Registrar nuevo producto':'Actualizar producto');
  const subTitle = (id === 'new' ? 'Aqui puedes registrar un nuevo producto':'Aqui puedes actualizar tu producto');

  const handleSubmit = async (productoLike: Partial<Producto>) => {
    return;
  };

  if(!producto) return <h1>Loading...</h1>;

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      {/* Header */}
      <CustomJumbotron title={title} subtitle={subTitle}></CustomJumbotron>

      <ProductoForm
        producto={producto}
        isPending={isPending}
        onSubmit={handleSubmit}
      ></ProductoForm>
    </div>
  );
}


export default ProductoCatalogo;