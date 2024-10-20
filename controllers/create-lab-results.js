const labrecordscollection = require("../model/labtestrecords");

const sendrecords = async (req, res) => {
    const { patient_name, age, test_name, description, results, conclusion } = req.body;
    const obj = req.user;
    const token = req.params.token
    console.log("Token:", obj);
    console.log("Request Body:", req.body);

    if (!patient_name || !age || !test_name || !description || !results || !conclusion) {
        return res.status(400).json({ message: "All fields must be provided" });
    }

    if (obj.roleId != 2) {
        console.log("Invalid user");
        return res.status(403).json({ message: "Only doctors are allowed to access this resource" });
    }

    try {
        const labrecords = new labrecordscollection({
            doctor_id: obj.id,
            doctor_name: obj.name,
            patient_name,
            age,
            test_results: test_name.map((name, index) => ({
                test_name: name,
                description: description[index],
                results: results[index],
                conclusion: conclusion[index]
            })),
        });

        const saverecords = await labrecords.save();
        console.log(`Lab Record created successfully: ${saverecords}`);
        console.log(`Lab Record created with id: ${saverecords._id}`);
        return res.redirect(`/main/doctor_login/${token}/doctor_dashboard`);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const getAllLabRecords = async(req , res) => {
    const obj = req.user
    const token = req.params.token
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
        return res.render('lab_records' , {token , p_labrecords , name : obj.name , email : obj.email , phone_no : obj.phone_no })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error" });
    }
}


module.exports = {
    sendrecords,
    getAllLabRecords
};
