const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    appointmentDate: {
      type: Date,
    },
    image: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient"
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Patient", patientSchema);
