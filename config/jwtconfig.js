require("dotenv").config()

module.exports = {
    user_secret : process.env.USER_JWT_SECRET_KEY,
    doctor_secret : process.env.DOCTOR_JWT_SECRET_KEY
}