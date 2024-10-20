const express = require("express");
const med_control = require("../controllers/create-medical-record");
const {user_auth_middleware} = require("../middleware/auth")
const {doctor_auth_middleware} = require("../middleware/auth")

const med_router = express.Router();

med_router.post("/doctor_login/:token/create_medical_records", doctor_auth_middleware , med_control.sendrecords);
med_router.get("/patient_login/:token/medical_records", user_auth_middleware ,med_control.getAllMedicalRecords)

med_router.get('/doctor_login/:token/create_medical_records' , (req , res) => {
    const token = req.params.token

    res.render('send_medical_records',{token})
})
module.exports = med_router;
