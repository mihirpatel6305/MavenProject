const mongoose=require('mongoose');
const connection=(URL)=>{
    try {
        mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("mongodb is connected")
    } catch (err) {
        console.log("err>>",err);
    }
}
module.exports=connection