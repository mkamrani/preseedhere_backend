import mongoose from "mongoose";

// mongoose interface for news
interface IProduct {
  isBeta: boolean;
  id?: string;
  title: string;
  thumbnail?: string;
  content: string;
  createdAt: Date;
  tags: string[];
}

const newsSchema = new mongoose.Schema<IProduct>(
  {
    isBeta: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: { currentTime: () => Date.now() }, toJSON: { virtuals: true } }
);

newsSchema.virtual("id").get(function (this: mongoose.Document) {
  return this._id;
});

const ProductModel = mongoose.model<IProduct>("Products", newsSchema);
export { IProduct, ProductModel };
