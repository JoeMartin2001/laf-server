import { Router } from "express";
import { renderTest } from "../controllers/test";

const testRouter = Router();

testRouter.get("/", renderTest);

export default testRouter;
