import { useNavigate, useParams } from 'react-router';
import { useProducto } from '@/catalogos/hooks/useProducto';
import CustomJumbotron from '@/admin/components/CustomJumbotron';
import { ProductoForm } from './ProductoForm';
import type { Producto } from '@/interfaces/producto';
import { toast } from 'sonner';

const ProductoCatalogo = () => {
  const { id } = useParams();
  const { data: producto, mutation } = useProducto(id || '');
  const navigate = useNavigate();
  const title = (id === 'new' ? 'Registrar nuevo producto' : 'Actualizar producto');
  const subTitle = (id === 'new' ? 'Aqui puedes registrar un nuevo producto' : 'Aqui puedes actualizar tu producto');

  const handleSubmit = async (productoLike: Partial<Producto> & { file?: File }) => {
    mutation.mutate(productoLike, {
      onSuccess: (producto) => {
        toast.success(`Producto ${id === 'new' ? 'creado' : 'actualizado'} correctamente`, { position: 'top-right' });
        navigate(`/catalogos/productos/${producto.id}`);
      },
      onError: () => {
        toast.error(`Error al ${id === 'new' ? 'crear' : 'actualizar'}  el producto`, { position: 'top-right' })
      }
    })
  };

  if (!producto) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col max-w-11/12  ">
      {/* Header */}
      <CustomJumbotron title={title} subtitle={subTitle}></CustomJumbotron>

      <div className=' flex flex-col items-center'>
        <ProductoForm
          producto={producto}
          isPending={mutation.isPending}
          onSubmit={handleSubmit}
        ></ProductoForm>
      </div>
    </div>
  );
}


export default ProductoCatalogo;