import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
    {
        id: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        user: { type: String },
        password: { type: String },
        celular: { type: String },
        latitude: { type: String },
        longitude: { type: String },
        role: { type: Number, default: 1 } // 1: user , 0: admin
    },
    {
        timestamps: true
    }
);
userSchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('user', userSchema);


