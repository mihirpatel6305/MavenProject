const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    specialization: {
      type: String,
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
    visitingFees:{
        type:Number,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Doctor", doctorSchema);
