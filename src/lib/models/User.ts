import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
    {
        provider: String,
        providerAccountId: String,
        name: { type: String, required: true },
        email: { type: String, required: true },
        image: String,
        password: String,
        role: {
            type : String,
            enum: ["user", "moderator", "admin"],
            default: "user"
        }
    },
    { timestamps: true }
);

export default models.User || model("User", UserSchema);

    