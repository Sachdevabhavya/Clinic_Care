const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
    {
        medicine_name: {
            type: String,
            required: true
        },
        dosage: {
            type: Number,
            required: true
        },
        description: {
            type: String
        }
    }
);

const medicalRecordsSchema = new mongoose.Schema(
    {
        patient_name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
        },
        medicines: [medicineSchema]
    },
    { timestamps: true }
);

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordsSchema);

module.exports = MedicalRecord;
