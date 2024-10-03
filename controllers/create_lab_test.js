const lab_test_collection = require("../model/lab_test");
const lab_tests = require("../model/lab_test")

const create_lab_test = async(req, res) => {
    const {test_name , test_details} = req.body
    const obj = req.user

    if(!test_name || !test_details){
        return res.status(400).json({ message: "All fields must be provided." });
    }

    try {

        if(obj.roleId!=2){
            console.log("Invalid user")
            return res.status(200).json({messsage : "Only Doctors are allowed to access"})
        }

        const newLabTest = new lab_tests({
            test_name : test_name,
            test_details : test_details
        })

        await newLabTest.save()
        console.log("Lab test created :",newLabTest)
        return res.status(200).json({message : "Lab test created", newLabTest})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}


const getAllLabTests = async(req, res) => {
    const obj = req.user

    try {

        if(obj.role!=1){
            console.log("Invalid user")
            return res.status(200).json({messsage : "Only Patients are allowed to access"})
        }

        const LabTests = await lab_test_collection.find()
        console.log("Lab Tests : ", LabTests)
        return res.status(200).json({message : "Lab Tests : ", LabTests})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}


module.exports = {
    create_lab_test,
    getAllLabTests
}