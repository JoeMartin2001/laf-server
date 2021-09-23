import express from 'express';
import mongoose from 'mongoose';
import useMiddlewares from './common/middlewares';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { useSocket } from './common/socket';
import config from 'config';

const app: express.Application = express();

const httpServer = createServer(app);
const io = new Server(httpServer);

useSocket(io);

useMiddlewares(app);

async function start() {
  const PORT = process.env.PORT || 4000;
  // const mongoURI: string = config.get("mongoURI");
  const mongoURI: string = 'mongodb://localhost:27017/lost-and-found';
  const IP = '192.168.0.5';

  try {
    await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Connected to mongoDB database!');
    httpServer.listen(PORT as number, IP, () =>
      console.log(`Listening to port ${PORT}! Remote api: ${IP}`)
    );
  } catch (error) {
    console.log('Error to launch the application! Error: ' + error);
    process.exit(1);
  }
}

start();
