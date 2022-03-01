import mongoose from 'mongoose';

// mongoose interface for news
interface INews {
    id?: string;
    thumbnail?: string;
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
    
    thumbnail: {
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
  }, { toJSON: { virtuals: true } });

newsSchema.virtual("id").get(function(this: mongoose.Document) {
    return this._id;
});

const NewsModel = mongoose.model<INews>('News', newsSchema);
export {
    INews,
    NewsModel
};

