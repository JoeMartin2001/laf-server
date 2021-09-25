import { Storage } from '@google-cloud/storage';
import path from 'path';
const serviceKey = path.join(
  __dirname,
  '../../lostandfound-327009-3e45c415f14c.json'
);

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'lostandfound-327009',
});

export default storage;
