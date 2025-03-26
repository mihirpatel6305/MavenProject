const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/HP/Desktop/Mavenpro1/image');
  },
  filename:(req, file, cb) => {
      let randNumber = Math.random().toString(9).substring(2, 7);
      let fileData = file.originalname.split(".");
      let extension = fileData[fileData.length - 1];
      cb(null, Date.now() + randNumber + "." + extension);
    },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});


module.exports=upload;