import { useQuery } from "@tanstack/react-query"
import { getResumePedidosAction } from "../actions/get-resume-pedidos"
import { useSearchParams } from "react-router"


export const useResumePedidos = () => {
    const [searchParams] = useSearchParams();
    const fechaInicial = searchParams.get('fechaInicial') ?? undefined;
    const fechaFinal = searchParams.get('fechaFinal') ?? undefined;
    return useQuery({
        queryKey: ['resume',{fechaInicial, fechaFinal}],
        queryFn: () => getResumePedidosAction({
            fechaInicial,
            fechaFinal
        }),
        staleTime: 1000 * 60 * 60 * 1,
        retry: false
    })
}
