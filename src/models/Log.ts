//Importacion de interfaces (dependencias)
import { Schema, model } from "mongoose";

// Definición de la Estructura 
const logSchema = new Schema({
    timestamp: {type: String, required: true},
    level: { type:String , enum: [ 'info', 'error'], required: true},
    user: {type: String, required: true},
    params: {type: Schema.Types.Mixed}, 
    duration: {type: Number, required: true},
    result: {type: String, required: true},
    message: {type: String}
}); 

//Uso
export const LogModel = model ('Log', logSchema); 