const Hospital = require("./model");
const Doctor = require("../Doctor/model");

const getAllHospital = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res
      .status(200)
      .json({ message: "hospital retrieved successfully", data: hospitals });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong to get all Hospital!", error: err });
  }
};
const getOneHospital = async (req, res) => {
  try {
    const id = req?.params?.id;
    const hospital = await Hospital.findById(id);
    res
      .status(200)
      .json({ message: "hospital retrieved successfully", data: hospital });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!", error: err });
  }
};
const postHospital = async (req, res) => {
  try {
    const { name, location, doctors } = req?.body;
    const addhospital = new Hospital({ name, location, doctors });
    await addhospital.save();
    res
      .status(200)
      .json({ message: "hospital posted successfully", data: addhospital });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error: error });
  }
};
const editHospital = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await Hospital.findByIdAndUpdate(id, req?.body, {
      new: true,
    });
    await result.save();
    res
      .status(200)
      .json({ message: "hospital edited successfully", data: result });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong in edit hospital!", error: err });
  }
};
const deleteHospital = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await Hospital.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "hospital deleted successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error: err });
  }
};

const getAllDoctor = async(req,res)=>{
    const hospitalId=req?.params?.id;
    const drs=await Doctor.find({hospitalId:hospitalId});
    res.send({message:"doctors fetch successfully",result:drs});
}

module.exports = {
  getAllHospital,
  postHospital,
  getOneHospital,
  editHospital,
  deleteHospital,
  getAllDoctor
};
