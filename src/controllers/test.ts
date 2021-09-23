import { Request, Response } from "express";

export const renderTest = (req: Request, res: Response) => {
  res.send("Home");
};
