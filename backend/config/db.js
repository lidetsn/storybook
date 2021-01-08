const mongoose=require("mongoose")

const connectDb=async ()=>{

    try {
        const con=await  mongoose.connect(process.env.MONGO_URI_LOCAL,{ useNewUrlParser: true, useUnifiedTopology: true  })
               
                console.log("mongo db connected successfuly")
           
               }

        
     catch (error) {
        console.log(error)
        
    }
}
module.exports=connectDb
       