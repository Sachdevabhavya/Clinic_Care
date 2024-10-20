const express = require("express")
const lab_control = require("../controllers/create-lab-results")
const {doctor_auth_middleware} = require("../middleware/auth")
const {user_auth_middleware} = require("../middleware/auth")
const lab_router = express.Router();

lab_router.post("/doctor_login/:token/create_lab_records",doctor_auth_middleware, lab_control.sendrecords)
lab_router.get("/patient_login/:token/lab_records", user_auth_middleware ,lab_control.getAllLabRecords)

lab_router.get('/doctor_login/:token/create_lab_records' , (req,res) => {
    const token = req.params.token

    res.render('send_lab_records' , {token})
})
module.exports = lab_router
