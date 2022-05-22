import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isWorker: user.isWorker,
    },
    process.env.JWT_SECRET || "somethingsecret",
    { expiresIn: "30d" }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Неправильный токен' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'Токен отсутствует' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Неправильный токен администратора' });
  }
};

export const isWorker = (req, res, next) => {

  if (req.user && req.user.isWorker) {
    next();
  } else {
    res.status(401).send({ message: 'Неправильный токен сотрудника' });
  }
};
export const isWorkerOrAdmin = (req, res, next) => {
  console.log('Проверка прав доступа: ' + req.user.isWorker +' <==worker  admin==> '+ req.user.isAdmin);
  if (req.user && (req.user.isWorker || req.user.isAdmin)) {
    next();
  } else {
    res.status(401).send({ message: 'Неправильный токен администратора или сотрудника' });
  }
};

