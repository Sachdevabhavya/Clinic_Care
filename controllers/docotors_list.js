const list_doctors = require("../model/doctor_login")

const get_all_doctors = async (req, res) => {

    try {
        const obj = req.user

        if(obj.roleId != 1){
            return res.status(400).json({message:"Invalid user"})
        }

        const doctors = await list_doctors.find()
        console.log("Doctors",doctors)
        
        return res.status(200).json({message:"Doctors",doctors})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {get_all_doctors}