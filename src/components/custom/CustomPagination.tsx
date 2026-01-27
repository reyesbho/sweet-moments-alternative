import { RotateCcw } from "lucide-react"
import { Button } from "../ui/button"

interface Props {
    fetchNextPage: () => void,
    hasNextPage: boolean,
    totalItems: number,
    totalLoaded: number

}
export const CustomPagination = ({ fetchNextPage, hasNextPage, totalItems = 0, totalLoaded = 0 }: Props) => {

    return (

        <div className="my-4 flex flex-col items-center justify-center space-x-2">
            <span>{`Mostrando ${totalLoaded} de ${totalItems} pedidos`}</span>
            <Button variant="outline" size="sm"
                disabled={!hasNextPage}
                onClick={fetchNextPage}
            >
                Cargar más
                <RotateCcw  className="h-4 w-4" />
            </Button>
        </div>
    )
}
