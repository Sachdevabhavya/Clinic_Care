const express = require("express");
const lab_control = require("../controllers/create-lab-results");

const lab_router = express.Router();

lab_router.post("/doctor_login/:loginId/create_lab_records", lab_control.sendrecords);


module.exports = lab_router;
