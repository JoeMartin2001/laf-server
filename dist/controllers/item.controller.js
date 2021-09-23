"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllItems = exports.getItemById = exports.createItem = void 0;
const mongoose_1 = require("mongoose");
const Item_1 = require("../models/Item");
/* CREATE ITEM START */
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = new Item_1.Item(req.body);
    try {
        yield newItem.save();
        res.status(201).json({ msg: "Item has successfully been uploaded!" });
    }
    catch (error) {
        res.status(409).json({ msg: "Error: " + error.message });
    }
});
exports.createItem = createItem;
/* GET ITEM BY ID START */
const getItemById = (req, res) => {
    Item_1.Item.findOne({ _id: req.params.id })
        .populate("user")
        .exec((err, item) => {
        if (err)
            throw new mongoose_1.Error(err.message);
        console.log(item);
        res.status(200).json(item);
    });
};
exports.getItemById = getItemById;
/* GET ALL ITEMS START */
const getAllItems = (req, res) => {
    // Item.find({}, (err: Error, items: ItemType[]) => {
    //   if (err) throw new Error(err.message);
    //   res.status(200).json(items);
    // });
    res.json(res.paginatedResults);
};
exports.getAllItems = getAllItems;
