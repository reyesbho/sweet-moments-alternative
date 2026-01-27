import { ESTATUS_PEDIDO, type EstatusPedido } from "@/interfaces/pedidos-response";

export const normalizeEstatus = (
  value: string | null
): EstatusPedido | undefined => {
  if (!value || value === 'ALL') return undefined;

  return ESTATUS_PEDIDO.includes(value as EstatusPedido)
    ? (value as EstatusPedido)
    : undefined;
};