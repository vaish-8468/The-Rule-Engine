const mongo= require('mongoose');


const connectDB= (URL) => {
    return mongo
        .connect(URL)
        .catch((err)=> console.log(err));
}

module.exports= connectDB;




