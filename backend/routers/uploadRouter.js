import multer from "multer";
import express from "express";
import { isAuth } from "../utils.js";
import path from "path";
import EasyYandexS3 from "easy-yandex-s3";


var s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.YANDEX_IDKEY,
    secretAccessKey: process.env.YANDEX_SECRETKEY,
  },
  Bucket: "web-apteka-storage",
  debug: true,
});

const app = express();
const uploadRouter = express.Router();


app.use(multer().any());

uploadRouter.post("/", isAuth, upload.single('image'), async(req, res) => {
  let buffer = req.files[0].buffer; // Буфер загруженного файла
  var upload = await s3.Upload({buffer}, '/files/'); // Загрузка в бакет
  res.send(upload); // Ответ сервера - ответ от Yandex Object Storage
});

export default uploadRouter;
