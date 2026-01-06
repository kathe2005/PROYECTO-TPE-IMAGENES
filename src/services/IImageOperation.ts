export interface IImagenOperation
{
    execute(buffer: Buffer): Promise<Buffer>; 
}