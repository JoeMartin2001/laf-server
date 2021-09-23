import { Server } from 'socket.io';

type usersType = { userId?: string };

const users: usersType = {};

export const useSocket = (io: Server) => {
  // CONNECTION
  io.on('connection', (client) => {
    client.on('new_user', (data) => {
      console.log(data);
      // const {
      //   userId,
      //   socketId,
      // }: { userId: keyof typeof users; socketId: string } = JSON.parse(data);

      // if (users[userId]) {
      //   console.log(`${users[userId]} prop already exists!`);
      // } else {
      //   users[userId] = socketId;
      //   console.log(`${users[userId]} prop has been set!`);
      // }
      // console.log('User list: ' + JSON.stringify(users));
    });

    // DISCONNECT
    client.on('disconnect', () => {
      type keyType = keyof typeof users;

      for (const key in users) delete users[key as keyof typeof users];
      console.log('User disconnected!');
    });
  });
};
