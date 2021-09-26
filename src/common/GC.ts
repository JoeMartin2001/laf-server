import { Storage } from '@google-cloud/storage';
import path from 'path';
const serviceKey = path.join(__dirname, '../../google-cloud-keys.json');

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'lostandfound-327009',
});

export default storage;
