import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search} from "lucide-react";
import { useState } from "react";
import { CustomProductCard } from "./CustomProductCard";
import { useProductos } from "../hook/useProductos";
import type { Producto } from "@/interfaces/producto";


export const CustomProductSelector = () => {
    const categories: string[] = [];
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const {data} = useProductos();
    const [filteredProducts, setFilteredProducts] = useState<Producto[]>();
    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar productos..."
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <Button
                        key={category}
                        type="button"
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="capitalize"
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[420px] overflow-y-auto pr-1">
                {data?.map((product) => {
                    // const selected = isSelected(product.id);
                    return (
                        <CustomProductCard key={product.id} producto={product} selected></CustomProductCard>
                    );
                })}
            </div>

            {filteredProducts?.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    <p>No se encontraron productos</p>
                    <p className="text-sm mt-1">Intenta con otra búsqueda o categoría</p>
                </div>
            )}
        </div>
    )
}
