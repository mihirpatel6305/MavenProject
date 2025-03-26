const express=require('express');
const router=express.Router();
const {getAllVisit,addVisit,getVisit,editVisit,deleteVisit,getTotalFeesOfAPatient,getVisitsForDoc,getUniquePatientForHospital}=require('./controller');

router.route('/').get(getAllVisit).post(addVisit);
router.route('/:id').get(getVisit).put(editVisit).delete(deleteVisit);
router.route('/totalFees/:id').get(getTotalFeesOfAPatient);
router.route('/totalvisit/:id').get(getVisitsForDoc);
router.route('/totalpatient/:id').get(getUniquePatientForHospital);


module.exports=router;