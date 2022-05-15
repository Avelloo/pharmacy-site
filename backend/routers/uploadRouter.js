import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../frontend/build/images');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.png`);
  },
});

const upload = multer({ storage });

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
  const response = `/${req.file.path}`;
  const replace = '/frontend\\build\\';
  res.send(response.replace(replace,''));
});

export default uploadRouter;