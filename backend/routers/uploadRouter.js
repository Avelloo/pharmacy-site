import multer from "multer";
import express from "express";
import { isAuth } from "../utils.js";
import path from "path";
import EasyYandexS3 from "easy-yandex-s3";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.YANDEX_IDKEY,
    secretAccessKey: process.env.YANDEX_SECRETKEY,
  },
  Bucket: "web-apteka-storage",
  debug: true,
});

const uploadRouter = express.Router();

async function start(req) {
  var upload = await s3.Upload(
    {
      path: path.resolve(__dirname, req),
    },
    "/test/"
  );
  console.log(upload);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./frontend/build/images");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.png`);
  },
});

uploadRouter.post("/", isAuth, (req, res) => {

  start(req);
  res.send(response.replace(replace, ""));
});

export default uploadRouter;
