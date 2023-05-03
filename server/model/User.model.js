import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        unique: false
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    firstName: {type: String , require: true,},
    lastName: {type: String, require: true,},
    tel: {type: String, require: true,},
    role: {type: String},
    coupons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'coupons' }]
})

export default mongoose.model.users || mongoose.model('users', UserSchema)