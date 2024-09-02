const express = require("express");
const med_control = require("../controllers/create-medical-record");

const med_router = express.Router();

med_router.post("/doctor_login/:loginId/create_medical_records", med_control.sendrecords);


module.exports = med_router;
