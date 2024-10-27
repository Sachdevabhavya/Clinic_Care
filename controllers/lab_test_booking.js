const lab_appointment_book = require("../model/lab_test_booking")

const book_lab_test = async (req , res) => {
    const obj = req.user
    const token = req.params.token
    const doctor_id = req.params.doctor_id;
    const {age , test_name} = req.body
    try {
        
        if(obj.roleId!=1){
            console.log("Invalid user")
            return res.status(200).json({messsage : "Only Patients are allowed to access"})
        }

        const lab_test = new lab_appointment_book({
            doctor_id : doctor_id,
            patient_name : obj.name,
            age : age,
            email : obj.email,
            test_name : test_name,
            approved : false
        }) 

        await lab_test.save()

        console.log(`Lab Appointment created:\n ${lab_test}`);
        console.log(`Lab Appointment created with id : ${lab_test._id}`)

        return res.redirect(`/main/patient_login/${token}/dashboard`);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

const getAllAppointments = async (req, res) => {
    const obj = req.user; 
    console.log("User Object:", obj); 
  
    try {
        if (obj.roleId !== 2) { 
            console.log("Invalid user");
            return res.status(403).json({ message: "Only Doctors are allowed to access" }); 
        }
  
        const lab_appointments = await lab_appointment_book.find({ doctor_id: obj.id });
  
        if (!lab_appointments.length) {
            return res.render('get_all_lab_appointments', {
                token: req.params.token,
                lab_appointments: [],
                user: obj.name,
                message: "No Appointments Found" // Pass this message to display
            });
        }
  
        console.log(`Lab Appointments : \n${lab_appointments}`);
        return res.render('get_all_lab_appointments', {
            token: req.params.token,
            lab_appointments,
            user: obj.name
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
  };

module.exports = {
    book_lab_test,
    getAllAppointments
}