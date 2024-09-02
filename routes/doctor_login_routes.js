const express = require("express");
const doctor_control = require("../controllers/doctor-login-controller");
const store_img = require("../middleware/doctor_image");

const doctor_router = express.Router();

doctor_router.get("/doctor_login", doctor_control.login);
doctor_router.post("/doctor_signup", store_img, doctor_control.signUp);

module.exports = doctor_router;
