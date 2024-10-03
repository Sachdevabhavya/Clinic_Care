const patient_cred = require("../model/user_login");
const bcryptjs = require("bcryptjs");

const patient_change_pass = async (req, res) => {
    const { update_pass, confirm_pass } = req.body;
    const obj = req.user;  

    try {
        if (!update_pass || !confirm_pass) {
            return res.status(400).json({ message: "Both password fields must be provided" });
        }

        if (update_pass !== confirm_pass) {
            return res.status(400).json({ message: "Passwords don't match" });
        }

        if (!obj || !obj.id) {
            return res.status(400).json({ message: "User not authenticated or invalid token" });
        }

        const saltRounds = 10;  
        const hashedPassword = await bcryptjs.hash(confirm_pass, saltRounds);  

        const change_pass = await patient_cred.findByIdAndUpdate(
            obj.id,  
            { password: hashedPassword }, 
            { new: true } 
        );

        if (!change_pass) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("password change success")
        return res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { patient_change_pass };
