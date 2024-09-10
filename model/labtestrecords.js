const mongoose = require("mongoose");

const labtestSchema = new mongoose.Schema({
    test_name: {
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    results: {
        type: String,
        required: true
    },
    conclusion: {
        type: String, 
        required: true
    }
});

const labRecords = new mongoose.Schema({
    doctor_id : {
        type : String,
        required : true
    },

    doctor_name : {
        type : String,
        required : true
    },

    patient_name: {
        type: String, 
        required: true
    },
    age: {
        type: Number,
    },
    test_results: [labtestSchema]
}, {timestamps: true});

const LabTestRecordsCollection = mongoose.model("labrecords", labRecords);

module.exports = LabTestRecordsCollection;
