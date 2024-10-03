const express = require("express")

const forgot_pass_control = require("../controllers/patient_forgot_password")
const {reset_password_auth_middleware} = require("../middleware/auth")
const forgot_pass_router = express.Router()

forgot_pass_router.put("/patient_login/:token/forgot_password", reset_password_auth_middleware , forgot_pass_control.patient_change_pass)

module.exports = forgot_pass_router