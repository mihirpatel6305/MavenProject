const express=require('express');
const { getAllHospital,postHospital,getOneHospital,editHospital,deleteHospital,getAllDoctor } = require('./contoller');
const router=express.Router();
const { auth } = require("../middlewares/auth");

router.route('/alldrs/:id').get(getAllDoctor);
router.route('/:id').get(auth,getOneHospital).put(auth,editHospital).delete(deleteHospital);
router.route('/').get(getAllHospital).post(postHospital);
module.exports=router;