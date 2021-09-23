import { Router } from "express";
import { usePagination } from "../common/pagination";
import {
  createItem,
  getAllItems,
  getItemById,
} from "../controllers/item.controller";
import { Item } from "../models/Item";

const itemRouter = Router();

itemRouter.post("/createItem", createItem);
itemRouter.get("/getItemById/:id", getItemById);
itemRouter.get(
  "/getAllItems",
  usePagination(Item, "user", { email: 1, fullName: 1, phone: 1 }),
  getAllItems
);

export default itemRouter;
