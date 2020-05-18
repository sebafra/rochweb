import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
    {
        id: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        username: { type: String },
        password: { type: String },
        celular: { type: String },
        latitude: { type: String },
        longitude: { type: String }
    },
    {
        timestamps: true
    }
);
userSchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('user', userSchema);


