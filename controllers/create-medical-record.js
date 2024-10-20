const medrecordscollection = require("../model/medicalrecords");
// const { patient_validate_email } = require("./patient_validate_email");

const sendrecords = async (req, res) => {
    const { patient_name, age, medicine_name, dosage, description, diagnosis, symptom_type, cause } = req.body;
    const token = req.params.token;
    const obj = req.user;

    // Validate medicine fields
    if (!Array.isArray(medicine_name) || !Array.isArray(dosage) || !Array.isArray(description)) {
        console.log("Validation failed: Missing fields for medicines");
        return res.status(400).json({ message: "Please provide all medicine details" });
    }

    if (medicine_name.length === 0 || dosage.length === 0 || description.length === 0) {
        console.log("Validation failed: No medicines provided");
        return res.status(400).json({ message: "Please provide at least one medicine" });
    }

    // Validate symptom fields
    if (!Array.isArray(diagnosis) || !Array.isArray(symptom_type) || !Array.isArray(cause)) {
        console.log("Validation failed: Missing fields for symptoms");
        return res.status(400).json({ message: "Please provide all symptom details" });
    }

    if (diagnosis.length === 0 || symptom_type.length === 0 || cause.length === 0) {
        console.log("Validation failed: No symptoms provided");
        return res.status(400).json({ message: "Please provide at least one symptom" });
    }

    // Prepare medicines array
    const medicines = medicine_name.map((name, index) => ({
        medicine_name: name,
        dosage: dosage[index],
        description: description[index]
    }));

    // Prepare symptoms array
    const symptoms = diagnosis.map((diag, index) => ({
        diagnosis: diag,
        type: symptom_type[index],
        cause: cause[index]
    }));

    try {
        const medrecords = new medrecordscollection({
            doctor_id: obj.id,
            patient_name,
            age,
            medicines,
            symptoms, // Include the symptoms array
            d_view_status: false
        });

        const saverecords = await medrecords.save();
        console.log(`Med Record created successfully: ${saverecords}`);
        return res.redirect(`/main/doctor_login/${token}/doctor_dashboard`);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};


const getAllMedicalRecords = async(req , res) => {
    const obj = req.user
    const token = req.params.token
    console.log(obj)
    try {
        if(obj.roleId !=1){
            console.log("Invalid user")
            return res.status(200).json({messsage : "Only Patients are allowed to access"})
        }

        const p_medrecords = await medrecordscollection.find({
                patient_name : obj.name
        })

        console.log("Patient med records ", p_medrecords)
        return res.render('med_records' , {token , p_medrecords , name : obj.name , email : obj.email , phone_no : obj.phone_no })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {
    sendrecords,
    getAllMedicalRecords
};
