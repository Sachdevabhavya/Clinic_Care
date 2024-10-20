const express = require("express");
const doctor_list_control = require("../controllers/docotors_list")
const {user_auth_middleware} = require("../middleware/auth")
const list_doctor = require("../model/doctor_login")
const list_doctors_router = express.Router();

list_doctors_router.get("/patient_login/:token/doctors",user_auth_middleware,doctor_list_control.get_all_doctors)
// list_doctors_router.get("/patient_login/:token/doctors" , async(req,res) => {
//     const token = req.params.token
//     const doctors = await list_doctor.find()

//     res.render('list_of_doctors', {token, doctors });
// })
module.exports = list_doctors_router