const jwt = require("jsonwebtoken");
const { rawListeners } = require("../Patient/model");

exports.auth = (req, res, next) => {
    try {
        const key = process.env.PRIVATE_KEY;
        const token = req.headers.authorization;
        if (!token) {
          res.status(401).send({
            message: "Please Login",
          });
        }
        const data = jwt.verify(token, key);
        req.user = data.user;
        next();
    } catch (error) {
        res.send({message:"something is wrong in authentication",error:error});
    }
};
