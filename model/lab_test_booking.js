const mongoose = require("mongoose")

const lab_appointment = new mongoose.Schema(
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
            type : String,
            required : true
        },
    
        email : {
            type : String,
            required : true
        },

        test_name : {
            type : String, 
            required : true
        },
    
        approved : {
            type : Boolean,
            required : true
        },
    },
    {timestamps : true}
)

const lab_test_appointment = new mongoose.model("lab_appointment" , lab_appointment)

module.exports = lab_test_appointment