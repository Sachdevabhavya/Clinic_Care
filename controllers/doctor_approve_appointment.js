const appointment_approve = require("../model/appointment_booking")
const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")
const path = require('path')
require("dotenv").config()

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.SEND_EMAILID,
        pass : process.env.SEND_EMAILID_PASSWORD,
    }
})

const handlebarOptions = {
  viewEngine: {
      partialsDir: path.resolve('./templates/'),
      defaultLayout: false,
  },
  viewPath: path.resolve('./templates/'),
};

transporter.use('compile', hbs(handlebarOptions))


const approve_app = async (req, res) => {
  const { approved } = req.body;
  const { appointment_id } = req.params;
  const obj = req.user;

  try {
      if (obj.roleId != 2) {
          console.log("Invalid user");
          return res.status(403).json({ message: "Only Doctors are allowed to access" });
      }

      if (approved === undefined) {
          console.log("Missing fields:", {
              approved: !!approved
          });
          return res.status(400).json({ message: "All fields must be provided." });
      }

      const updated_appointment = await appointment_approve.findByIdAndUpdate(
          appointment_id,
          { approved: approved },
          { new: true }
      );

      if (!updated_appointment) {
          console.log("Appointment not found");
          return res.status(404).json({ message: "Appointment not found." });
      }

      console.log("Updated data", updated_appointment);

      const mailOptions = {
        from: process.env.SEND_EMAILID,
        template: "appointment_approval",
        to: updated_appointment.email,
        subject: "Appointment Approved",
        context: {
                patient_name: updated_appointment.patient_name,
                appointment_date: updated_appointment.appointment_date,  // assuming you have this field
                appointment_description: updated_appointment.description,
                doctor_name: obj.name,  // Assuming doctor name is stored in the req.user object
                doctor_phone: obj.phone_no   
        }
    };

    transporter.sendMail(mailOptions, function (err) {
      if (err) {
          console.log(err);
          return res.status(500).json({ message: "Failed to send email" });
      } else {
          console.log(`Email Sent`);
          return res.status(200).json({ message: "Appointment approved and email sent successfully" });
      }
  });
  

      // Return 200 status code on success
      return res.status(200)
  } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
    approve_app
}