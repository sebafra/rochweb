import mongoose, { Schema } from 'mongoose'

const bannerSchema = new Schema(
    {
        id: { type: String },
        name: { type: String },
        image: { type: String },
        link: { type: String }
    },
    {
        timestamps: true
    }
);
bannerSchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('banner', bannerSchema);


