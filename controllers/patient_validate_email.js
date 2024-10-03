const user_login = require("../model/user_login");
const { forgot_password_token } = require("../utils/generateToken");

const patient_validate_email = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "All fields must be provided." });
    }

    try {
        const check_email = await user_login.findOne({ email: email });

        if (!check_email) {
            return res.status(404).json({ message: "Email id not found" });
        }
        console.log(check_email)
        r_token = forgot_password_token(check_email);
        if (!r_token) {
            return res.status(400).json({ message: "Token not generated" });
        }
        console.log("validation success")
        res.send(r_token)

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { patient_validate_email };
