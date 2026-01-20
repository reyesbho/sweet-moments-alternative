import { momentsApi } from "@/api/moments.api";
import type { Pedido } from "@/interfaces/pedidos-response";

export const getPedidoByIdAction = async (id: string): Promise<Pedido> => {

    if (!id) throw new Error('el ID es requerido');
    if (id === 'new') {
        return {
            id: 'new',
            cliente: '',
            productos: [],
            detalles: '',
            total: 0,
            lugarEntrega: ''
        } as unknown as Pedido;
    }

    const { data } = await momentsApi.get(`/pedidos/${id}`);
    return { ...data };
}