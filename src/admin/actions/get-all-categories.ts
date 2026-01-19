import { momentsApi } from "@/api/moments.api"
import type { Category } from "@/interfaces/producto";

export const getAllCategoriesAction = async():Promise<Category[]> => {
    try {
        const response = await momentsApi.get<Category[]>('/categories');
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener las categorias')
    }
}