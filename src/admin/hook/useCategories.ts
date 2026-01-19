import { useQuery } from "@tanstack/react-query"
import { getAllCategoriesAction } from "../actions/get-all-categories"

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategoriesAction,
    staleTime: 1000 * 60 * 60,
    retry: false
  })
}
