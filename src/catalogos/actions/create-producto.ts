import { momentsApi } from "@/api/moments.api";
import type { Producto } from "@/interfaces/producto"


export const createProductoAction = async (productoLike: Partial<Producto>) => {
    console.log("createProductoAction: ",productoLike)
    const isCreating = productoLike.id === 'new';
    try {
        const { data } = await momentsApi({
            url: (isCreating ? '/productos' : `/productos/${productoLike.id}`),
            method: (isCreating ? 'POST' : 'PATCH'),
            data: productoLike
        })
        return { ...data };
    } catch (error) {
        throw new Error('Error al crear el producto')
    }
}