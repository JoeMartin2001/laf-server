import { Application, json, urlencoded } from 'express';
import morgan from 'morgan';
import authRouter from '../routes/auth.route';
import itemRouter from '../routes/item.route';
import cors from 'cors';
import multer from 'multer';

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const useMiddlewares = (app: Application) => {
  app.disable('x-powered-by');
  app.use(multerMid.single('file'));
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cors());
  app.use(morgan('dev'));

  app.get('/', (req: any, res: any) => res.send('Home'));
  app.use('/api/item', itemRouter);
  app.use('/api/auth', authRouter);
};

export default useMiddlewares;
