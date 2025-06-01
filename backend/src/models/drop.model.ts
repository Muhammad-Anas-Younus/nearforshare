import mongoose from "mongoose";

const dropSchema = new mongoose.Schema({
  textContent: { type: String },
  files: { type: String },
  location: {
    type: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true },
    },
  },
  expiresAt: { type: Date, default: () => Date.now() + 1000 * 60 * 60 },
});

dropSchema.index({ location: "2dsphere" });

const dropModel = mongoose.model("drop", dropSchema);

export default dropModel;
