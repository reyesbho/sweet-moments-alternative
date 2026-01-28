import { getInitialDateOfMonth, getEndDateOfMont, formatDateFromTimestamp } from "@/lib/format-date";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router";
import { usePedidos } from "./usePedidos";

export const useCalendar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    const { pedidos, fechasPedidos } = usePedidos();

    const fechaInicio = searchParams.get('fechaInicio') ?? undefined;
    const fechaFin = searchParams.get('fechaFin') ?? undefined;

    useEffect(() => {
        if (fechaInicio === undefined && fechaFin == undefined) {
            setSearchParams({
                fechaInicio: getInitialDateOfMonth(new Date()),
                fechaFin: getEndDateOfMont(new Date()),
            })
        }
    }, [fechaInicio, fechaFin, setSearchParams])

    /** Agrupar pedidos por día */
    const pedidosPorFecha = useMemo(() => {
        return pedidos.reduce<Record<string, typeof pedidos>>((acc, pedido) => {
            const key = formatDateFromTimestamp(pedido.fechaEntrega).toDateString();
            acc[key] = acc[key] ?? [];
            acc[key].push(pedido);
            return acc;
        }, {});
    }, [pedidos]);

    const handleChangeMonth = useCallback((date: Date) => {
        setSearchParams({
            fechaInicio: getInitialDateOfMonth(new Date()),
            fechaFin: getEndDateOfMont(new Date()),
        })
    }, [setSearchParams])

    /** Pedidos del día seleccionado */
    const ordersOnSelectedDate = useMemo(() => {
        if (!selectedDate) return [];
        return pedidosPorFecha[selectedDate.toDateString()] ?? [];
    }, [selectedDate, pedidosPorFecha]);
    return {handleChangeMonth, selectedDate, setSelectedDate, fechasPedidos, ordersOnSelectedDate}
}
