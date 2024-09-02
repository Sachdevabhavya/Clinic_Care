const labrecordscollection = require("../model/labtestrecords");

const sendrecords = async (req, res) => {
    const { patient_name, age, test_results } = req.body;

    console.log("Request Body:", req.body);

    if (!patient_name || !age || !test_results) {
        return res.status(400).json({ message: "All fields must be provided" });
    }

    try {
        const labrecords = new labrecordscollection({
            patient_name,
            age,
            test_results
        });

        const saverecords = await labrecords.save();
        console.log(`Lab Record created successfully: ${saverecords}`);
        console.log(`Lab Record created with id: ${saverecords._id}`);
        return res.status(201).json({ message: "Record created successfully", record: saverecords });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    sendrecords
};
