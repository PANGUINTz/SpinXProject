import mongoose from "mongoose";

export const CouponSchema = new mongoose.Schema({
    coupon_name: {
        type: String,
        require: [true, "Coupon Name is required"],
        unique: [true, "Coupon Name Exist"]
    },

    description: {type: String,},
    discount: {
        type: Number,
        require: true,
        unique: false
    },
    coupon_img: {type: String},
    usedBy: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    created_at: { type: Date, default: Date.now },
})

export default mongoose.model.coupon || mongoose.model('coupons', CouponSchema)