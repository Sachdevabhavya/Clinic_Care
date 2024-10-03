const express = require("express")
const mongoose = require("mongoose")
// const multer = require("multer"); 

const user_router = require("./routes/user_login_routes")
const doctor_router = require("./routes/doctor_login_routes")
const appointment_router = require("./routes/appointment_booking_routes")
const med_router = require("./routes/medical_routes")
const lab_router = require("./routes/lab_routes")
const approve_router = require("./routes/appointment_approve_routes")
const get_doctors = require("./routes/get_all_doctors")
const validation_email = require("./routes/validate_email_routes")
const forgot_password = require("./routes/patient_forgot_pass")
const laboratory_test = require("./routes/lab_test_routes")
const lab_test_appointment = require("./routes/lab_test_booking_routes")
// const order_router = require("./routes/order_medicine_routes");

const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.use((req, res, next) => {      
    res.set('Cache-Control', 'no-store')
    next()
})

app.use('/main', user_router)
app.use('/main', doctor_router)
app.use('/main', appointment_router)
app.use('/main',med_router)
app.use('/main',lab_router)
app.use('/main',approve_router)
app.use('/main',get_doctors)
app.use('/main',validation_email)
app.use('/main',forgot_password)
app.use('/main',laboratory_test)
app.use('/main',lab_test_appointment)
// app.use('/api', order_router);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

mongoose.connect(process.env.Mongo_URL)
    .then(() => {
        console.log("Connected to database successfully")
    })
    .catch((err) => {
        console.error("Failed to connect to the database", err)
    });
