const express = require("express");

const approve_control = require("../controllers/doctor_approve_appointment")
const {doctor_auth_middleware} = require("../middleware/auth")
const approve_router = express.Router()

approve_router.put("/doctor_login/:token/getAllAppointments/:appointment_id",doctor_auth_middleware, approve_control.approve_app)

module.exports = approve_router