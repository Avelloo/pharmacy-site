import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import User from "../models/userModel.js";
import { generateToken, isAdmin, isAuth } from "../utils.js";
import crypto from 'crypto';

const secretKey = 'mySecretKey';

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);


// функция для хэширования пароля
function hashPassword(password) {
  const secretKey = 'mySecretKey';
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(password);
  const hash = hmac.digest('hex');
  return hash;
}

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // сравнение хешей паролей
      if (hashPassword(req.body.password) === user.password) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isWorker: user.isWorker,
          canManageCategories: user.canManageCategories,
          canManageFormReleases: user.canManageFormReleases,
          canManageOrders: user.canManageOrders,
          canManageProducts: user.canManageProducts,
          canManageProviders: user.canManageProviders,
          canManageSupport: user.canManageSupport,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Неправильный email или пароль" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status(400).send({ message: "Пользователь уже существует" });
      return;
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword(req.body.password), // сохранение хеша пароля вместо самого пароля
      isWorker: req.body.isWorker,
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      isWorker: createdUser.isWorker,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "Пользователь не найден" });
    }
  })
);
userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = hashPassword(req.body.password)
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isWorker: updatedUser.isWorker,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "admin@admin.com") {
        res
          .status(400)
          .send({ message: "Нельзя удалить администратора сайта" });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: "Пользователь удален", user: deleteUser });
    } else {
      res.status(404).send({ message: "Пользователь не найден" });
    }
  })
);

userRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isWorker = req.body.isWorker || user.isWorker;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
      user.canManageCategories =
        req.body.canManageCategories || user.canManageCategories;
      user.canManageFormReleases =
        req.body.canManageFormReleases || user.canManageFormReleases;
      user.canManageOrders = req.body.canManageOrders || user.canManageOrders;
      user.canManageProducts =
        req.body.canManageProducts || user.canManageProducts;
      user.canManageProviders =
        req.body.canManageProviders || user.canManageProviders;
      user.canManageSupport =
        req.body.canManageSupport || user.canManageSupport;
      const updatedUser = await user.save();
      res.send({ message: "Пользователь обновлен", user: updatedUser });
    } else {
      res.status(404).send({ message: "Пользователь не найден" });
    }
  })
);

export default userRouter;
