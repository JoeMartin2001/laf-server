import mongoose from "mongoose";

export type ItemType = {
  title: String;
  region: String;
  date: String;
  description: String[];
};

const ItemSchema = new mongoose.Schema<ItemType>({
  case: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Item = mongoose.model("Item", ItemSchema);
