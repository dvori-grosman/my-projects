import Categories from '../models/Category.js'

//שליפת כל הקטגוריות
export const getAll = (req, res) => {
    Categories.find()
        .then(c => { res.status(200).send(c) })
        .catch(err => { res.status(500).send(err.message) })
}
//יצירת קטגוריה
export const create = (req, res) => {
    const {nameCategory}=req.body
    const newCategories=new Categories({nameCategory,})    
    newCategories.save()
        .then(c => { res.status(200).send(newCategories) })
        .catch(err => { res.status(500).send(err.message)            
         })
}