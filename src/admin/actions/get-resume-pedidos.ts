import { momentsApi } from "@/api/moments.api"
import type { ResumePedidos } from "@/interfaces/resume.interface"

interface Options{
    fechaInicial?:string,
    fechaFinal?:string
}
export const getResumePedidosAction = async ({fechaInicial, fechaFinal}:Options): Promise<ResumePedidos> => {
    try {
        const { data } = await momentsApi.get('/pedidos/resume',{
            params:{
                fechaFinal,
                fechaInicial
            }
        });
        return data;
    } catch (error) {
        throw new Error('Error al consultar resumen')
    }
}