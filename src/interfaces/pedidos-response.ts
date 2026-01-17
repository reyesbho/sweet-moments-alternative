import type { Producto } from "./producto";

export interface PedidosResponse {
    pedidos: Pedido[],
    nextCursor: string,
    hasMore: boolean,
    totalDocs: number,
    totalPages: number,
    pageSize: number
}

export interface Pedido {
    id:            string;
    estatusPago:   EstatusPago;
    cliente:       string;
    estatus:       EstatusPedido;
    fechaEntrega:  Fecha;
    total:         number;
    registradoPor: string;
    fechaCreacion: Fecha;
    lugarEntrega:  string;
    productos:     ProductoPedido[];
}

export interface Fecha {
    seconds:     number;
    nanoseconds: number;
}

export interface ProductoPedido {
    caracteristicas: string[];
    producto:        Producto;
    precio:          number;
    cantidad:        number;
    size:            string;
    id:              string;
}


export type EstatusPedido = 'BACKLOG' | 'DONE' | 'TODO' | 'CANCELED' | 'DELETE';
export type EstatusPago = 'PENDIENTE' | 'PAGADO' | 'ABONADO';
