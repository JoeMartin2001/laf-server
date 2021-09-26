import Joi, { date, number, string } from 'joi';
import mongoose from 'mongoose';

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
  imgUrl: {
    type: String,
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
    ref: 'User',
    required: true,
  },
});

export const validateItem = (body: any) => {
  const joiSchema = Joi.object({
    case: string().min(3).required(),
    imgUrl: string().min(3),
    title: string().min(3).required(),
    phone: number().min(3).required(),
    region: string().min(3).required(),
    date: date(),
    description: string().min(3).required(),
    user: string().min(3).required(),
    file: string().min(3).required(),
    fileName: string().min(3).required(),
  });

  return joiSchema.validate(body);
};

export const Item = mongoose.model('Item', ItemSchema);
