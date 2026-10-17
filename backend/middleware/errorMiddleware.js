export const errorHandler = (err, req, res, next) => {
  // Errors thrown without setting a status would otherwise report 200
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
