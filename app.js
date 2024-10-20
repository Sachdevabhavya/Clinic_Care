const express = require("express")
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const path = require("path")
const doctors_model = require("./model/doctor_login")
// const multer = require("multer"); 
const {user_secret , doctor_secret} = require("./config/jwtconfig")

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
const patients_list = require("./routes/list_of_patients_route")
// const order_router = require("./routes/order_medicine_routes");

const app = express();
require("dotenv").config();
app.use('/user_images', express.static(path.join(__dirname, 'user_images')));
app.use('/doctor_images', express.static(path.join(__dirname, 'doctor_images')));

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/main' , (req ,res) => {
    res.render('main')
})

app.get('/main/doctor_login/:token/doctor_dashboard', (req, res) => {
    const token = req.params.token;
    
    jwt.verify(token, doctor_secret, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(403).send("Unauthorized access"); 
        }
        
        const user = {
            name: decoded.name,
            email: decoded.email,
            phone_no: decoded.phone_no
        };
        
        res.render('doctor_dashboard', {token , obj: user });
    });
});


app.get('/main/patient_login/:token/dashboard', (req, res) => {
    const token = req.params.token;
    
    jwt.verify(token, user_secret, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(403).send("Unauthorized access"); 
        }
        
        const user = {
            name: decoded.name,
            email: decoded.email,
            phone_no: decoded.phone_no
        };
        
        res.render('patient_dashboard', {token , obj: user });
    });
});


app.get('/main/patient_login/:token/lab_tests' , async(req,res) => {
    const token = req.params.token
    const doctors = await doctors_model.find()
    res.render('list_of_lab_doc' , {token , doctors})
})

// app.get("/main/patient_login/:token/doctors" , async(req,res) => {
//     const token = req.params.token
//     const doctors = await doctors_model.find()
//     res.render('list_of_doctors' , {token , doctors})
// })

// app.get("/main/patient_login/:token/:doctor_id/create_appointment" , (req,res) => {
    
//     res.render('book_appointment' )
// })
// 6713b5298704580fd7cc99e3
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
app.use('/main',patients_list)
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