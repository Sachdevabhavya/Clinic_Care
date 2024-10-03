const express = require("express")
const lab_test_control = require("../controllers/create_lab_test")
const {doctor_auth_middleware} = require("../middleware/auth")
const {user_auth_middleware} = require("../middleware/auth")

const lab_test_router = express.Router()

lab_test_router.post("/doctor_login/:token/create_lab_test",doctor_auth_middleware,lab_test_control.create_lab_test)
lab_test_router.get("patient_login/:token/labTests",user_auth_middleware,lab_test_control.getAllLabTests)

module.exports = lab_test_router
