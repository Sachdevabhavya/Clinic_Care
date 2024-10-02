const mongoose = require("mongoose")

const lab_tests = new mongoose.Schema(
    {
        test_name : {
            type : String,
            required : true
        },

        test_details : {
            type : String,
            required : true
        }
    },
    {timestamps : true}
)

const lab_test_collection = new mongoose.model("labTest", lab_tests)
module.exports = lab_test_collection