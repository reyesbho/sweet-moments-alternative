import CustomJumbotron from "@/admin/components/CustomJumbotron"
import { CustomStatsCard } from "@/admin/components/CustomStatCard";
import { PedidosTable } from "@/admin/components/PedidosTable";
import { usePedidos } from "@/admin/hook/usePedidos";
import { useResumePedidos } from "@/admin/hook/useResume";
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/format-currency";
import { Calendar, CheckCircle2, ClipboardList, TrendingDown, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router"

const HomePage = () => {
  const navigate = useNavigate();
  const {data} = useResumePedidos();
  const {data: pedidos} = usePedidos();
  return (
    <>
      <CustomJumbotron
        title="Dashboard"
        subtitle="Resumen de pedidos"
        showButtonNew={true}
      ></CustomJumbotron>
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <CustomStatsCard
          title="Ingresos del Mes"
          value={formatCurrency(data?.totalDelMes || 0)}
          icon={<TrendingUp className="w-5 h-5" />}
          iconClassName="bg-status-done text-done"
        />
        <CustomStatsCard
          title="Total de pedidos cancelados"
          value={formatCurrency(data?.totalCancelado || 0)}
          icon={<TrendingDown className="w-5 h-5" />}
          iconClassName="bg-status-cancelled text-cancelled "
        />
        <CustomStatsCard
          title="Total de pedidos por hacer"
          value={formatCurrency(data?.totalPorHacer || 0)}
          icon={<TrendingUp className="w-5 h-5" />}
          iconClassName="bg-status-pending text-pending"
        />
        <CustomStatsCard
          title="Total de pedidos realizados"
          value={formatCurrency(data?.totalEcho || 0)}
          icon={<TrendingUp className="w-5 h-5" />}
          iconClassName="bg-status-done text-done "
        />
        <CustomStatsCard
          title="Pedidos Totales"
          value={data?.pedidosTotales || 0}
          icon={<ClipboardList className="w-5 h-5" />}
          iconClassName="bg-status-done text-done"
        />
        <CustomStatsCard
          title="Por Hacer"
          value={data?.porHacer || 0}
          icon={<Calendar className="w-5 h-5" />}
          iconClassName="bg-status-pending text-pending"
        />
        <CustomStatsCard
          title="Entregados"
          value={data?.entregados || 0}
          icon={<CheckCircle2 className="w-5 h-5" />}
          iconClassName="bg-status-done text-done"
        />
      </div>
      <div>
        <div className="flex my-4 items-center justify-between mb-4">
          <h2 className="text-xl font-display font-semibold text-foreground">
            Pedidos Recientes
          </h2>
          <Button
            variant="ghost"
            onClick={() => navigate('/pedidos')}
            className="text-primary hover:text-primary/80"
          >
            Ver todos →
          </Button>
        </div>
        <PedidosTable pedidos={pedidos?.pedidos || []}></PedidosTable>
      </div>
    </>
  )
}

export default HomePage
