const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
    {
        medicine_name: {
            type: String,
            required: true
        },
        dosage: {
            type: String,
            required: true
        },
        description: {
            type: String
        }
    }
);

const symptomSchema = new mongoose.Schema(
    {
        diagnosis: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        cause: {
            type: String,
            required: true
        }
    }
);

const medicalRecordsSchema = new mongoose.Schema(
    {
        doctor_id: {
            type: String,
            required: true
        },
        patient_name: {
            type: String,
            required: true
        },
        age: {
            type: Number
        },
        medicines: [medicineSchema],
        symptoms: [symptomSchema], 
        d_view_status: {
            type: Boolean,
            required: true
        }
    },
    { timestamps: true }
);

// Create the model
const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordsSchema);

module.exports = MedicalRecord;
