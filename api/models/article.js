import mongoose, { Schema } from 'mongoose'

const articleSchema = new Schema(
    {
        id: { type: String },
        name: { type: String },
        description: { type: String },
        price: { type: String },
        tags: { type: String },
        subcategory: { type: Schema.Types.ObjectId, ref: 'subcategory' },
        category: { type: Schema.Types.ObjectId, ref: 'category' },
        user: { type: Schema.Types.ObjectId, ref: 'user' },
        images: [{ type: String }],
        enabled: { type: Boolean, default: false },
        featured: { type: Boolean, default: false },
        condition: { type: String } // 0: Nuevo , 1: Usado
    },
    {
        timestamps: true
    }
);
articleSchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('article', articleSchema);


