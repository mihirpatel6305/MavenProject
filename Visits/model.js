const mongoose = require("mongoose");

const visitSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
    },
    date:{
        type:Date,
    },
    prescription :{
        type:String,
    },
});
module.exports = mongoose.model("Visit", visitSchema);
