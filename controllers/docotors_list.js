const list_doctors = require("../model/doctor_login")

const get_all_doctors = async (req, res) => {
    const token = req.params.token
    try {
        const obj = req.user

        if(obj.roleId != 1){
            return res.status(400).json({message:"Invalid user"})
        }

        const doctors = await list_doctors.find()
        console.log("Doctors",doctors)
        res.render("list_of_doctors", {token, doctors });

        // return res.redirect('book_appointments')
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {get_all_doctors}