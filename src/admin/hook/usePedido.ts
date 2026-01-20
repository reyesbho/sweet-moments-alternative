import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getPedidoByIdAction } from "../actions/get-pedido-dy-id";
import { createPedidoAction } from "../actions/create-pedido";

export const usePedido = (id: string) => {

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey:['pedido',{id}],
        queryFn: () => getPedidoByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5,
    })

    const mutation = useMutation({
        mutationFn: createPedidoAction,
        onSuccess: (pedido) => {
            //invalidar cache por que se agrego nuevo pedido
            queryClient.invalidateQueries({queryKey: ['pedidos']})
            queryClient.invalidateQueries({queryKey:['pedido', {id:pedido.id}]});

            //actualizar query data
            queryClient.setQueryData(['pedidos',{id: pedido.id}], pedido);
        }
    })

    return {...query, mutation}
}