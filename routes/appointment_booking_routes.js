const express = require("express");
const appointment_control = require("../controllers/appointment-booking-controller");

const appointment_router = express.Router();

appointment_router.get("/doctor_login/:loginId/appointments", appointment_control.getAllAppointments);
appointment_router.get("/doctor_login/:loginId/appointments/:appointmentId", appointment_control.getAppointmentById);
appointment_router.post("/patient_login/:loginId/create_appointment", appointment_control.createAppointment);

module.exports = appointment_router;
