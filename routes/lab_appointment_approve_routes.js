const express = require("express");

const lab_approve_control = require("../controllers/doctor_approve_lab_appointment")
const {doctor_auth_middleware} = require("../middleware/auth")
const lab_approve_router = express.Router()

lab_approve_router.put("/doctor_login/:token/lab_appointments/:lab_appointment_id",doctor_auth_middleware, lab_approve_control.approve_lab_app)

module.exports = lab_approve_router