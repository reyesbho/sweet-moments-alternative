export interface Producto {
    id:          string;
    name:        string;
    imagen:      null;
    sizes:       SizeTag[];
    category:         null;
    descripcion: string;
    estatus:     boolean;
    price:       number;
}
export type SizeTag = 'Chica' | 'Mediana' | 'Grande' | 'Familiar' | 'Mini' | 'Default'