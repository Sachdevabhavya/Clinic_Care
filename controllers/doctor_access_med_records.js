const med_records_model = require("../model/medicalrecords")
const patients = require("../model/user_login")
const schedule = require("node-schedule")

const doctor_request_med_records = async (req, res) => {
    const obj = req.user 
    const patient_id = req.params.patient_id 

    try {

        if (obj.roleId !== 2) {
            console.log("Invalid user")
            return res.status(403).json({ message: "Only Doctors are allowed to request access" })
        }

        const patient = await patients.findOne({ _id: patient_id })

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" })
        }

        const p_med_records = await med_records_model.findOne({ patient_name: patient.name, doctor_id: obj.id })

        if (!p_med_records) {
            return res.status(404).json({ message: "Medical records not found for this patient" })
        }

        if (p_med_records.d_view_status === false && obj.id == p_med_records.doctor_id) {
            console.log(`Doctor ${obj.id} is requesting access to ${patient.name}'s records.`)

            await p_med_records.updateOne({ _id: p_med_records._id }, { d_view_status: true })
            console.log(`Access granted to ${patient.name}'s medical records for doctor ${obj.id}`)

            res.status(200).json({ message: `Access granted to ${patient.name}'s medical records. You have 5 minutes to view.` })

            const time = new Date(Date.now() + 5 * 60 * 1000) 

            const job = schedule.scheduleJob(time, async () => {
                try {
                    await p_med_records.updateOne({ _id: p_med_records._id }, { d_view_status: false })
                    console.log(`Access to ${patient.name}'s medical records has been revoked.`)
                } catch (error) {
                    console.log("Error revoking access:", error)
                }
            })
        } else {
            res.status(200).json({ message: `You currently have access to ${patient.name}'s medical records for a limited time.` })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error" });
    }
}


module.exports = {
    doctor_request_med_records
}