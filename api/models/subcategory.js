import mongoose, { Schema } from 'mongoose'

const subCategorySchema = new Schema(
    {
        id: { type: String },
        name: { type: String },
        category: { type: Schema.Types.ObjectId, ref: 'category' }
    },
    {
        timestamps: true
    }
);
subCategorySchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('subcategory', subCategorySchema);


