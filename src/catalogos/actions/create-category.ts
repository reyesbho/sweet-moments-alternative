import { momentsApi } from "@/api/moments.api";
import type { Category } from "@/interfaces/producto";

export const createCategoryAction = async(category: Partial<Category>) => {
    try {
        const {data} = await momentsApi({
            url: '/categories',
            method: 'POST',
            data: category
        })

        return {...data};
    } catch (error) {
        throw new Error('Error al crear la categoria')
    }
}