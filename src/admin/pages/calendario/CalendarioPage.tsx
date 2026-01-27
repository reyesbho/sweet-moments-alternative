import { useState, useMemo, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';

import { format, isSameDay } from 'date-fns';
import { es, se } from 'date-fns/locale';
import { Clock, MapPin } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import CustomJumbotron from '@/admin/components/CustomJumbotron';
import { usePedidos } from '@/admin/hook/usePedidos';
import { CustomStatusBadge } from '@/admin/components/CustomStatusBadge';
import { formatDateFromTimestamp, formatDateStringFromTimestamp, getEndDateOfMont, getInitialDateOfMonth } from '@/lib/format-date';

export default function OrderCalendar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const {fechasPedidos, pedidos} = usePedidos();
  const fechaInicio  = searchParams.get('fechaInicio') ?? undefined;
  const fechaFin  = searchParams.get('fechaFin') ?? undefined;

  useEffect(() => {
    if(fechaInicio === undefined && fechaFin == undefined){
        searchParams.set('fechaInicio', getInitialDateOfMonth(new Date()));
        searchParams.set('fechaFin', getEndDateOfMont(new Date()));
        setSearchParams(searchParams)
    }
  }, [])

  const handleChangeMont = (date: Date) => {
    searchParams.set('fechaInicio', getInitialDateOfMonth(date));
        searchParams.set('fechaFin', getEndDateOfMont(date));
        setSearchParams(searchParams)
  }

  const ordersOnSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return pedidos.filter(order => 
      isSameDay(formatDateFromTimestamp(order.fechaEntrega), selectedDate)
    );
  }, [selectedDate]);


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <CustomJumbotron title='Calendario' subtitle='Pedidos programados'></CustomJumbotron>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        {/* Calendar */}
        <div className="lg:col-span-1 shadow-md">
          <div className="card-elevated p-4">
            <Calendar
              mode="single"
              onNextClick={handleChangeMont}
              onPrevClick={handleChangeMont}
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={es}
              className="pointer-events-auto"
              modifiers={{
                hasOrders: fechasPedidos,
              }}
              modifiersStyles={{
                hasOrders: {
                  fontWeight: 'bold',
                  backgroundColor: 'hsl(var(--status-backlog-bg))',
                  color: 'hsl(var(--primary))',
                },
              }}
            />
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-status-backlog" />
                <span>Días con entregas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Orders for Selected Date */}
        <div className="lg:col-span-2 shadow-md">
          <div className="card-elevated p-6">
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">
              {selectedDate 
                ? format(selectedDate, "EEEE d 'de' MMMM", { locale: es })
                : 'Selecciona una fecha'
              }
            </h2>

            {ordersOnSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {ordersOnSelectedDate.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => navigate(`/pedidos/${order.id}`)}
                    className="p-4 bg-muted/50 rounded-xl hover:bg-muted cursor-pointer transition-colors shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-sm text-primary font-medium">
                            {order.id}
                          </span>
                          <CustomStatusBadge status={order.estatus} />
                        </div>
                        <h3 className="font-semibold text-foreground">
                          {order.cliente}
                        </h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatDateStringFromTimestamp(order.fechaEntrega)}
                          </div>
                          {order.lugarEntrega && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {order.lugarEntrega}
                            </div>
                          )}
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-muted-foreground">
                            {order.productos.length} producto{order.productos.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-display font-bold text-primary">
                          {formatCurrency(order.total)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No hay entregas programadas para este día
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
