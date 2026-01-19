import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRef, useState } from "react";
import { CustomProductCard } from "./CustomProductCard";
import { useProductos } from "../hook/useProductos";
import type { Producto } from "@/interfaces/producto";
import { useCategories } from "../hook/useCategories";

interface Props {
    handleSelecProduct: (produc: Producto) => void
}

export const CustomProductSelector = ({ handleSelecProduct }: Props) => {
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
    const [searchTerm, setSearchTerm] = useState<string | undefined>();
    const { data: categories } = useCategories();
    const refInputSearch = useRef<HTMLInputElement>(null);
    const { data: productos } = useProductos({ category: selectedCategory, name: searchTerm });


    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar productos..."
                    ref={refInputSearch}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
                <Button
                    type="button"
                    variant={!selectedCategory ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(undefined)}
                    className="capitalize"
                >
                    Todos
                </Button>
                {categories && categories.map((category) => (
                    <Button
                        key={category.descripcion}
                        type="button"
                        variant={selectedCategory === category.descripcion ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.descripcion)}
                        className="capitalize"
                    >
                        {category.descripcion}
                    </Button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[420px] overflow-y-auto pr-1">
                {productos?.map((product) => {
                    return (
                        <CustomProductCard onSelect={handleSelecProduct} key={product.id} producto={product}></CustomProductCard>
                    );
                })}
            </div>
        </div>
    )
}
