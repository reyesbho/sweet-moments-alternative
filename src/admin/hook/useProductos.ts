import { useQuery } from "@tanstack/react-query"
import { getProductosAction } from "../actions/get-productos"

export const useProductos = () => {

  return useQuery({
    queryKey:['productos'],
    queryFn: getProductosAction,
    staleTime: 1000 * 60 * 5,
    retry: false
  })
}
