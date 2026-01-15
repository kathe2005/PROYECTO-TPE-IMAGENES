import { IImagenOperation} from "../interfaces/IImageOperation";
import { ResizeOperation } from "./ResizeOperation";
import { FilterOperation } from "./FilterOperation";
import { RotateOperation } from "./RotateOperation";
import { CropOperation } from "./CropOperation";
import { FormatOperation } from "./FormatOperation";
import { AppError } from "../types/AppError";

export class OperationFactory{

    //Mapa que combina un nombre con una clase de operacion 
    private operations: Map<string, IImagenOperation> = new Map(); 

    constructor(){

        //Las Operaciones a emplear a la imagen 
        this.operations.set('resize', new ResizeOperation()); 
        this.operations.set('filter', new FilterOperation());
        this.operations.set('rotate', new RotateOperation()); 
        this.operations.set('crop', new CropOperation()); 
        this.operations.set('format', new FormatOperation()); 
    }

    //Pide Operacion por el nombre 
    getOperation(type: string): IImagenOperation
    {
        const op = this.operations.get(type); 

        if(!op)
        {
            //Error si no se conoce la operacion
            throw new AppError(`Operacion desconocida: ${type}`, "OPERATION_NOT_FOUND", 400); 
        }

        return op; 
    }

}