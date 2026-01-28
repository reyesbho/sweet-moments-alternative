import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllCategoriesAction } from "../actions/get-all-categories"
import { createCategoryAction } from "@/catalogos/actions/create-category";

export const useCategories = () => {

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategoriesAction,
    staleTime: 1000 * 60 * 60,
    retry: false
  })

  const mutation = useMutation({
    mutationFn: createCategoryAction,
    onSuccess: (category) => {
      //invalidar cache  por que se agrego nuevo item
      queryClient.invalidateQueries({queryKey:['categories']})

      //actualizar query data
      queryClient.setQueryData(['pedidos',{id: category.id}], category);
    }
  })

  return  {...query, mutation}
}
