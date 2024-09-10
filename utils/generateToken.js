const jwt = require("jsonwebtoken")
const {user_secret , doctor_secret} = require("../config/jwtconfig")

const user_generate_token = (user) => {
    const payload = {
        id : user.id,
        name : user.name,
        email : user.email,
        phone_no : user.phone_no,
        hname : user.hname,
        roleId : user.roleId
    }
    return jwt.sign(payload , user_secret , {expiresIn:'1h'})
}

const doctor_generate_token = (user) => {
    const payload = {
        id : user.id,
        name : user.name,
        email : user.email,
        phone_no : user.phone_no,
        Hname : user.Hname,
        roleId : user.roleId
    }
    return jwt.sign(payload , doctor_secret , {expiresIn:'1h'})
}

module.exports = {
    user_generate_token,
    doctor_generate_token
}