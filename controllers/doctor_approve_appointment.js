const appointment_approve = require("../model/appointment_booking")

const approve_app = async (req , res) => {
    const {approved} = req.body
    const {appointment_id} = req.params
    const obj = req.user
    console.log("Token",obj)

    try {
        
         if(obj.roleId != 2){
            console.log("Invalid user")
            return res.status(200).json({messsage : "Only Doctors are allowed to access"})
          }
        
          if (approved === undefined) {
            console.log("Missing fields:", {
              approved : !!approved
            });
            return res.status(400).json({ message: "All fields must be provided." });
          }

          const updated_appointment = await appointment_approve.findByIdAndUpdate(
            appointment_id,
            { approved: approved },
            { new: true }
        );

        if (!updated_appointment) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        console.log("Updated data", updated_appointment);
        return res.status(200).json({ message: "Appointment status updated successfully.", updated_appointment });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    approve_app
}