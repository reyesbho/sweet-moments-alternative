import { useQuery } from "@tanstack/react-query"
import { getAllPedidosAction } from "../actions/get-all-pedidos"
import { useSearchParams } from "react-router"
import type { EstatusPedido } from "@/interfaces/pedidos-response";


export const usePedidos = () => {
    const [searchParams] = useSearchParams();
    const estatus = searchParams.get('estatus') as EstatusPedido || undefined;
    const fechaInicio  = searchParams.get('fechaInicio') ?? undefined;
    const fechaFin  = searchParams.get('fechaFin') ?? undefined;
    const cursorFechaCreacion = searchParams.get('cursorFechaCreacion') ?? undefined;
    const pageSize = searchParams.get('pageSize') || 10;

    const queryPedidos = useQuery({
        queryKey: ['pedidos', {estatus, fechaInicio, fechaFin, cursorFechaCreacion, pageSize}],
        queryFn: () => getAllPedidosAction({
          estatus: estatus,
          fechaInicio,
          fechaFin,
          cursorFechaCreacion,
          pageSize: isNaN(+pageSize) ? 0 : pageSize,
        }),
        retry: false,
        staleTime: 1000 * 60 * 5
    })

  return {...queryPedidos}
}

