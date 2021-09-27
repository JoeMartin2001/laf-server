import { NextFunction, Request, Response } from 'express';
import { User, validateUser, validateAuth, UserType } from '../models/User';
import jwt from 'jsonwebtoken';
import config from 'config';
import _ from 'lodash';
import { uploadImage } from '../common/helpers';

export const registerUser = async (req: Request, res: Response) => {
  const candidate = await User.findOne({ username: req.body.username });

  if (candidate) {
    return res.status(409).json({
      msg: 'User with given username already exists! Please choose another one!',
    });
  }

  const { error } = validateUser(req.body);

  if (error) res.status(409).send({ msg: error.details[0].message });

  const user = new User(req.body);

  const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

  try {
    await user.save();
    res.status(201).json({
      msg: 'User has successfully been registered!',
      token,
      id: user._id,
    });
  } catch (error) {}
};

export const login = async (req: Request, res: Response) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(409).send({ msg: error.details[0].message });

  const { username, password } = req.body;
  const candidate = await User.findOne({ username });

  if (!candidate) {
    return res
      .status(409)
      .json({ msg: 'Candidate with the given username does not exist!' });
  }

  const isPasswordValid = password === candidate.password;
  const token = jwt.sign({ _id: candidate._id }, config.get('jwtPrivateKey'));

  try {
    isPasswordValid
      ? res.status(200).json({ token, id: candidate._id })
      : res.status(409).json({ msg: 'Invalid data!' });
  } catch (error) {
    res.status(409).json({ msg: 'Bad requst!' });
  }
};

export const getUserById = (req: Request, res: Response) => {
  User.findOne({ _id: req.params.id }, (err: Error, user: any) => {
    if (err) throw err;
    delete user._id;
    res.status(200).json(user);
  });
};

export const updateUserById = (req: Request, res: Response) => {
  User.updateOne(req.body, (err: Error, status: any) => {
    if (err) throw err;
    console.log(status);
    res.status(201).json(status);
  });
};

export const updateUserAvatarId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const myFile = {
      buffer: Buffer.from(req.body.file, 'base64'),
      originalname: `${Date.now()}--${req.body.fileName}`,
    };

    const imgUrl = await uploadImage(myFile);

    await User.updateOne(
      { _id: req.params.id },
      { $set: { avatarUrl: imgUrl } }
    );

    return res.status(200).json({
      message: 'Upload was successful',
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error to save your item!' });
    next(error);
  }
};
