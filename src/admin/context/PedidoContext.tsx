import type { Pedido, ProductoPedido } from "@/interfaces/pedidos-response";
import type { Producto } from "@/interfaces/producto";
import { createContext, useState, type PropsWithChildren } from "react";
import { useProductos } from "../hook/useProductos";

interface PedidoContextInterface {
    selectedProductos: ProductoPedido[],
    productos: Producto[],

    handleAddSelectedProducto: (producto: ProductoPedido) => void,
    handleRemoveSeletedProducto: (producto: ProductoPedido) => void,
}

export const PedidoContext = createContext<PedidoContextInterface>({} as PedidoContextInterface);

export const PedidoProvider = ({ children }: PropsWithChildren) => {
    const { data } = useProductos();
    const [selectedProductos, setSeletedProductos] = useState<ProductoPedido[]>([]);

    const handleAddProducto = (product: ProductoPedido) => {
        setSeletedProductos(prev => [...prev, product]);
    }

    const handleRemoveProducto = (product: ProductoPedido) => {
        setSeletedProductos(prev => prev.filter(p => p.id !== product.id))
    }

    return (<PedidoContext
        value={{
            productos: data || [],
            selectedProductos,

            handleAddSelectedProducto: handleAddProducto,
            handleRemoveSeletedProducto: handleRemoveProducto
        }}
    >
        {children}
    </PedidoContext>)
}
