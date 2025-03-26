const express = require('express');
const connection = require('./connection');
const app = express();
const port=3000;
const URL="mongodb://localhost:27017/Hospital";
const bodyParser = require("body-parser")
const cors=require('cors');
const authRouter = require("./auth/route")
const hospitalRouter=require('./Hospital/route');
const doctorRouter=require('./Doctor/route');
const patientRouter=require('./Patient/route');
const visitRouter=require('./Visits/route');
const env=require('dotenv');

connection(URL);
env.config();
app.use(
  bodyParser.urlencoded({
      extended: true
  })
);
app.use(express.json());
app.use(express.static('C:/Users/HP/Desktop/Mavenpro1/image'));
app.use(cors());

app.use('/api/auth',authRouter);
app.use('/api/hospital',hospitalRouter);
app.use('/api/doctor',doctorRouter);
app.use('/api/patient',patientRouter);
app.use('/api/visit',visitRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });