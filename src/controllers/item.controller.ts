import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { Item, ItemType } from '../models/Item';

/* CREATE ITEM START */
export const createItem = async (req: Request, res: Response) => {
  const newItem = new Item(req.body);

  try {
    await newItem.save();
    res.status(201).json({ msg: 'Item has successfully been uploaded!' });
  } catch (error) {
    res.status(409).json({ msg: 'Error: ' + error.message });
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
