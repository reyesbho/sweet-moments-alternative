import { useNavigate, useParams } from "react-router";
import CustomJumbotron from "@/admin/components/CustomJumbotron";
import { PedidoForm } from "./PedidoForm";
import { usePedido } from "@/admin/hook/usePedido";
import { toast } from "sonner";
import type { Pedido } from "@/interfaces/pedidos-response";

const PedidoPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const {data: pedido, isPending, mutation} = usePedido(id || '');
  const title = (id === 'new' ? 'Registrar nuevo pedido':'Actualiza pedido');
  const subTitle = (id === 'new' ? 'Aqui puedes registrar un nuevo pedido':'Aqui puedes actualizar tu pedido');
  const handleSubmit = async (pedidoLike: Partial<Pedido>) => {
    mutation.mutate(pedidoLike, {
      onSuccess: (data) => {
        toast.success('Producto actualizado correctamente', {
          position: 'top-right'
        });
        navigate(`/pedidos/${data.id}`);
      },
      onError: () => {
        toast.error('Error al actualizar el pedido');
      }
    })
  }

  if(!pedido){
    return <h1>Loading...</h1>
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <CustomJumbotron title={title} subtitle={subTitle} ></CustomJumbotron>
      <PedidoForm
        isPending={isPending}
        onSubmit={handleSubmit}
        pedido={pedido}
      ></PedidoForm>
      
    </div>
  )
}

export default PedidoPage;
