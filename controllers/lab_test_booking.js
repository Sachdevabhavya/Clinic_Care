const lab_appointment_book = require("../model/lab_test_booking")

const book_lab_test = async (req , res) => {
    const obj = req.user
    const {age , test_details} = req.body
    try {
        
        if(obj.roleId!=1){
            console.log("Invalid user")
            return res.status(200).json({messsage : "Only Patients are allowed to access"})
        }

        const lab_test = new lab_appointment_book({
            patient_name : obj.name,
            age : age,
            test_details : test_details,
            approved : false
        }) 

        await lab_test.save()

        console.log(`Appointment created:\n ${lab_test}`);
        console.log(`Appointment created with id : ${lab_test._id}`)

        return res.status(200).json({ message: "Appointment Created Successfully", lab_test });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

module.exports = {
    book_lab_test
}