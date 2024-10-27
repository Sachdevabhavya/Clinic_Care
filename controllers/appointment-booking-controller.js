const book_appointment = require("../model/appointment_booking");
const doctors_list = require("../model/doctor_login")


//get all appointments
const getAllAppointments = async (req, res) => {
  const obj = req.user; // User object populated from your authentication middleware
  console.log("User Object:", obj); // Log the user object to check the role

  try {
      // Check if the user is a doctor (adjust the role ID as needed)
      if (obj.roleId !== 2) { // Ensure you use the correct property
          console.log("Invalid user");
          return res.status(403).json({ message: "Only Doctors are allowed to access" }); // Use 403 for unauthorized
      }

      const appointments = await book_appointment.find({ doctor_id: obj.id });

      if (!appointments.length) {
          return res.render('get_all_appointments', {
              token: req.params.token,
              appointments: [],
              user: obj.name,
              message: "No Appointments Found" // Pass this message to display
          });
      }

      console.log(`Appointments : \n${appointments}`);
      return res.render('get_all_appointments', {
          token: req.params.token,
          appointments,
          user: obj.name
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
  }
};


//create appointment
const createAppointment = async (req, res) => {
  const { age, description, home_address } = req.body;
  
  const doctor_id = req.params.doctor_id;
  const token = req.params.token;

  console.log("Request Body:", req.body);


  try {
    const obj = req.user; 
    if (obj.roleId != 1) {
      console.log("Invalid user");
      return res.status(200).json({ message: "Only Patients are allowed to access" });
    }
  
    if (!age || !description || !home_address) {
      console.log("Missing fields:", {
        age: !!age,
        description: !!description,
        home_address: !!home_address,
      });
      return res.status(400).json({ message: "All fields must be provided." });
    }  
    
    const newAppointment = new book_appointment({
      doctor_id: doctor_id,
      patient_name: obj.name,
      age,
      email : obj.email,
      description,
      phone_no: obj.phone_no,
      home_address,
      approved: false,
    });

    const savedAppointment = await newAppointment.save();
    console.log(`Appointment created:\n ${savedAppointment}`);
    console.log(`Appointment created with id : ${savedAppointment._id}`);

    // Redirect to the dashboard
    return res.redirect(`/main/patient_login/${token}/dashboard`);
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