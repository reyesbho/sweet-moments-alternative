import { useInfiniteQuery, } from "@tanstack/react-query"
import { getAllPedidosAction } from "../actions/get-all-pedidos"
import { useSearchParams } from "react-router"
import type { EstatusPedido } from "@/interfaces/pedidos-response";


export const usePedidos = () => {
    const [searchParams] = useSearchParams();
    const estatus = searchParams.get('estatus') as EstatusPedido || undefined;
    const fechaInicio  = searchParams.get('fechaInicio') ?? undefined;
    const fechaFin  = searchParams.get('fechaFin') ?? undefined;
    const pageSize = searchParams.get('pageSize') || 15;

    const queryPedidos = useInfiniteQuery({
        queryKey: ['pedidos', {estatus, fechaInicio, fechaFin,pageSize}],
        queryFn: ({pageParam}:{pageParam: string | undefined}) => getAllPedidosAction({
          estatus: estatus,
          fechaInicio,
          fechaFin,
          cursorFechaCreacion: pageParam,
          pageSize: isNaN(+pageSize) ? 0 : pageSize,
        }),
        initialPageParam: undefined,
        getNextPageParam:(lastPage) => lastPage.hasMore ? lastPage.nextCursor : undefined,
        retry: false,
        staleTime: 1000 * 60 * 5
    })

    const newPedidos = queryPedidos.data?.pages.flatMap(p => p.pedidos);
  return {
    pedidos: newPedidos ?? [],
    totalItems: queryPedidos.data?.pages[0].totalDocs ?? 0,
    totalLoaded: newPedidos?.length ?? 0,
    ...queryPedidos}
}

