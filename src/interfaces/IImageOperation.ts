//Redimensionar imagen 
export interface ResizeParams
{
    width: number;
    height: number; 
}


//Recortar imagen 
export interface CropParams
{
    left: number; 
    top: number; 
    width: number; 
    height: number; 
}



//Convertir Formato
export type AllowedFormats = 'jpeg' | 'png' | 'webp' | 'avif' | 'tiff';  
export interface FormatParams
{
    format: AllowedFormats; 
}



//Rotar Imagen
export interface RotateParams
{
    angle: 90 | 180 | 270 ; 
}


//Aplicar filtro
export interface FilterParams
{
    filter: 'blur' | 'sharpen' | 'grayscale'; 
}

//Operaciones en los paramtros 
export type OperationParams = ResizeParams | {[key: string]: string | number | undefined}; 

//Definimos IImagenOperation
export interface IImagenOperation
{
    execute(buffer: Buffer, params: OperationParams): Promise<Buffer>; 
}