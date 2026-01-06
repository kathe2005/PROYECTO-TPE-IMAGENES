import sharp from 'sharp'; 
import { IImagenOperation} from './IImageOperation';

export class ResizeOperation implements IImagenOperation
{
    async execute(buffer: Buffer): Promise<Buffer> 
    {
        return await sharp(buffer).resize(500, 500).toBuffer(); 
    }
}