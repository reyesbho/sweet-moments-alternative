import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"

interface Props {
    title: string,
    subtitle: string,
    showButtonNew?: boolean
}
const CustomJumbotron = ({ title, subtitle, showButtonNew = false }: Props) => {
    const navigate = useNavigate();

    return (
        <div className="flex my-5 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-3xl font-display font-bold text-foreground">{title}</h1>
                <p className="text-muted-foreground mt-1">{subtitle}</p>
            </div>
            {showButtonNew &&
                <Button
                    onClick={() => navigate('/pedidos/new')}
                    className="gradient-primary text-primary-foreground hover:opacity-90 shadow-md"
                >
                    + Nuevo Pedido
                </Button>
            }
        </div>
    )
}

export default CustomJumbotron
