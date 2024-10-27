const appointment_approve = require("../model/lab_test_booking");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require('path');
require("dotenv").config();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SEND_EMAILID,
        pass: process.env.SEND_EMAILID_PASSWORD,
    }
});

// Set up handlebars as the templating engine for emails
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./templates/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./templates/'),
};

transporter.use('compile', hbs(handlebarOptions));

const approve_lab_app = async (req, res) => {
    const { approved } = req.body; // Get approved status from request body
    const { lab_appointment_id } = req.params; // Get appointment ID from route parameters
    const obj = req.user; // Assuming req.user contains the logged-in doctor's details

    console.log("Received lab_appointment_id:", lab_appointment_id); // Debugging output
    console.log("Approved status:", approved); // Debugging output

    try {
        // Check if user has the correct role
        if (obj.roleId != 2) {
            console.log("Invalid user role");
            return res.status(403).json({ message: "Only Doctors are allowed to access" });
        }

        // Validate required fields
        if (approved === undefined) {
            return res.status(400).json({ message: "All fields must be provided." });
        }

        // Find the lab appointment by ID and update the approved status
        const updated_appointment = await appointment_approve.findByIdAndUpdate(
            lab_appointment_id,
            { approved },
            { new: true }
        );

        // Check if appointment was found and updated
        if (!updated_appointment) {
            console.log("Appointment not found:", lab_appointment_id);
            return res.status(404).json({ message: "Appointment not found." });
        }

        console.log("Updated appointment:", updated_appointment);

        // Set up email options with appointment and doctor details
        const mailOptions = {
            from: process.env.SEND_EMAILID,
            template: "lab_appointment_approval", // Template in ./templates folder
            to: updated_appointment.email, // Assuming patient's email is stored in appointment record
            subject: "Lab Appointment Approved",
            context: {
                patient_name: updated_appointment.patient_name,
                lab_test_name: updated_appointment.test_name,
                lab_phone: obj.phone_no   // Assuming lab's phone number is in req.user
            }
        };

        // Send email notification
        transporter.sendMail(mailOptions, function (err) {
            if (err) {
                console.log("Error sending email:", err);
                return res.status(500).json({ message: "Failed to send email" });
            } else {
                console.log("Email sent successfully");
                return res.status(200).json({ message: "Appointment approved and email sent successfully" });
            }
        });

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    approve_lab_app
};
