import path from "path";
import multer, {StorageEngine} from 'multer';
import crypto from 'crypto';

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder:  string;
  directory: string;
  multer: {
     storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

const uploadsFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: uploadsFolder,
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHast = crypto.randomBytes(10).toString('hex');

        const fileName = `${fileHast}-${file.originalname}`

        callback(null, fileName)
      }
    })
  },
  config: {
    aws: {
      bucket: 'dev-castor-api'
    }
  }
} as IUploadConfig; 