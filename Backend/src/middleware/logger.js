function logger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const message = `Request completed: ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Duration: ${duration}ms`;

    if (res.statusCode >= 500) console.error(message);
    else if (res.statusCode >= 400) console.warn(message);
    else console.log(message);
  });

  next();
}

module.exports = logger;