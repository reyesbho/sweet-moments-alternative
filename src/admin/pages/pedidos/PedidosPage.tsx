import CustomJumbotron from "@/admin/components/CustomJumbotron"
import { PedidosTable } from "@/admin/components/PedidosTable"
import { usePedidos } from "@/admin/hook/usePedidos"
import { CustomPagination } from "@/components/custom/CustomPagination"

const PedidosPage = () => {
  const {data} = usePedidos();
  return (
    <>
        <CustomJumbotron
          title="Pedidos"
          subtitle="Todos los pedidos"
          showButtonNew={true}
        ></CustomJumbotron>
        <PedidosTable  pedidos={data?.pedidos || []} />
        <CustomPagination totalPages={data?.totalPages || 0}></CustomPagination>
    </>
  )
}

export default PedidosPage
