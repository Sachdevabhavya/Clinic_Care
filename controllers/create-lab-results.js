const labrecordscollection = require("../model/labtestrecords");

const sendrecords = async (req, res) => {
    const { patient_name, age, test_results } = req.body;
    const obj = req.user
    console.log("Token",obj)
    console.log("Request Body:", req.body);

    if (!patient_name || !age || !test_results) {
        return res.status(400).json({ message: "All fields must be provided" });
    }

    try {
        
        if(obj.roleId != 2){
            consol.log("Invalid user")
            return res.status(200).json({messsage : "Only Doctors are allowed to access"})
          }

        const labrecords = new labrecordscollection({
            doctor_id : obj.id,
            doctor_name : obj.name,
            patient_name,
            age,
            test_results
        });

        const saverecords = await labrecords.save();
        console.log(`Lab Record created successfully: ${saverecords}`);
        console.log(`Lab Record created with id: ${saverecords._id}`);
        return res.status(201).json({ message: "Record created successfully", record: saverecords });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const getAllLabRecords = async(req , res) => {
    const obj = req.user
    console.log(obj)
    try {
        if(obj.roleId !=1){
            console.log("Invalid user")
            return res.status(200).json({messsage : "Only Patients are allowed to access"})
        }

        const p_labrecords = await labrecordscollection.find({
                patient_name : obj.name
        })

        console.log("Patient med records ", p_labrecords)
        return res.status(200).json({message : "Med records", p_labrecords})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error" });
    }
}


module.exports = {
    sendrecords,
    getAllLabRecords
};
