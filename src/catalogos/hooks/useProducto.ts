import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductoById } from "../actions/get-producto-by-id";

export const useProducto = (id: string) => {

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['producto', {id}],
    queryFn: () => getProductoById(id),
    retry: false,
    staleTime: 1000 * 60 * 5
  })

  

  return {...query}
}
