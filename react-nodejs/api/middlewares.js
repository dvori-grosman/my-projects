import jwt from 'jsonwebtoken'
import getCity from './controllers/City.js'
import { getAll } from './controllers/Category.js'
import City from './models/City.js'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config()

//בדיקת אימות
export const checkAuth = (req, res, next) => {    
    if (!req.headers.authorization)
        res.status(401).send("Aouthoration field")
    const token = req.headers.authorization.split(' ')[1]
    if (!token){
        res.status(401).send("Aouthoration field")
    }
    jwt.verify(token,  process.env.SECRET, (error, decoded) => {
        console.log(process.env.SECRET);
        if (error || !decoded)
            res.status(401).send("Aouthoration field")
        else
            next()
    })
}
//------------------------קשרי גומלין----------------------
export const checkCodeExsist=(req,res,next)=>{
const {codeCity,codeCategory}=req.params
let c=City.find().where({ _id: { $eq:codeCity } })
if(c.length==0)
   return res.status(404).send("not found!!!!")
next()
}

//-------------------העלאת תמונה------------------
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    cb(null, false)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})


export const upload= multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter
})
