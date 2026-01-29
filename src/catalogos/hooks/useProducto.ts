import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductoById } from "../actions/get-producto-by-id";
import { createProductoAction } from "../actions/create-producto";

export const useProducto = (id: string) => {

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['producto', {id}],
    queryFn: () => getProductoById(id),
    retry: false,
    staleTime: 1000 * 60 * 5
  })

  const mutation = useMutation({
    mutationFn: createProductoAction,
    onSuccess:(producto) => {
      //invalidar cache por que se agrego nuevo producto
      queryClient.invalidateQueries({queryKey:['productos']});
      queryClient.invalidateQueries({queryKey: ['producto', {id: producto.id}]});

      //actualizar cache
      queryClient.setQueryData(['productos',{id: producto.id}], producto);
    }
  })  

  return {...query, mutation}
}
