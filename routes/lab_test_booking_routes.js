const express = require('express')
const lab_book_control = require("../controllers/lab_test_booking")
const {user_auth_middleware, doctor_auth_middleware} = require("../middleware/auth")

const lab_test_book_router = express.Router()

lab_test_book_router.post("/patient_login/:token/:doctor_id/lab_appointment",user_auth_middleware,lab_book_control.book_lab_test)
lab_test_book_router.get("/doctor_login/:token/lab_appointments" , doctor_auth_middleware , lab_book_control.getAllAppointments)

lab_test_book_router.get('/patient_login/:token/:doctor_id/lab_appointment' , (req,res) => {
    const token = req.params.token
    const doctor_id = req.params.doctor_id
    res.render('lab_appointment' , {token , doctor_id})
})
module.exports = lab_test_book_router