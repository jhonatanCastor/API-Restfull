import path from "path";
import multer from 'multer';
import crypto from 'crypto';

const uploadsFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadsFolder,
  storage: multer.diskStorage({
    destination: uploadsFolder,
    filename(request, file, callback) {
      const fileHast = crypto.randomBytes(10).toString('hex');

      const fileName = `${fileHast}-${file.originalname}`

      callback(null, fileName)

    }
  })
} ;