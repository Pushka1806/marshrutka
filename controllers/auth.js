const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/User_driver')
const keys = require("../config/keys");

module.exports.login = async function (req, res){
    const candidate = await User.findOne({"_id.login": req.body.login})
    if(candidate){
        //нашли - проверяем пароль
        concole.log("Пароль", candidate.routeID);
        const passwordResult = bcrypt.compareSync(req.body.password, candidate._id.password);
        if(passwordResult){
            //гененируем токен, т.к. пароль правильный
            //const token = jsonwebtoken.sign({
            //    login: candidate.login,
            //    userid: candidate._id
            //}, keys.jwt, {expiresIn: 60 * 60})
            res.status(200).json({
                message: "OK"
                })
        }else{
            //пароли не совпали
            res.status(401).json({
                message: "Неверный пароль. Попробуйте снова."
            })
        }
    } else{
        //если не нашли пользователя
        res.status(404).json({
            message: "No"
        })
    }
}

module.exports.register = async function (req, res){
    //нам придут email и password
    //нужно отслеживать уникальность email
    const candidate = await  User.findOne({email: req.body.email});

    if(candidate){
        //если нашли уже сущ. пользователя - вернем ошибку
        res.status(409).json({
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
