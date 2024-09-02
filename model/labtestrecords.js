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
