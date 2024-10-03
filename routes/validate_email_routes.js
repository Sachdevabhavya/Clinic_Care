const express = require("express")

const validate_email_control = require("../controllers/patient_validate_email")
const validate_router = express.Router()

validate_router.get("/patient_login/validate_email",validate_email_control.patient_validate_email)

module.exports = validate_router