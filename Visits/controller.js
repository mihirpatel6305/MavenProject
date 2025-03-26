const Visit=require('./model');
const Patient=require('../Patient/model');
const Doctor=require('../Doctor/model');

const getAllVisit = async (req, res) => {
  try {
    const allvisits = await Visit.find().populate([{path: "hospital",select:"name"},{path: "doctor",select:"name"},{path: "patient",select:"name"}]);
    res
      .status(200)
      .json({ message: "visits retrieved successfully", data: allvisits });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!", error: err });
  }
}


const getVisit=async(req,res)=>{
  try {
    const id = req?.params?.id;
    const visit = await Visit.findById(id).populate([{path: "hospital",select:"name"},{path: "doctor",select:"name"},{path: "patient",select:"name"}]);
    res
    .status(200)
    .json({ message: "visits retrieved successfully", data: visit });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error: error });
  }
}

const addVisit = async (req, res) => {
  try {
    const { hospital, doctor, patient,date, prescription} = req?.body;
    const addVisit = new Visit({
        hospital,
        doctor,
        patient,
        date,
        prescription
    });
    console.log("req.body>>>>",req?.body);
    console.log("addvisit>>",addVisit);
    await addVisit.save();
    res
      .status(200)
      .json({ message: "visit posted successfully", data: addVisit });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!", error: err });
  }
}

const editVisit = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await Visit.findByIdAndUpdate(id, {...req?.body}, {new: true});
    await result.save();
    res
      .status(200)
      .json({ message: "visit edited successfully", data: result });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!", error: err });
  }
}

const deleteVisit = async (req, res) => {
  try {
    const id = req?.params?.id;
    const visit = await Visit.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Visit deleted successfully", data: visit });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!", error: err });
  }
}

const getTotalFeesOfAPatient= async(req,res)=>{
    try {
      const patientId = req?.params?.id;
      const allvisitForAPatient=await Visit.find({patient:patientId}).populate([{path:'doctor',select:'visitingFees'},{path:'patient',select:'name'}]);
      const totalFees=allvisitForAPatient.reduce((accu,visit)=>{
        return accu = accu + visit?.doctor?.visitingFees;
      },0)
      res.send({result:totalFees});
    } catch (err) {
      res.status(500).send({message:"something went wrong in calculating fees of patient",error:err})
    }
}

const getVisitsForDoc = async(req,res)=>{
  try {
    const docId = req?.params?.id;
    const visitForDoc=await Visit.find({doctor:docId}).populate({path:'patient',select:'name'});
    res.send({result: visitForDoc});
  } catch (err) {
    res.status(500).send({message:"something went wrong in get visit for perticular Doctor",error:err})
  }
}

const getUniquePatientForHospital=async (req,res)=>{
    try {
      const hospitalId=req?.params?.id;
      const totalPatient=await Visit.find({hospital:hospitalId});
      const allId=totalPatient.map((visit)=>visit?.patient);
      const uniqueIdsSet=new Set(allId);
      const uniqueIdsArr=[...uniqueIdsSet];
      const Users = await Patient.find({_id:{$in:uniqueIdsArr}});
      res.send(Users);
    } catch (error) {
      res.send({message:'something went wront to get unique patient for hospital',error:error});
    }
}


module.exports={getAllVisit,addVisit,editVisit,deleteVisit,getTotalFeesOfAPatient,getVisitsForDoc,getUniquePatientForHospital,getVisit};