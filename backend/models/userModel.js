import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true  
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    cartData: { 
        type: Object, 
        default: {} 
    },
}, {
    minimize: false, 
    timestamps: true, 
});

userSchema.index({ email: 1 });
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;

