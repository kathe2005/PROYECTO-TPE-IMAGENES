// Importaciones de dependencias
import { OperationFactory } from "./OperationFactory";
import { IImagenOperation } from "../interfaces/IImageOperation";

//Clase de servicio
export class ImagenService
{
    
    // Creamos la fábrica de forma privada
    private factory = new OperationFactory();
    
    // Método para la obtención de operaciones
    public getOperation(type: string): IImagenOperation 
    {
        return this.factory.getOperation(type); 
    }
}