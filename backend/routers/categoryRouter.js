import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import { isAdmin, isAuth, isWorkerOrAdmin } from "../utils.js";

const categoryRouter = express.Router();

categoryRouter.get(
  "/",

  expressAsyncHandler(async (req, res) => {
    const category = req.query.seller || "";

    const categories = await Category.find();

    res.send(categories);
  })
);
categoryRouter.post(
  "/",
  isAuth,
  isWorkerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const category = new Category({
      name: "Новая категория " + Date.now(),
    });
    const createdСategory = await category.save();
    res.send({ message: "Категория", category: createdСategory });
  })
);
categoryRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (category) {
      res.send(category);
    } else {
      res.status(404).send({ message: "Такая категория не найдена!" });
    }
  })
);

categoryRouter.put(
  "/:id",
  isAuth,
  isWorkerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (category) {
      category.name = req.body.name;
      const updatedCategory = await category.save();
      res.send({ message: "Категория обновлена", category: updatedCategory });
    } else {
      res.status(404).send({ message: "Категория не найдена" });
    }
  })
);
categoryRouter.delete(
  "/:id",
  isAuth,
  isWorkerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      const deleteCategory = await category.remove();
      res.send({ message: "Категория удалена", category: deleteCategory });
    } else {
      res.status(404).send({ message: "Категория не найдена" });
    }
  })
);

export default categoryRouter;
