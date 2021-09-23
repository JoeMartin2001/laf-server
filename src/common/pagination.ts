import { NextFunction } from "express";
import { Model } from "mongoose";
import { Item, ItemType } from "../models/Item";
import { UserType } from "../models/User";

export function usePagination(
  model: Model<UserType | ItemType>,
  population?: String,
  populators?: Object
) {
  return async (req: any, res: any, next: NextFunction) => {
    // const totalPages = await model.countDocuments();
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const region = req.query?.region;
    const caseType = req.query.case;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results: any = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.limit = limit;

    const cs = caseType === "All" ? { $in: ["Lost", "Found"] } : caseType;

    try {
      const query = await model
        .find({ region, case: cs })
        .sort({ date: -1 })
        .populate(population, populators)
        .limit(limit)
        .skip(startIndex)
        .exec();

      const totalPages = await model.countDocuments({ region, case: cs });

      results.totalPages = totalPages;
      results.results = query;
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}
