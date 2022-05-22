import express from "express";
import expressAsyncHandler from "express-async-handler";
import Provider from "../models/providerModel.js";
import { isAdmin, isAuth, isWorkerOrAdmin } from "../utils.js";

const providerRouter = express.Router();

providerRouter.get(
  "/",

  expressAsyncHandler(async (req, res) => {
    const provider = req.query.provider || "";

    const providers = await Provider.find();

    res.send(providers);
  })
);
providerRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const provider = await Provider.findById(req.params.id)
    if (provider) {
      res.send(provider);
    } else {
      res.status(404).send({ message: "Такой поставщик не найден!" });
    }
  })
);
providerRouter.post(
  "/",
  isAuth,
  isWorkerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const provider = new Provider({
      name: "Новый поставщик " + Date.now(),
      phoneNumber: "+79991234567"
      
    });
    const createdProvider = await provider.save();
    res.send({ message: "Новый поставщик создан", provider: createdProvider });
  })
);
providerRouter.put(
  "/:id",
  isAuth,
  isWorkerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const providerId = req.params.id;
    const provider = await Provider.findById(providerId);
    if (provider) {
      provider.name = req.body.name;
      provider.phoneNumber = req.body.phoneNumber;
      const updatedProvider = await provider.save();
      res.send({ message: "Поставщик обновлен", provider: updatedProvider });
    } else {
      res.status(404).send({ message: "Поставщик не найден" });
    }
  })
);
providerRouter.delete(
  "/:id",
  isAuth,
  isWorkerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const provider = await Provider.findById(req.params.id);
    if (provider) {
      const deleteProvider = await provider.remove();
      res.send({ message: "Поставщик удален", provider: deleteProvider });
    } else {
      res.status(404).send({ message: "Поставщик не найден" });
    }
  })
);


export default providerRouter;
