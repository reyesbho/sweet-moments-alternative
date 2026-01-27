import { useInfiniteQuery, } from "@tanstack/react-query"
import { getAllPedidosAction } from "../actions/get-all-pedidos"
import { useSearchParams } from "react-router"
import { normalizeEstatus } from "@/lib/helper-estatus";


export const usePedidos = () => {
    const [searchParams] = useSearchParams();
    const estatus = normalizeEstatus(searchParams.get('estatus'));
    const fechaInicio  = searchParams.get('fechaInicio') ?? undefined;
    const fechaFin  = searchParams.get('fechaFin') ?? undefined;
    const pageSize = searchParams.get('pageSize') || 15;
    const cliente = searchParams.get('cliente') || undefined;

    const queryPedidos = useInfiniteQuery({
        queryKey: ['pedidos', {estatus, fechaInicio, fechaFin,pageSize, cliente}],
        queryFn: ({pageParam}:{pageParam: string | undefined}) => getAllPedidosAction({
          estatus: estatus,
          fechaInicio,
          fechaFin,
          cursorFechaCreacion: pageParam,
          pageSize: isNaN(+pageSize) ? 0 : pageSize,
          cliente
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

