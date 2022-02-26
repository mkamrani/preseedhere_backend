import { Request, Response } from 'express';
import { INews } from '../../models/news';
import {IsArray, IsDate, IsNotEmpty, IsString, Length} from  'class-validator';
import { ClassConstructor, plainToClass } from "class-transformer";
import { validateDto } from '../validator';
import { createNews, updateNews } from '../../models/news.service';


class CreateUpdateNewsDTO implements INews {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    content: string;
    createdAt: Date;
    @IsArray()
    tags: string[];
    // implement constructor
    constructor(title: string, content: string, createdAt: Date, tags: string[]) {
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.tags = tags;
        this.createdAt = new Date();
    }
}


// handler
async function createUpdateNews(req: Request<{id: String}, {}, INews>, res: Response): Promise<void> {
    // implement get the news from the request body and save it using createNews
    try {
        const news = req.body;
        await validateDto(CreateUpdateNewsDTO, news);
        if (req.method === "PUT") {
            const id = req.params.id;
            const updatedNews = await updateNews(id, news);
            res.send(updatedNews);
        } else {
            // save the news in database
            const id = await createNews(news);
            res.send({id});
        }
    } catch (error: any) {
        res.status(400).send({message: error.message});
    }


}




export default createUpdateNews;



