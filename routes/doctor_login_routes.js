const express = require("express");
const doctor_control = require("../controllers/doctor_login_controller");
const store_img = require("../middleware/doctor_image");

const doctor_router = express.Router();

doctor_router.post("/doctor_login", doctor_control.login);
doctor_router.post("/doctor_signup", store_img, doctor_control.signUp);


doctor_router.get('/doctor_signup',(req,res) => {
    res.render('doctor_signup')
})

doctor_router.get('/doctor_login',(req,res) => {
    res.render('doctor_signin')
})
module.exports = doctor_router;
