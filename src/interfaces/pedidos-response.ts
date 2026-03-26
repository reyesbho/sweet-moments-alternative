import type { Producto, Size } from "./producto";
import { Timestamp } from 'firebase/firestore';

export interface PedidosResponse {
    pedidos: Pedido[],
    nextCursor: string,
    hasMore: boolean,
    totalDocs: number,
    totalPages: number,
    pageSize: number
}

export interface Abono {
    monto: number;
    fecha: Timestamp;
}

export interface Pedido {
    id:            string;
    estatusPago:   EstatusPago;
    tipoPago?:     TipoPago;
    cliente:       string;
    estatus:       EstatusPedido;
    fechaEntrega:  Timestamp;
    total:         number;
    registradoPor: string;
    fechaCreacion: Timestamp;
    lugarEntrega:  string;
    productos:     ProductoPedido[];
    detalles:      string;
    abonos?:       Abono[];
}



export interface ProductoPedido {
    caracteristicas: string;
    producto:        Producto;
    subtotal:          number;
    cantidad:        number;
    size:            Size;
    id:              string;
}


export type EstatusPedido = 'BACKLOG' | 'DONE' | 'TODO' | 'CANCELED' | 'DELETE';
export type EstatusPago = 'PENDIENTE' | 'PAGADO' | 'ABONADO';
export type TipoPago = 'EFECTIVO' | 'TRANSFERENCIA';

export const ESTATUS_PEDIDO = [
  'BACKLOG',
  'DONE',
  'TODO',
  'CANCELED',
  'DELETE',
] as const;