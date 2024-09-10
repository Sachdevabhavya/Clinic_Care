const mongoose = require("mongoose")

const doctorSignUpSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },

        phone_no : {
            type : Number,
            required : true
        },

        email : {
            type : String,
            required : true,
            unique : true
        },

        password : {
            type : String,
            required : true,
            minlength : 8
        },

        Hname : {
            type : String,
            required : true
        },

        roleId : {
            type : Number,
            required : true
        },

        doctor_image : {
            type : String
        },
    },
    {timestamps : true}
)

const login_doctor = new mongoose.model("DoctorSignIn" , doctorSignUpSchema)

module.exports = login_doctor

