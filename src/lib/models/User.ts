import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
    {
        fullName: {type: String, required: true},
        email: {type: String, required: true},
        photoUrl: String,
        password: {type: String, required: true}
    },
    {timestamps: true}
);

export default models.User || model("User", UserSchema);