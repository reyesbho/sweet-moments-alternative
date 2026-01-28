import CustomJumbotron from "@/admin/components/CustomJumbotron"
import { useProductos } from "@/admin/hook/useProductos"
import { ProductoCard } from "@/catalogos/components/ProductoCard"

const ProductosCatalogoPage = () => {
  const {data} = useProductos({})
  return (
    <>
    <CustomJumbotron title="Productos" subtitle="Catalogo de productos"></CustomJumbotron>
    {/* Products Grid */}
      {data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((product, index) => (
            <div key={product.id} style={{ animationDelay: `${index * 50}ms` }}>
              <ProductoCard producto={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="card-elevated p-12 text-center">
          <p className="text-muted-foreground">No se encontraron productos</p>
        </div>
      )}
    </>
  )
}

export default ProductosCatalogoPage
