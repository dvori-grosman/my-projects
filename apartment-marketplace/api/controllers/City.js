import City from '../models/City.js'

//יצירת עיר
export const create = (req, res) => {
    const {nameCity,apartment}=req.body
    const newCity=new City({nameCity,apartment})
    newCity.save()
        .then(city => { res.status(200).send(newCity) })
        .catch(err => { res.status(500).send(err.message) })
}
//שליפת כל הערים
const getAll = (req, res) => {
    City.find()
        .then(city => { res.status(200).send(city) })
        .catch(err => { res.status(500).send(err.message) })
}
export default getAll;