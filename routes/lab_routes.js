const express = require("express");
const lab_control = require("../controllers/create-lab-results");
const {doctor_auth_middleware} = require("../middleware/auth")
const lab_router = express.Router();

lab_router.post("/doctor_login/:token/create_lab_records",doctor_auth_middleware, lab_control.sendrecords);


module.exports = lab_router;
