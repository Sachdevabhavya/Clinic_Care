const express = require("express");
const med_control = require("../controllers/create-medical-record");
const {user_auth_middleware} = require("../middleware/auth")

const med_router = express.Router();

med_router.post("/doctor_login/:loginId/create_medical_records", med_control.sendrecords);
med_router.get("/patient_login/:token/medical_records", user_auth_middleware ,med_control.getAllMedicalRecords)

module.exports = med_router;
