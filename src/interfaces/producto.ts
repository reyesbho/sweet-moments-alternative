export interface Producto {
    id:          string;
    name:        string;
    imagen:      null;
    sizes:       Size[];
    category:    string;
    descripcion: string;
    estatus:     boolean;
}
export type SizeTag = 'Chica' | 'Mediana' | 'Grande' | 'Familiar' | 'Mini' | 'Por defecto';

export interface Size{
    size: SizeTag,
    price:number
}

export interface Category{
    descripcion: string,
    id: string,
}