require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {

        console.log(process.env.CLOUDINARY_CLOUD_NAME);
        console.log(process.env.CLOUDINARY_API_KEY);
        console.log(process.env.CLOUDINARY_API_SECRET);

        console.log(`[Server] Running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
    });
});