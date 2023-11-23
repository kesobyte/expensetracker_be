const envConfigs = require("../../envConfigs");
const { filesTools, createError } = require("../../helpers");
const { User } = require("../../models");
const cloudinary = require("cloudinary");

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = envConfigs;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const updateUserAvatar = async (user, file) => {
  try {
    const { path: tmpDir } = file;

    const newFileName = String(user._id);

    const avatarPath = filesTools.getCloudinaryAvatarPath(newFileName);

    try {
      const upload = await cloudinary.v2.uploader.upload(tmpDir, {
        public_id: avatarPath,
        overwrite: true,
        transformation: [
          { fetch_format: "webp" },
          { aspect_ratio: "1.0", gravity: "face", width: 250, crop: "crop" },
        ],
      });

      const updatedAvatarUrl = await User.findByIdAndUpdate(
        user._id,
        {
          avatarUrl: upload.secure_url,
        },
        { new: true, select: "avatarUrl -_id" }
      );

      return updatedAvatarUrl;
    } catch (error) {
      throw createError(400, error.message);
    } finally {
      await filesTools.clearTmp(tmpDir);
    }
  } catch (error) {
    throw error;
  }
};

module.exports = updateUserAvatar;
