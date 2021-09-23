"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.validateAuth = exports.validateUser = void 0;
const joi_1 = __importStar(require("joi"));
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const validateUser = (body) => {
    const joiSchema = joi_1.default.object({
        email: joi_1.string().min(3).required().email(),
        fullName: joi_1.string().min(3).required(),
        username: joi_1.string().min(3).required(),
        password: joi_1.string().min(3).required(),
    });
    return joiSchema.validate(body);
};
exports.validateUser = validateUser;
const validateAuth = (body) => {
    const joiSchema = joi_1.default.object({
        username: joi_1.default.string().min(3).required(),
        password: joi_1.default.string().min(4).required(),
    });
    return joiSchema.validate(body);
};
exports.validateAuth = validateAuth;
exports.User = mongoose_1.model("User", UserSchema);
