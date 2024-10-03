const book_appointment = require("../model/appointment_booking");
const doctors_list = require("../model/doctor_login")


//get all appointments
const getAllAppointments = async (req, res) => {
  const loginId = req.params.loginId
  try {

    const check_login = await doctors_list.findById(loginId)

    if(!check_login){
      return res.status(404).json({
        status: "failed",
        message: "Login ID not found",
      });
    }

    const appointments = await book_appointment.find();

    if (!appointments.length) {
      return res.status(404).json({ message: "No Appointments Found" });
    }

    console.log(`Appointments : \n${appointments}`);

    return res.status(200).json({ appointments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

//create appointment
const createAppointment = async (req, res) => {
  const { patient_name, age, description, phone_no, home_address , approved} = req.body;
  const obj = req.user
  console.log("Token",obj)
  console.log("Request Body:", req.body);

  if(obj.roleId != 1){
    console.log("Invalid user")
    return res.status(200).json({messsage : "Only Patients are allowed to access"})
  }

  if ( !age || !description || !home_address) {
    console.log("Missing fields:", {
      age: !!age,
      description: !!description,
      home_address: !!home_address,
    });
    return res.status(400).json({ message: "All fields must be provided." });
  }

  try {
    const newAppointment = new book_appointment({
      patient_name : obj.name,
      age,
      description,
      phone_no : obj.phone_no,
      home_address,
      approved : false
    });

    const savedAppointment = await newAppointment.save();

    console.log(`Appointment created:\n ${savedAppointment}`);
    console.log(`Appointment created with id : ${savedAppointment._id}`)

    return res.status(200).json({ message: "Appointment Created Successfully", appointment: savedAppointment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


//get appointment by id
const getAppointmentById = async (req, res) => {
  const appointmentId = req.params.appointmentId;
  console.log("Received Appointment ID:", appointmentId);
  try {
    const appointment = await book_appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment Not Found" });
    }

    return res.status(200).json({ appointment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment
}