const express = require("express");
const doctor_list_control = require("../controllers/docotors_list")
const {user_auth_middleware} = require("../middleware/auth")

const list_doctors_router = express.Router();

list_doctors_router.get("/patient_login/:token/doctors",user_auth_middleware,doctor_list_control.get_all_doctors)

module.exports = list_doctors_router