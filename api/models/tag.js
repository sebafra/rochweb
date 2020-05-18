import mongoose, { Schema } from 'mongoose'

const tagSchema = new Schema(
    {
        id: { type: String },
        name: { type: String },
    },
    {
        timestamps: true
    }
);
tagSchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('tag', tagSchema);


