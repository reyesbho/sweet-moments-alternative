import { momentsApi } from "@/api/moments.api"
import type { Pedido } from "@/interfaces/pedidos-response"

export const createPedidoAction = async(pedido: Partial<Pedido>) => {

    const isCreating = pedido.id === 'new'; 
    
    try {
        console.log('REQUES PEDIDO: ', pedido)
        const response = await momentsApi({
            url: isCreating ? '/pedidos' : `/pedidos/${pedido.id}`,
            method: isCreating ? 'POST' : 'PATCH',
            data: pedido
        })
        return {...response.data}
    } catch (error) {
        throw new Error('Error al crear el producto')
    }
}