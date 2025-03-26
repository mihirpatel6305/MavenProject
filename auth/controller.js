const Patient = require("../Patient/model")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    const key = process.env.PRIVATE_KEY
    try {
        const {email, password} = req.body;
        const patientData = await Patient.findOne({email});
        if(!patientData) {
          res.status(404).send({
            message: "patient not found",
          });
        }
        if(patientData?.password === password) 
        {
            const payload = {user: patientData}
            const token = jwt.sign(payload, key, {expiresIn: "1d"})
            res.status(200).send({
                message: "Logged In Successfully",
                data: {patientData, token},
              });
        } else {
            res.status(401).send({
                message: "Password Incorrect",
                // data: result,
            });
        }
        
      } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong in loged In!", error: err });
      }
}

module.exports = {login};