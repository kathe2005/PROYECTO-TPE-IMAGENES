/**
 *  INTERFAZ GENÉRICA ApiResponse
 *  Este es el estándar de comunicación
 */

export interface ApiResponse<T>
{
    success: boolean; 
    message: string; 
    data?: T; 
    timestamp: string; 
}

/**
 *  EJEMPLO DE USO 
 */

export type ImageApiResponse = ApiResponse<Buffer>; 