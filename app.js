import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import advertiser from './api/routers/Advertiser.js'
import cityRouter from './api/routers/City.js'
import categoryRouter from './api/routers/Category.js'
import apartmentRouter from './api/routers/Apartment.js'
import dotenv from 'dotenv'
import { upload } from './api/middlewares.js'
// import carRouter from './api/routers/Advertiser.js'
// import Kind CarRouter from './api/routers/KindCar.js'

const app = express()
const port = 3005

dotenv.config()

app.use(bodyParser.json())
app.use(cors())
app.use(express.static("uploads"));

mongoose.connect(process.env.LOCAL_URI)
    .then(() => {
        console.log('connect to mongoDB! 👍😊');
    })
    .catch(err => {
        console.log({ error: err.message });
    }) 
app.use('/Advertiser',advertiser)
app.use('/City',cityRouter)
app.use('/Category',categoryRouter)
app.use('/Apartment',apartmentRouter)

// app.use('/Car', carRouter)
// app.use('/KindCar', KindCarRouter)

app.listen(port, () => {
    console.log(`my application is listening on http://localhost:${port}`);
})