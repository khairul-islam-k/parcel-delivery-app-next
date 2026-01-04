import { Schema, model, models } from "mongoose";

const ParcelSchema = new Schema(
  {
    from: { type: String, required: true },
    destination: { type: String, required: true },
    category: { type: String, required: true },
    weight: { type: Number, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

// Hot reload error এড়াতে models check
export default models.Parcel || model("Parcel", ParcelSchema);
