 import mongoose from "mongoose";

const SchemaAdvertiser=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        require:true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password:{
        type:String,
        require:true,
    }, 
    phone:{
        type:String,
        match:/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
        require:true

    },
    anotherPhone:{
        type:String,
        match:/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

    },
    arrApartment:{
        type:[{
            type: mongoose.Types.ObjectId,
            ref:'Apartment'
        }],
      
    }

})
export default mongoose.model('Advertiser',SchemaAdvertiser)