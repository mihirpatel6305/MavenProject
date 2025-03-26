const Patient = require("./model");

const getAllPatient = async (req, res) => {
  try {
    const allPatient = await Patient.find();
    res
      .status(200)
      .json({ message: "patient retrieved successfully", data: allPatient });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!", error: err });
  }
};

const getOnePatient = async (req, res) => {
  try {
    const id = req?.params?.id;
    const patient = await Patient.findById(id)
    res
      .status(200)
      .json({ message: "patient retrieved successfully", data: patient });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!", error: err });
  }
};
const postPatient = async (req, res) => {
  try {
    const { name, age, doctorId, appointmentDate, email, password } = req?.body;
    const Path = req?.file?.path?.split('\\');
    console.log("req.file>>>>",req?.file);
    
    console.log(Path);
    
    const savePath=Path[Path.length - 1];
    const addPatient = new Patient({
      name,
      age,
      doctorId,
      appointmentDate,
      email,
      password,
      image: savePath,
      // createdBy: req.user._id,
    });
    // console.log('addPatient>>',addPatient);

    await addPatient.save();
    res
      .status(200)
      .json({ message: "patient posted successfully", data: addPatient });
  } catch (err) {
    // console.log(err);
    
    res.status(500).json({ message: "Something went wrong in add patient!", error: err });
  }
};
const editPatient = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await Patient.findByIdAndUpdate(
      id,
      { ...req?.body },
      { new: true }
    );
    await result.save();
    res
      .status(200)
      .json({ message: "patient edited successfully", data: result });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!", error: err });
  }
};
const deletePatient = async (req, res) => {
  try {
    const id = req?.params?.id;
    const patient = await Patient.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "patient deleted successfully", data: patient });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!", error: err });
  }
};
module.exports = {
  getAllPatient,
  getOnePatient,
  postPatient,
  editPatient,
  deletePatient,
};
