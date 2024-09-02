const multer = require("multer");
const path = require("path");

const user_img_dir = path.join(__dirname, "../user_images");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, user_img_dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${req.body.name}-${req.body.email}${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Only JPG, JPEG, and PNG file types are allowed"));
    }
  },
});

module.exports = upload.single("user_image");
