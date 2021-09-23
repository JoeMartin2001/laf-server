import { Application, json, urlencoded } from 'express';
import morgan from 'morgan';
import authRouter from '../routes/auth.route';
import itemRouter from '../routes/item.route';
import cors from 'cors';

const useMiddlewares = (app: Application) => {
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan('dev'));

  app.get('/', (req: any, res: any) => res.send('Home'));
  app.use('/api/item', itemRouter);
  app.use('/api/auth', authRouter);
};

export default useMiddlewares;
