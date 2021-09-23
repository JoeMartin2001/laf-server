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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.getUserById = exports.login = exports.registerUser = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield User_1.User.findOne({ username: req.body.username });
    if (candidate) {
        return res.status(409).json({
            msg: "User with given username already exists! Please choose another one!",
        });
    }
    const { error } = User_1.validateUser(req.body);
    if (error)
        res.status(409).send({ msg: error.details[0].message });
    const user = new User_1.User(req.body);
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, config_1.default.get("jwtPrivateKey"));
    try {
        yield user.save();
        res.status(201).json({
            msg: "User has successfully been registered!",
            token,
            id: user._id,
        });
    }
    catch (error) { }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = User_1.validateAuth(req.body);
    if (error)
        return res.status(409).send({ msg: error.details[0].message });
    const { username, password } = req.body;
    const candidate = yield User_1.User.findOne({ username });
    if (!candidate) {
        return res
            .status(409)
            .json({ msg: "Candidate with the given username does not exist!" });
    }
    const isPasswordValid = password === candidate.password;
    const token = jsonwebtoken_1.default.sign({ _id: candidate._id }, config_1.default.get("jwtPrivateKey"));
    try {
        isPasswordValid
            ? res.status(200).json({ token, id: candidate._id })
            : res.status(409).json({ msg: "Invalid data!" });
    }
    catch (error) {
        res.status(409).json({ msg: "Bad requst!" });
    }
});
exports.login = login;
const getUserById = (req, res) => {
    User_1.User.findOne({ _id: req.params.id }, (err, user) => {
        if (err)
            throw err;
        res.status(200).json(user);
    });
};
exports.getUserById = getUserById;
const updateUserById = (req, res) => {
    User_1.User.updateOne(req.body, (err, status) => {
        if (err)
            throw err;
        console.log(status);
        res.status(201).json(status);
    });
};
exports.updateUserById = updateUserById;
