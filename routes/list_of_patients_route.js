const express = require("express")
const list_patients_control = require("../controllers/list_of_patients")
const {doctor_auth_middleware} = require("../middleware/auth")

const list_patients_router = express.Router()

list_patients_router.get("/doctor_login/:token/patients" , doctor_auth_middleware , list_patients_control.getAllPatients)

module.exports = list_patients_router
