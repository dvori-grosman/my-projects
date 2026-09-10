
import mongoose from "mongoose";

const CitySchema=new mongoose.Schema({
  nameCity:{
    String
  },
  arrApartment:{
    type:[{
        type: mongoose.Types.ObjectId,
        ref:'Apartment'
    }],
  
}})
export default mongoose.model('City',CitySchema)