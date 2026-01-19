import { useQuery } from "@tanstack/react-query"
import { getProductosAction } from "../actions/get-productos"

interface Options {
  category?: string,
  name?: string
}
export const useProductos = ({ category, name }: Options) => {
  const queryProductos = useQuery({
    queryKey: ['productos'],
    queryFn: getProductosAction,
    staleTime: 1000 * 60 * 5,
    retry: false,
    select: (productos) => {
      let filtered = [...productos];

      if (category) {
        filtered = filtered.filter(
          (p) => p.category === category
        );
      }

      if (name) {
        const search = name.toLowerCase();
        filtered = filtered.filter(
          (p) => p.name.toLowerCase().includes(search)
        );
      }

      return filtered;
    }
  })
  return { ...queryProductos }
}
