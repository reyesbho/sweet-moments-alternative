import { CustomFilters } from "@/admin/components/CustomFilters"
import CustomJumbotron from "@/admin/components/CustomJumbotron"
import { PedidosTable } from "@/admin/components/PedidosTable"
import { usePedidos } from "@/admin/hook/usePedidos"
import { CustomPagination } from "@/components/custom/CustomPagination"

const PedidosPage = () => {
  const {pedidos, hasNextPage, fetchNextPage, totalLoaded, totalItems} = usePedidos();
  return (
    <>
        <CustomJumbotron
          title="Pedidos"
          subtitle="Todos los pedidos"
          showButtonNew={true}
        ></CustomJumbotron>
        <CustomFilters></CustomFilters>
        <PedidosTable  pedidos={pedidos} />
        <CustomPagination hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} totalItems={totalItems} totalLoaded={totalLoaded} ></CustomPagination>
    </>
  )
}

export default PedidosPage
