import mongoose, { Schema } from 'mongoose'

const articleSchema = new Schema(
    {
        id: { type: String },
        name: { type: String },
        description: { type: String },
        price: { type: String },
        tags: { type: String },
        subcategory: { type: Schema.Types.ObjectId, ref: 'subCategory' },
        user: { type: Schema.Types.ObjectId, ref: 'user' },
        images: [{ type: String }],
        enabled: { type: Boolean, default: true },
        condition: { type: String },
        latitude: { type: String },
        longitude: { type: String }
    },
    {
        timestamps: true
    }
);
articleSchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('article', articleSchema);


