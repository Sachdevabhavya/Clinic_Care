const express = require("express");
const appointment_control = require("../controllers/appointment-booking-controller");
const {user_auth_middleware} = require("../middleware/auth")
const {doctor_auth_middleware} = require("../middleware/auth")
const appointment_model = require('../model/appointment_booking')
const appointment_router = express.Router();

appointment_router.get("/doctor_login/:token/appointments", doctor_auth_middleware ,appointment_control.getAllAppointments);
appointment_router.get("/doctor_login/:loginId/appointments/:appointmentId", appointment_control.getAppointmentById);
appointment_router.post("/patient_login/:token/:doctor_id/create_appointment", user_auth_middleware , appointment_control.createAppointment);

appointment_router.get("/patient_login/:token/:doctor_id/create_appointment" , (req , res) => {
    const doctor_id = req.params.doctor_id
    const token = req.params.token

    res.render('book_appointment',{token , doctor_id})
})


module.exports = appointment_router;
