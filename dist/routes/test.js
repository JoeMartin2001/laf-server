"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_1 = require("../controllers/test");
const testRouter = express_1.Router();
testRouter.get("/", test_1.renderTest);
exports.default = testRouter;
