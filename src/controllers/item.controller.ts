import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import { uploadImage } from '../common/helpers';
import { Item, ItemType, validateItem } from '../models/Item';

/* CREATE ITEM START */
export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (validateItem(req.body).error) {
    res.status(500).json(validateItem(req.body).error?.message);
  }

  try {
    const myFile = req.file;
    const imgUrl = await uploadImage(myFile);

    const newItem = new Item({ ...req.body, imgUrl });
    await newItem.save();

    res.status(200).json({
      message: 'Upload was successful',
      data: newItem,
    });
  } catch (error) {
    next(error);
  }
};

/* GET ITEM BY ID START */
export const getItemById = (req: Request, res: Response) => {
  Item.findOne({ _id: req.params.id })
    .populate('user')
    .exec((err: Error, item: ItemType) => {
      if (err) throw new Error(err.message);
      console.log(item);
      res.status(200).json(item);
    });
};

/* GET ALL ITEMS START */
export const getAllItems = (req: Request, res: any) =>
  res.json(res.paginatedResults);
