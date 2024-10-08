const express = require("express");
const appointment_control = require("../controllers/appointment-booking-controller");
const {user_auth_middleware} = require("../middleware/auth")
const appointment_router = express.Router();

appointment_router.get("/doctor_login/:token/appointments", appointment_control.getAllAppointments);
appointment_router.get("/doctor_login/:loginId/appointments/:appointmentId", appointment_control.getAppointmentById);
appointment_router.post("/patient_login/:token/:doctorId/create_appointment", user_auth_middleware , appointment_control.createAppointment);

module.exports = appointment_router;
