"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSocket = void 0;
const users = {};
const useSocket = (io) => {
    // CONNECTION
    io.on("connection", (client) => {
        client.on("new_user", (data) => {
            const { userId, socketId, } = JSON.parse(data);
            if (users[userId]) {
                console.log(`${users[userId]} prop already exists!`);
            }
            else {
                users[userId] = socketId;
                console.log(`${users[userId]} prop has been set!`);
            }
            console.log("User list: " + JSON.stringify(users));
        });
        // DISCONNECT
        client.on("disconnect", () => {
            for (const key in users)
                delete users[key];
            console.log("User disconnected!");
        });
    });
};
exports.useSocket = useSocket;
