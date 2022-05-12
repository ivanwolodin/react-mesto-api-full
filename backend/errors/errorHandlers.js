const { NotFoundError } = require('./NotFoundError');

module.exports.handler404 = async (req, res, next) => {
  next(new NotFoundError('Cтраница не найдена'));
};

module.exports.generalErrorHandler = async (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
};
