const express=require('express');
const router=express.Router();
const {getAllDoctor,getOneDoctor,postDoctor,editDoctor,deleteDoctor}=require('./contoller');

router.route('/:id').get(getOneDoctor).put(editDoctor).delete(deleteDoctor);
router.route('/').get(getAllDoctor).post(postDoctor);
module.exports=router;