const express = require("express");
const user_control = require("../controllers/user_login-controller");
const store_img = require("../middleware/user_image");

const user_router = express.Router();

user_router.get("/patient_login", user_control.login);

user_router.post("/patient_signup", store_img , user_control.signUp);

module.exports = user_router;
