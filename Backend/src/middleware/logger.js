const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "..", "..", "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
const logFile = path.join(logDir, "app.log");

function logger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const line = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

    if (res.statusCode >= 500) console.error(line);
    else if (res.statusCode >= 400) console.warn(line);
    else console.log(line);

    fs.appendFile(logFile, line + "\n", (err) => {
      if (err) console.error("[Logger] Failed to write log file:", err.message);
    });
  });

  next();
}

module.exports = logger;