import { Calendar } from '@/components/ui/calendar';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import CustomJumbotron from '@/admin/components/CustomJumbotron';
import { CustomPedidoCard } from '@/admin/components/CustomPedidoCard';
import { useCalendar } from '@/admin/hook/useCalendar';

export default function OrderCalendar() {
  const {handleChangeMonth,  selectedDate, setSelectedDate, fechasPedidos, ordersOnSelectedDate} = useCalendar();


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
              onNextClick={handleChangeMonth}
              onPrevClick={handleChangeMonth}
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
                  <CustomPedidoCard key={order.id} pedido={order}></CustomPedidoCard>
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
