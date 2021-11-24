const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/User_driver')
const keys = require("../config/keys");

module.exports.login = async function (req, res){
    const candidate = await User.findOne({"_id.login": req.body.login})
    if(candidate){
        //нашли - проверяем пароль
     
//         const passwordResult = bcrypt.compareSync(req.body.login, candidate._id.login);
//         passwordResylt = alert(req.body.login, candidate._id.login);
        if(req.body.password == candidate._id.password || candidate.flag == 1 ){
            //гененируем токен, т.к. пароль правильный
            //const token = jsonwebtoken.sign({
            //    login: candidate.login,
            //    userid: candidate._id
            //}, keys.jwt, {expiresIn: 60 * 60})
            if(candidate.flag == 0){
                 candidate.flag = 1;
                 candidate.save();
                res.status(200).json({
                message: "Введите новый пароль"
                })
            }
            else if(candidate.flag == 1){
                if(candidate._id.password != req.body.password){
                     candidate.flag = 2;
                     candidate._id.password = req.body.password;
                     candidate.save();
                    res.status(200).json({
                        message:"OK"})
//                     message: "Пароль изменён"})
                }
                else{
                    res.status(201).json({
                        message: "Это старый пароль"
                     })
                }
            }
            else{    
                res.status(200).json({
                    message: "OK"
                })
            }
        }
        else{
            //пароли не совпали
            res.status(201).json({
                message: "Неверный пароль"
            })
        }
    } else{
        //если не нашли пользователя
        res.status(201).json({
            message: "Пользователь не найден"
        })
    }
}

module.exports.register = async function (req, res){
    //нам придут email и password
    //нужно отслеживать уникальность email
    const candidate = await  User.findOne({email: req.body.email});

    if(candidate){
        //если нашли уже сущ. пользователя - вернем ошибку
        res.status(201).json({
            message: 'Пользователь с таким email уже зарегестрирован.'
        })
    } else{
        //если он новый, то создаем его
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch (e){
            //Обработать ошибку
            console.log(e);
        }

    }
}
module.exports.getInfo = async function (req, res){
    const candidate = await User.findOne({"_id.login": req.query.login})
    if(candidate){
        res.status(200).json(candidate);
    }
    else{
        res.status(201).json("Водитель не найден");
    }
        
}
