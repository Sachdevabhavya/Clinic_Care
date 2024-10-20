const login_user = require("../model/user_login");

const bcrypt = require("bcryptjs");
const multer = require("multer");

const { generateQrCode } = require("../middleware/user_qrcode");
const {user_generate_token} = require("../utils/generateToken")

//user signup
const signUp = async (req, res, next) => {
  const { name, phone_no, email, password, hname } = req.body;

  if (!name || !phone_no || !email || !password || !hname) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  try {
    const existing_user = await login_user.findOne({ email });

    if (existing_user) {
      console.log(`User already exists with the email id ${email}`);
      return res.status(400).json({
        message: `User already exists with the given email id ${email}`,
      });
    }

    console.log(`Received password: ${password}`);

    const hashedPassword = bcrypt.hashSync(password);

    const user = new login_user({
      name,
      phone_no,
      email,
      password: hashedPassword,
      hname,
      roleId : 1,
      user_image: req.file ? req.file.filename : null, 
    });

    
    const qrCodeFilePath = await generateQrCode(name, phone_no, email);

    await user.save();
    console.log(`User created successfully: ${user}`);
    console.log(`User successfully saved with id: ${user._id}`);
    return res.redirect('/main/patient_login');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};


//user image upload
const UploadImgMiddleware = (req, res, next) => {
  const upload = upload_img.store_image(req.body.name);
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }

    next();
  });
};

//user login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);

  try {
    const existing_user = await login_user.findOne({ email });

    if (!existing_user) {
      console.log(`Couldn't find user by this email: ${email}`);
      return res.status(404).json({ message: "Couldn't find user by this email" });
    }

    const isPasswordValid = bcrypt.compareSync(password, existing_user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    existing_user.roleId = 1;
    const token = user_generate_token(existing_user);

    if (!token) {
      return res.status(400).json({ message: "Token not generated" });
    }

    console.log("Token generated successfully");
    console.log(`Login Successful with userId ${existing_user._id}`);
    console.log(token);
    
    return res.redirect(`/main/patient_login/${token}/dashboard`);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  login,
  signUp,
  UploadImgMiddleware
}