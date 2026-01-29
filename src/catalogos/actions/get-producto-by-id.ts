import { momentsApi } from "@/api/moments.api"
import type { Producto } from "@/interfaces/producto";

export const getProductoById = async(id: string): Promise<Producto> => {

    if(!id) throw new Error('El ID es requerido');

    if(id === 'new'){
        return {
            id: 'new',
            name: '',
            imagen: undefined,
            sizes: [],
            category: '',
            descripcion: '',
            estatus: true
        }
    }

    try {
        const { data } = await momentsApi.get(`/productos/${id}`);
        return {...data};
    } catch (error) {
        throw new Error('Error al consultar el producto')
    }
}