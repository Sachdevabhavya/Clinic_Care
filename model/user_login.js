const mongoose = require("mongoose")

const signUpSchema = new mongoose.Schema(
    {
        name :{
            type:String,
            required: true
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

        hname : {
            type : String,
            required : true
        },

        user_image : {
            type : String,
        },

        qrcode : {
            type : String
        }
    },
    {timestamps : true}
)

const login_user = new mongoose.model("UserSignIn" , signUpSchema);

module.exports = login_user