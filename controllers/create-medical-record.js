const medrecordscollection = require("../model/medicalrecords");

const sendrecords = async (req, res) => {
    const { patient_name, age, medicines } = req.body;

    console.log("Request Body:", req.body);

    // Log individual fields
    console.log("Patient Name:", patient_name);
    console.log("Age:", age);
    console.log("Medicines:", medicines);

    if (!patient_name || !age || !medicines) {
        console.log("Validation failed: Missing fields");
        return res.status(400).json({ message: "All fields must be provided" });
    }

    try {
        const medrecords = new medrecordscollection({
            patient_name,
            age,
            medicines
        });

        const saverecords = await medrecords.save();
        console.log(`Med Record created successfully: ${saverecords}`);
        console.log(`Med Record created with id: ${saverecords._id}`);
        return res.status(201).json({ message: "Record created successfully", record: saverecords });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const getAllMedicalRecords = async(req , res) => {
    const obj = req.user
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
        return res.status(200).json({message : "Med records", p_medrecords})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {
    sendrecords,
    getAllMedicalRecords
};
