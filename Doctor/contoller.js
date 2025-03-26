const Doctor = require("./model");

const getAllDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.find().populate("hospitalId");
    res
      .status(200)
      .json({ message: "Doctor retrieved successfully", data: doctor });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!", error: err });
  }
};
const getOneDoctor = async (req, res) => {
  try {
    const id = req?.params?.id;
    const doctor = await Doctor.findById(id).populate("hospitalId");
    res.status(200).send({
      message: "Doctor retrieved successfully",
      data: doctor,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!", error: err });
  }
};
const postDoctor = async (req, res) => {
  try {
    const { name, specialization, hospitalId ,visitingFees} = req?.body;
    const addDoctor = new Doctor({ name, specialization, hospitalId,visitingFees });
    await addDoctor.save();
    res.status(200).send({
      message: "Doctor posted successfully",
      data: addDoctor,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!", error: err });
  }
};
const editDoctor = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await Doctor.findByIdAndUpdate(id, req?.body, { new: true });
    await result.save();
    res.status(200).send({
      message: "Doctor edited successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error: err });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await Doctor.findByIdAndDelete(id);
    res.status(200).send({
      message: "Doctor deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error: err });
  }
};
module.exports = {
  getAllDoctor,
  getOneDoctor,
  postDoctor,
  editDoctor,
  deleteDoctor,
};
