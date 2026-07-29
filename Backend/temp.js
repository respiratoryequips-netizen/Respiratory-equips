require("dotenv").config();

const axios = require("axios");
const cloudinary = require("./src/config/cloudinary");

(async () => {
  try {
    const image = (
      await axios.get("https://picsum.photos/400", {
        responseType: "arraybuffer",
      })
    ).data;

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "test" },
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );

      stream.end(image);
    });

    console.log(result);
  } catch (err) {
    console.log(err);
  }
})();