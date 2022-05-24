import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        isWorker: { type: Boolean, default: false, required: true },
        canManageProducts: { type: Boolean, default: false, required: false },
        canManageOrders: { type: Boolean, default: false, required: false },
        canManageCategories: { type: Boolean, default: false, required: false },
        canManageFormReleases: { type: Boolean, default: false, required: false },
        canManageProviders: { type: Boolean, default: false, required: false },
        canManageSupport: { type: Boolean, default: false, required: false },

    },
    {
        collection: 'users',
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
export default User;