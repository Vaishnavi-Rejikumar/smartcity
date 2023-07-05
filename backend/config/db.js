const mongoose = require('mongoose');

const connectDB= async ()=>{
    try{
        const conn = await mongoose.connect(
            "mongodb+srv://sandrapbinu13:4JJ4R37fQCXgW0by@cluster0.rvhcsat.mongodb.net/",
            {useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
    console.log(`Mongo DB connected ${conn.connection.host}`);
    }catch(err){
        console.error(err);
        process.exit(1);
    }
}




module.exports=connectDB;
