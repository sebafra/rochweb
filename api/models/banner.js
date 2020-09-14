import mongoose, { Schema } from 'mongoose'

const bannerSchema = new Schema(
    {
        title: { type: String },
        subtitle: { type: String },
        image: { type: String },
        link: { type: String },
        order: { type: Number }
    },
    {
        timestamps: true
    }
);
bannerSchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('banner', bannerSchema);


