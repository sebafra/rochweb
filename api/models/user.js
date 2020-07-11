import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
    {
        id: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        user: { type: String, unique: true },
        password: { type: String },
        celular: { type: String },
        latitude: { type: String },
        longitude: { type: String },
        location: {
            type: {
                type: String,
                enum: ['Point'], // 'location.type' must be 'Point'
            },
            coordinates: {
                type: [Number], //coordinates: [-104.9903, 39.7392] longitude first and then latitude
            }
        },
        role: { type: Number, default: 1 } // 1: user , 0: admin
    },
    {
        timestamps: true
    }
);
userSchema.plugin(require('meanie-mongoose-to-json'));

export default mongoose.model('user', userSchema);


