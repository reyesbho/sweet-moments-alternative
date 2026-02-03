import { momentsApi } from "@/api/moments.api";
import type { FileUploadResponse } from "@/interfaces/file-response";
import type { Producto } from "@/interfaces/producto"


export const createProductoAction = async (productoLike: Partial<Producto> & {file?:File}) => {

    let {id,imagen, file, ...rest} = productoLike;
    if(file){
        const newImage = await uploadFile(file);
        imagen = newImage.file.url;
    }

    const isCreating = id === 'new';
    try {
        const { data } = await momentsApi({
            url: (isCreating ? '/productos' : `/productos/${id}`),
            method: (isCreating ? 'POST' : 'PATCH'),
            data: {...rest, imagen}
        })
        return { ...data };
    } catch (error) {
        throw new Error('Error al crear el producto')
    }
}

const uploadFile = async(file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const {data} = await momentsApi<FileUploadResponse>({
        url: '/files',
        method: 'POST',
        data: formData
    });
    return {...data};
}