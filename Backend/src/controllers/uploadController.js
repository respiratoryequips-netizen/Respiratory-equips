const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

function streamUpload(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "respiratory-equips" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "No image file provided");

  const result = await streamUpload(req.file.buffer);

  res.status(201).json({
    success: true,
    image: { url: result.secure_url, publicId: result.public_id },
  });
});

const deleteImage = asyncHandler(async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) throw new ApiError(400, "publicId is required");

  await cloudinary.uploader.destroy(publicId);
  res.json({ success: true, message: "Image deleted" });
});

module.exports = { uploadImage, deleteImage };