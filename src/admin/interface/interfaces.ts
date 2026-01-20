import type { Pedido } from "@/interfaces/pedidos-response";

export interface InputsFormPedido extends Pedido {
    selectedHour: string
}