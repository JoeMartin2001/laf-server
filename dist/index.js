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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const middlewares_1 = __importDefault(require("./common/middlewares"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socket_1 = require("./common/socket");
const app = express_1.default();
const httpServer = http_1.createServer(app);
const io = new socket_io_1.Server(httpServer);
socket_1.useSocket(io);
middlewares_1.default(app);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const PORT = process.env.PORT || 4000;
        // const mongoURI: string = config.get("mongoURI");
        const mongoURI = "mongodb://localhost:27017/lost-and-found";
        try {
            yield mongoose_1.default.connect(mongoURI, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            });
            console.log("Connected to mongoDB database!");
            httpServer.listen(PORT, () => console.log(`Listening to port ${PORT}!`));
        }
        catch (error) {
            console.log("Error to launch the application! Error: " + error);
            process.exit(1);
        }
    });
}
start();
