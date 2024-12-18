const mongoose = require("mongoose")

const appointment_book = new mongoose.Schema(
    {
        doctor_id : {
            type : String,
            required : true
        },
        
        patient_name : {
            type : String,
            required : true
        },

        age : {
            type : Number,
            required : true 
        },

        email : {
            type : String,
            required : true
        },

        description : {
            type : String
        },

        phone_no : {
            type : Number,
            required : true
        },

        home_address : {
            type : String,
            required : true   
        },

        approved : {
            type : Boolean,
            required : true
        }
    },
    {timestamps : true}
)

const appointment_collection = new mongoose.model("appointment" , appointment_book)

module.exports = appointment_collection
