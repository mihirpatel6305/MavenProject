const express = require("express");
const router = express.Router();
const {
  getAllPatient,
  getOnePatient,
  postPatient,
  editPatient,
  deletePatient,
} = require("./controller");
const upload = require("./services");
const { auth } = require("../middlewares/auth");

// router.use(auth)
router.route("/:id").get(auth,getOnePatient).put(auth,editPatient).delete(deletePatient);
router
  .route("/")
  .get(getAllPatient)
  .post(upload.single("image"), postPatient);

module.exports = router;
