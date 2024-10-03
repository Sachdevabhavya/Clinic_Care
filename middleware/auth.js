const jwt = require("jsonwebtoken")
const {user_secret, doctor_secret , reset_secret} = require("../config/jwtconfig")

const user_auth_middleware = async(req,res,next) => {
    var token = req.params.token

    if(!token) {
        return res.status(404).json({message : "Access denied , no token provided"})
    }

    try {
        console.log("token",token)
        const decoded = jwt.verify(token, user_secret)
        req.user = decoded
        console.log("decoded",decoded)
        next()
    } catch (error) {
        console.log(error)
    }
}

const doctor_auth_middleware = async(req,res,next) => {
    var token = req.params.token

    if(!token) {
        return res.status(404).json({message : "Access denied , no token provided"})
    }

    try {
        console.log("token",token)
        const decoded = jwt.verify(token, doctor_secret)
        req.user = decoded
        console.log("decoded",decoded)
        next()
    } catch (error) {
        console.log(error)
    }
}

const reset_password_auth_middleware = async(req ,res, next) => {
    var token = req.params.token

    if(!token) {
        return res.status(404).json({message : "Access denied , no token provided"})
    }

    try {
        console.log("token",token)
        const decoded = jwt.verify(token, reset_secret)
        req.user = decoded
        console.log("decoded",decoded)
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    user_auth_middleware,
    doctor_auth_middleware,
    reset_password_auth_middleware
}