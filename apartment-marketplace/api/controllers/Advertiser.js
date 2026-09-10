
import Advertiser from "../models/Advertiser.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()
//קבלת כל המפרסמים
export const getAll = (req, res) => {
    Advertiser.find()
        .then(
            data => { res.status(200).send(data) }
        )
        .catch(
            error => {
                res.status(500).send(error.message)
            }
        )
}

//  התחברות

// export const login = (req, res) => {
//     const {name, email, password, phone, anotherPhone } = req.body
//     Advertiser.find()
//         .where({ email: { $eq: email } })
//         .then(async Add => {
//             if (Add.length == 0) {
//                 return res.status(404).send(`email and password are not match`)
//             }
//             let [add] = Add
//             bcrypt.compare(password, add.password,  async( error, result) => {
//                 if (error || !result) {
//                     console.log("err");
//                     return res.status(500).send({ error: 'Email and password are not matches!' })
//                 }
//                 if (add.password !== password) {
//                     return res.status(404).send(`password are not match!`)
//                 }
//                 const token = await jwt.sign(
//                     { email, password, phone, anotherPhone }, process.env.SECRET
//                 )
//                 res.status(200).send({ add, token })
//             })
      
//         })
//         .catch(err => {
//             console.log("sof");
//             res.status(500).send(err.message)
            
//         })
// }
export const login= async (req, res) => {
    const { email, password } = req.body;

    try {
        const add = await Advertiser.findOne({ email: email });
        if (!add) {
            console.log('email not found!');
            return res.status(404).send({ error: `email and password are not match!` });
        }

        const isMatch = await bcrypt.compare(password, add.password);
        if (!isMatch) {
            console.log('password is not match!');
            return res.status(404).send({ error: `email and password are not match!` });
        }

        const token = await jwt.sign(
            { email: add.email },
            process.env.SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).send({ add, token });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

//הרשמה,
// export const signIn1 =(req, res) => {
//     const {name, email, password, phone, anotherPhone } = req.body

//     let newAdd = "";
//     Advertiser.find()
//         .where({ email: { $eq: email } })
//         .then(Add => {
//             if (Add.length > 0) {
//                 return res.status(409).send({ message: 'Email is already exists' })
//             }
//             bcrypt.hash(password, 10, (error, hash) => {
//                 if (error) {
//                     return res.status(500).send({ error: error.message })
//                 }
//                 const  newAdd =new Advertiser({
//                     name,  email, password, phone, anotherPhone
//                 })
//                 return  newAdd.save()
//             })
//         })
//         .then(() => {
//             res.status(200).send('Wellcome to our application!')
//         })
//         .catch(error => {
//             res.status(404).send({ error: error.message })
//         })
// }


export const signIn =(req, res) => {
    const {name, email, password, phone, anotherPhone } = req.body

    if (!password) {
        return res.status(400).send({ error: 'Password is required' });
    }

    Advertiser.find()
        .where({ email: { $eq: email } })
        .then(advertiser => {
            if (advertiser.length > 0) {
                return res.status(400).send({ error: 'email exists' });
            }

            // יצירת סוללה והצפנת הסיסמה
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return res.status(500).send({ error: err.message });
                }
                bcrypt.hash(password, salt, (err, hashedPassword) => {
                    if (err) {
                        return res.status(500).send({ error: err.message });
                    }
                    const newAdvertiser = new Advertiser({
                      name, email, password:hashedPassword, phone, anotherPhone 
                    });
                    newAdvertiser.save()
                        .then(async add => {
                            const token = await jwt.sign({
                                email, phone: add.phone, anotherPhone: add.anotherPhone
                            }, process.env.SECRET, {
                                expiresIn: '1h', // hours
                            });
                            res.status(200).send({ add, token });
                        })
                        .catch(err => {
                            res.status(500).send({ error: err.message });
                        });
                });
            });
        });
}






