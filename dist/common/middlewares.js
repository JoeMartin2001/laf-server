"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const morgan_1 = __importDefault(require("morgan"));
const auth_route_1 = __importDefault(require("../routes/auth.route"));
const item_route_1 = __importDefault(require("../routes/item.route"));
const cors_1 = __importDefault(require("cors"));
const useMiddlewares = (app) => {
    app.use(express_1.json());
    app.use(express_1.urlencoded({ extended: true }));
    app.use(cors_1.default());
    process.env.NODE_ENV === "production" && app.use(morgan_1.default("dev"));
    app.get("/", (req, res) => res.send("Home"));
    app.use("/api/item", item_route_1.default);
    app.use("/api/auth", auth_route_1.default);
};
exports.default = useMiddlewares;
