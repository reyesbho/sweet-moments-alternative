export interface Producto {
    id:          string;
    name:        string;
    imagen:      string | undefined;
    sizes:       Size[];
    category:    string;
    descripcion: string;
    estatus:     boolean;
}
export type SizeTag = 'Chica' | 'Mediana' | 'Grande' | 'Familiar' | 'Mini' | 'Por defecto';

export const Sizes: SizeTag[] = ['Por defecto', 'Chica', 'Mediana', 'Grande', 'Familiar', 'Mini' ];

export interface Size{
    size: SizeTag,
    price: number
}

export interface Category{
    descripcion: string,
    id: string,
}