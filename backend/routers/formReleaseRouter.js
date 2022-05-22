import express from "express";
import expressAsyncHandler from "express-async-handler";
import FormRelease from "../models/formReleaseModel.js";
import { isAdmin, isAuth, isWorkerOrAdmin } from "../utils.js";

const formReleaseRouter = express.Router();

formReleaseRouter.get(
  "/",

  expressAsyncHandler(async (req, res) => {
    const formRelease = req.query.formRelease || "";

    const formReleases = await FormRelease.find();

    res.send(formReleases);
  })
);
formReleaseRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const formRelease = await FormRelease.findById(req.params.id)
    if (formRelease) {
      res.send(formRelease);
    } else {
      res.status(404).send({ message: "Такая форма выпуска не найдена!" });
    }
  })
);
formReleaseRouter.post(
  "/",
  isAuth,
  isWorkerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const formRelease = new FormRelease({
      name: "Новая форма выпуска " + Date.now(),
      
    });
    const createdFormRelease = await formRelease.save();
    res.send({ message: "Форма выпуска создана", formRelease: createdFormRelease });
  })
);

formReleaseRouter.put(
  "/:id",
  isAuth,
  isWorkerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const formReleaseId = req.params.id;
    const formRelease = await FormRelease.findById(formReleaseId);
    if (formRelease) {
      formRelease.name = req.body.name;
      const updatedFormRelease = await formRelease.save();
      res.send({ message: "Форма выпуска обновлена", formRelease: updatedFormRelease });
    } else {
      res.status(404).send({ message: "Форма выпуска не найдена" });
    }
  })
);
formReleaseRouter.delete(
  "/:id",
  isAuth,
  isWorkerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const formRelease = await FormRelease.findById(req.params.id);
    if (formRelease) {
      const deleteFormRelease = await formRelease.remove();
      res.send({ message: "Форма выпуска удалена", formRelease: deleteFormRelease });
    } else {
      res.status(404).send({ message: "Форма выпуска не найдена" });
    }
  })
);

export default formReleaseRouter;
