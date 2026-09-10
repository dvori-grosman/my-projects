import Apartment from '../models/Apartment.js'
import Category from '../models/Category.js'
import City from '../models/City.js'
import Advertiser from '../models/Advertiser.js'


//•	בכל שליפת דירה – יש לשלוף גם את שם הקטגוריה, שם העיר, ופרטי ההתקשרות עם המפרסם (אימייל וטלפונים...)
//---------------------שליפות--------------------------
//שליפת כל הדירות
export const getAll = (req, res) => {
    Apartment.find().populate({ path: 'codeCategory', select: '-_id nameCategory' })
        .populate({ path: 'codeCity', select: '-_id nameCity' },)
        .populate({ path: 'codeAdverticer', select: 'name anotherPhone phone email' })
        .then(a => { res.status(200).send(a) })
        .catch(err => { res.status(500).send(err.message) })

}
//	שליפת דירה לפי קוד
export const getById = (req, res) => {
    Apartment.findById(req.params.id)
        .then(a => {
            if (!a)
                res.status(404).send("not found!")
            else
                res.status(200).send(a)
        })
        .catch(err => { res.status(500).send(err.message) })
}
//•	שליפת דירות לפי קוד קטגוריה
export const getByCodeCategory = (req, res) => {
    Apartment.find().where({ codeCategory: { $eq: req.params.codeCategory } })
        .then(a => {
            if (a.length == 0)
                res.status(404).send("not found!")
            else
                res.status(200).send(a)
        })
        .catch(err => { res.status(500).send(err.message) })
}
//•	שליפת דירות לפי קוד עיר
export const getByCodeCity = (req, res) => {
    Apartment.find().where({ codeCity: { $eq: req.params.codeCity } })
        .then(a => {
            if (a.length == 0)
                res.status(404).send("not found!")
            else
                res.status(200).send(a)
        })
        .catch(err => { res.status(500).send(err.message) })
}
//•	שליפת דירות לפי כמות מיטות 
export const getByCountBeds = (req, res) => {
    const { min, max } = req.params
    Apartment.find().where({
        $and: [
            { numBeds: { $gte: min } },
            { numBeds: { $lte: max } }
        ]
    })
        .then(a => {
            if (a.length == 0)
                res.status(404).send("not found!")
            else
                res.status(200).send(a)
        })
        .catch(err => { res.status(500).send(err.message) })
}
//•	שליפת דירות לפי מחיר

export const getByPrice = (req, res) => {
    const { min, max } = req.params
    Apartment.find().where({
        $and: [
            { price: { $gte: min } },
            { price: { $lte: max } }
        ]
    })
        .then(a => {
            if (a.length == 0)
                res.status(404).send("not found!")
            else
                res.status(200).send(a)
        })
        .catch(err => { res.status(500).send(err.message) })
}

//שליפת דירות לפי קוד מפרסם *
export const getByCodeAdvertiser = (req, res) => {
    Apartment.find().where({ codeAdverticer: { $eq: req.params.codeAdvertiser } })
        .then(a => {
            if (a.length == 0)
                res.status(404).send("not found!")
            else
                res.status(200).send(a)
        })
        .catch(err => { res.status(500).send(err.message) })
}

//יצירת דירה
export const create = (req, res) => {
       
    const {path:image}=req.file
    console.log(image);
    
    const { name,
             description,
              codeCategory,
               codeCity,
               adress,
               numBeds,
                more, price,
                 codeAdverticer } = req.body
    const newApp = new Apartment({ name, description, image: image.replace('\\', '/'), codeCategory, codeCity, adress, numBeds, more, price, codeAdverticer })
    newApp.save()
        .then(async a => {
            let x = await Category.findByIdAndUpdate(a.codeCategory, { $push: { arrApartment: a._id } }) //category.findByIdAndUpdate(apart.codeCategory, { $push: { apartments: apart._id } })
            if (!x) {
                return res.status(500).send({ message: `create apart ${a._id} succeed! update category failed!` })
            }
            let y = await City.findByIdAndUpdate(a.codeCity, { $push: { arrApartment: a._id } })
            if (!y) {
                return res.status(500).send({ message: `create apart ${a._id} succeed! update city failed!` })
            }
            let z = await Advertiser.findByIdAndUpdate(a.codeAdverticer, { $push: { arrApartment: a._id } })
            if (!z) {
                return res.status(500).send({ message: `create apart ${a._id} succeed! update person failed!` })
            }
            res.status(200).send(newApp)
        })
        .catch(err => {
            res.status(500).send(err.message)
        })
}
//	מחיקה
export const remove = (req, res) => {
    
    const { id, codeAdvertiser } = req.params
    let a = Apartment.find().where({ _id: { $eq: id } })
        .then(async ap => {
            const [app] = ap
            if (app.codeAdverticer != codeAdvertiser)
                return res.status(404).send("you cant remove")
            Apartment.findByIdAndDelete(app._id)
                .then(async a => {
                    let x = await Category.findByIdAndUpdate(app.codeCategory, { $pull: { arrApartment: app._id } })
                    if (!x) {
                         return res.status(500).send({ message: `create apart ${app._id} succeed! update category failed!` })
                    }
                    let y = await City.findByIdAndUpdate(app.codeCity, { $pull: { arrApartment: app._id } })
                    if (!y) {
                        return res.status(500).send({ message: `create apart ${app._id} succeed! update city failed!` })
                    }
                    let z = await Advertiser.findByIdAndUpdate(app.codeAdverticer, { $pull: { arrApartment: app._id } })
                    if (!z) {
                        return res.status(500).send({ message: `create apart ${app._id} succeed! update person failed!` })
                    }
                    res.status(200).send(a._id)

                })
                .catch(err => {
                    res.status(500).send(err.message)
                })
        })
        .catch(err => {
            res.status(500).send(err.message)
        })
}
//עדכון
export const update = (req, res) => {

    const { id, code } = req.params
    let a = Apartment.find().where({ _id: { $eq: id } })
        .then(ap => {
            const [aa] = ap
            if (!aa)
                return res.status(404).send("you cant update")
            if (aa.codeAdverticer != code)
                return res.status(404).send("you cant ")
            Apartment.findByIdAndUpdate(id, req.body, { new: true })
                .then(a => {
                    res.status(200).send(a)
                })
                .catch(e => {
                    console.log("aaa");

                    res.status(500).send(e.message)
                    
                })
        })
        .catch(e => {
            res.status(500).send(e.message)
            
        })
} 