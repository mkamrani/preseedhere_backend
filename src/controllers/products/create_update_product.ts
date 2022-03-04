import { Request, Response } from 'express';
import { IProduct } from '../../models/products';
import {IsArray, IsBoolean, IsDate, IsNotEmpty, IsString} from  'class-validator';
import { validateDto } from '../validator';
import { createProduct, updateProduct } from '../../models/products.service';

class CreateUpdateProductDTO implements IProduct {
    @IsBoolean()
    isBeta: boolean;
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    thumbnail: string;
    @IsString()
    @IsNotEmpty()
    content: string;
    createdAt: Date;
    @IsArray()
    tags: string[];
    // implement constructor
    constructor(isBeta: boolean, title: string, thumbnail: string, content: string, createdAt: Date, tags: string[]) {
        this.isBeta = isBeta;
        this.title = title;
        this.thumbnail = thumbnail;
        this.content = content;
        this.createdAt = createdAt;
        this.tags = tags;
        this.createdAt = new Date();
    }
}


// handler
async function createUpdateProducts(req: Request<{id: String}, {}, IProduct>, res: Response): Promise<void> {
    try {
        const product = req.body;
        await validateDto(CreateUpdateProductDTO, product);
        if (req.method === "PUT") {
            const id = req.params.id;
            const updatedProducts = await updateProduct(id, product);
            res.send(updatedProducts);
        } else {
            // save the product in database
            const id = await createProduct(product);
            res.send({id});
        }
    } catch (error: any) {
        res.status(400).send({message: error.message});
    }
}

export default createUpdateProducts;
