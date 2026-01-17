import { momentsApi } from "@/api/moments.api"
import type { EstatusPedido, PedidosResponse } from "@/interfaces/pedidos-response"

interface Options {
    estatus?: EstatusPedido,
    fechaInicio?: string,
    fechaFin?: string,
    cursorFechaCreacion?:string,
    pageSize?: number | string
}

export const getAllPedidosAction = async(options: Options):Promise<PedidosResponse> => {
    const {estatus, fechaInicio, fechaFin, cursorFechaCreacion, pageSize = 10} = options;
    try {
        const {data} = await momentsApi.get<PedidosResponse>('/pedidos',{
            params: {
                estatus,
                fechaInicio,
                fechaFin,
                cursorFechaCreacion,
                pageSize
            }
        });
        return data;
    } catch (error) {
        throw new Error('Eror al consultar los pedidos');
    }
}