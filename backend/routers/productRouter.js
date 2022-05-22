import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import { isAdmin, isAuth, isWorkerOrAdmin } from "../utils.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const category = req.query.category || '';
    const provider = req.query.provider || "";
    const order = req.query.order || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const providerFilter = provider ? { provider } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };


    const products = await Product.find({
      ...providerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate('provider', 'provider.name provider.phoneNumber')
      .sort(sortOrder);
    res.send(products);
  })
);
productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(data.product);
    res.send({ products: createdProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
      'provider', 'provider.name, provider.phoneNumber'
    );
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Такой продукт не найден!" });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  isWorkerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "Новый продукт " + Date.now(),
      provider: "Неопределенный поставщик",
      image: "/images/p1.jpg",
      price: 0,
      category: "Неопределенная категория",
      formRelease: "Неопределенная форма выпуска",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "Описание",
    });
    const createdProduct = await product.save();
    res.send({ message: "Товар создан", product: createdProduct });
  })
);

productRouter.put(
  "/:id",
  isAuth,
  isWorkerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.provider = req.body.provider;
      product.formRelease = req.body.formRelease;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: "Товар обновлен", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Товар не найден" });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isWorkerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: "Товар удален", product: deleteProduct });
    } else {
      res.status(404).send({ message: "Товар не найден" });
    }
  })
);

productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'Вы уже отправили отзыв' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Отзыв отправлен',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Товар не найден' });
    }
  })
);

export default productRouter;
