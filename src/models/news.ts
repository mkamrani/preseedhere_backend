import mongoose from 'mongoose';

// mongoose interface for news
interface INews {
    title: string;
    content: string;
    createdAt: Date;
    tags: string[];
}

const newsSchema = new mongoose.Schema<INews>({
    title: {
        type: String, 
        required: true
    },
    content: {  
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    tags: {
        type: [String],
    }
  });

const NewsModel = mongoose.model<INews>('News', newsSchema);
export {
    INews,
    NewsModel
};

