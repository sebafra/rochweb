import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema(
    {
        id: { type: String },
        name: { type: String },
        featured: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);
categorySchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('category', categorySchema);


