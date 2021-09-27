import Joi, { number, string } from 'joi';
import { model, Schema } from 'mongoose';

export type UserType = {
  email: string;
  fullName: string;
  username: string;
  password: string;
};

const UserSchema = new Schema<UserType>({
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

export const validateUser = (body: any) => {
  const joiSchema = Joi.object({
    email: string().min(3).required().email(),
    fullName: string().min(3).required(),
    username: string().min(3).required(),
    password: string().min(3).required(),
  });

  return joiSchema.validate(body);
};

export const validateAuth = (body: any) => {
  const joiSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(4).required(),
  });

  return joiSchema.validate(body);
};

export const User = model('User', UserSchema);
