const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = "Field cannot be empty";
  }

  if (err.message === "POST_NOT_FOUND") {
    statusCode = 404;
    message = "Post not found";
  }

  if (err.message === "CATEGORY_NOT_FOUND") {
    statusCode = 404;
    message = "Category not found";
  }

  if (err.message === "TAG_NOT_FOUND") {
    statusCode = 404;
    message = "Tag not found";
  }

  if (err.message === "DATA_NOT_FOUND") {
    statusCode = 404;
    message = "No data found";
  }

  res.status(statusCode).json({
    statusCode,
    message,
  });
};

module.exports = errorHandler;
