const ApiError = require("../utils/ApiError");

function notFound(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || [];

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    errors = Object.values(err.errors).map((e) => e.message);
    message = "Validation failed";
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  // Mongoose invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Cloudinary SDK errors (upload/delete failures) — these arrive as
  // { message, http_code, name: "UnexpectedResponse" } rather than as an ApiError.
  if (err.http_code) {
    statusCode = err.http_code;
    if (err.http_code === 401 || err.http_code === 403) {
      message =
        "Image upload was rejected by Cloudinary. This almost always means CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, or CLOUDINARY_API_SECRET in your .env is incorrect. Double-check them against your Cloudinary dashboard.";
    } else if (err.http_code === 400) {
      message = "Cloudinary rejected the upload — the file may be corrupted or an unsupported format.";
    } else {
      message = `Cloudinary error: ${err.message}`;
    }
  }

  // Always print full details to the terminal for debugging, regardless of
  // what gets sent to the frontend.
  console.error("──── ERROR ────");
  console.error(`Route: ${req.method} ${req.originalUrl}`);
  console.error(`Status: ${statusCode}`);
  console.error(`Message: ${err.message}`);
  if (err.http_code) console.error(`Cloudinary http_code: ${err.http_code}`);
  if (err.stack) console.error(err.stack);
  console.error("────────────────");

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}

module.exports = { notFound, errorHandler };