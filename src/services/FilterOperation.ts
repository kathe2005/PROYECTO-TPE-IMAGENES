import sharp from "sharp";
import { IImagenOperation } from "./IImageOperation";
import { abort } from "node:process";

export class FilterOperation implements IImagenOperation
{
    async execute(buffer: Buffer): Promise<Buffer> 
    {
        return await sharp(buffer).grayscale().toBuffer(); 
    }
}

