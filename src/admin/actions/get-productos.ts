import { momentsApi } from "@/api/moments.api";
import type { Producto } from "@/interfaces/producto"

export const getProductosAction = async():Promise<Producto[]> => {
    try {
        const {data} = await momentsApi.get('/productos');
        return data;
    } catch (error) {
        throw new Error('Error al consultar los productos');
    }
}