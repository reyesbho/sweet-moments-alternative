import type { Pedido, ProductoPedido } from "@/interfaces/pedidos-response"

type TaskState = {
    productos: ProductoPedido[],
    totalProductos: number,
    total: number
}

type ActionType = {
    ADD_PRODUCTO: 'ADD_PRODUCTO',
    REMOVE_PRODUCTO: 'REMOVE_PRODUCTO',
    INCREASE_QUANTITY: 'INCREASE_QUANTITY',
    UPDATE_PRODUCTO: 'UPDATE_PRODUCTO',
    DECREASE_QUANTITY: 'DECREASE_QUEANTITY'
};

type TaskAction =
    | { type: ActionType['ADD_PRODUCTO'], payload: ProductoPedido }
    | { type: ActionType['REMOVE_PRODUCTO'], payload: string }
    | { type: ActionType['INCREASE_QUANTITY'], payload: string }
    | { type: ActionType['DECREASE_QUANTITY'], payload: string }
    | { type: ActionType['UPDATE_PRODUCTO'], payload: ProductoPedido }

export const getTasksProductoPedidoInitialState = (pedido: Pedido):TaskState => {
    if(!pedido)
    {
        return{
            productos: [],
            total: 0,
            totalProductos: 0
        }
    } else{
        return{
            productos: pedido.productos,
            total: pedido.total,
            totalProductos: pedido.productos.length
        }
    }
        
}

export const tasksProductosPedidosReducer = (state: TaskState, action: TaskAction): TaskState => {

    switch (action.type) {
        case 'ADD_PRODUCTO': {
            const productos = [...state.productos, action.payload];
            return {
                ...state,
                productos: productos,
                totalProductos: productos.reduce((sum, p) => sum + p.cantidad, 0),
                total: productos.reduce((sum, p) => sum + (p.size.price * p.cantidad), 0)
            };
        }
        case 'INCREASE_QUANTITY': {
            console.log()
            const productos = state.productos.
                map(p => (p.id === action.payload ? { ...p, cantidad: p.cantidad + 1, subtotal: (p.size.price || 0) * (p.cantidad + 1) } : p));
            return {
                ...state, productos: productos,
                totalProductos: productos.reduce((sum, p) => sum + p.cantidad, 0),
                total: productos.reduce((sum, p) => sum + (p.size.price * p.cantidad), 0)
            };
        }
        case 'REMOVE_PRODUCTO': {
            const productos = state.productos.filter(p => p.id !== action.payload);
            return {
                ...state,
                productos: productos,
                totalProductos: productos.reduce((sum, p) => sum + p.cantidad, 0),
                total: productos.reduce((sum, p) => sum + (p.size.price * p.cantidad), 0)
            };
        }
        case 'UPDATE_PRODUCTO': {
            const productos = state.productos.map(p => (p.id === action.payload.id ? action.payload : p));
            return {
                ...state,
                productos: productos,
                totalProductos: productos.reduce((sum, p) => sum + p.cantidad, 0),
                total: productos.reduce((sum, p) => sum + (p.size.price * p.cantidad), 0)
            };

        }
        case 'DECREASE_QUEANTITY': {
            const productos = state.productos.
                map(p => (p.id === action.payload && p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1,subtotal: (p.size.price || 0) * (p.cantidad - 1) } : p));
            return {
                ...state, 
                productos: productos,
                totalProductos: productos.reduce((sum, p) => sum + p.cantidad, 0),
                total: productos.reduce((sum, p) => sum + (p.size.price * p.cantidad), 0)
            };

        }
        default:
            return state;
    }
}