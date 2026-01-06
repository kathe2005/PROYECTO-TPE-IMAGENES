import { IImagenOperation } from "./IImageOperation";
import { ResizeOperation } from "./ResizeOperation";
import { FilterOperation } from "./FilterOperation";

export class OperationFactory 
{
    static getOperation(type: string): IImagenOperation 
    {
        const operationMap: { [key: string]: IImagenOperation } = {
            'resize': new ResizeOperation(), 
            'filter': new FilterOperation()
        }; 

        const operation = operationMap [ type.toLowerCase() ]; 

        if ( !operation )
        {
            throw new Error (`🚫 Operación '${type}' no reconocida por el Cuartel WISE.`); 
        }

        return operation; 
    }


}