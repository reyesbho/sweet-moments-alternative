import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { useRef, type KeyboardEvent } from "react"
import { useSearchParams } from "react-router"

export const CustomFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const cliente = searchParams.get('cliente') ?? undefined;
    const estatus = searchParams.get('estatus') ?? 'ALL';
    const inputCliente = useRef<HTMLInputElement>(null);
    
    const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key !== 'Enter') return;
        searchParams.set('cliente', inputCliente.current?.value || '');
        setSearchParams(searchParams);
    }

    const handleEstatusChange = (value:string) => {
        searchParams.set('estatus', value);
        setSearchParams(searchParams)
    }

  return (
    <>
    {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 py-5">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            ref = {inputCliente}
            placeholder="Buscar por cliente"
            defaultValue={cliente}
           onKeyDown={handleSearch}
            className="pl-10"
          />
        </div>
        <Select 
        value={estatus} onValueChange={handleEstatusChange}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="TODO">Por Hacer</SelectItem>
            <SelectItem value="DONE">Entregado</SelectItem>
            <SelectItem value="CANCELED">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}
