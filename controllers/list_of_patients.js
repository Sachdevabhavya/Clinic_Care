const appointment_model = require("../model/appointment_booking");
const patients = require("../model/user_login");

const getAllPatients = async (req, res) => {
    const obj = req.user;
    const token = req.params.token

    try {

        if (obj.roleId !== 2) {
            console.log("Invalid user");
            return res.status(403).json({ message: "Only Doctors are allowed to access" });
        }

        const appointments = await appointment_model.find({ doctor_id: obj.id }).select("patient_name");

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: "No patients found" });
        }

        const patientNames = appointments.map(app => app.patient_name);

        const list_of_patients = await patients.find({ name: { $in: patientNames } });

        console.log("List of patients: ", list_of_patients);
        return res.render('list_of_patients' , {token , list_of_patients})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}


module.exports = {
    getAllPatients
}