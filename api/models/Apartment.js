import mongoose from "mongoose";

const ApartmentSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    codeCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'Categories',
        require:true
    },
    codeCity: {
        type: mongoose.Types.ObjectId,
        ref: 'City',
        require:true
    },
    adress: {
        type: String
    },
    numBeds: {
        type: Number
    },
    more:{
        type:String
    },
    price:{
        type:Number
    },
    codeAdverticer:{
        type:  mongoose.Types.ObjectId,
        ref: 'Advertiser',
        require:true
    }

})
export default mongoose.model('Apartment',ApartmentSchema)