const User = require('../models/User_passenger');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAll = async function (req, res){

}

/*модуль для создания запроса.
*Стоит учесть, что пользователь создающий запрос может уже существовать в БД и его можно найти по _id
*В этом случае нам следует просто обновить поля объекта этого пользователя.
*Иначе мы создаем нового пользователя И!!! возвращаем обратно его уникальный _id*/
module.exports.create = async function (req, res){
    //если бывалый (существующий), то найдем и обновим поля
    if(req.body._id !== "404") {
	const user_id = ObjectId(req.body._id);
        const candidate = await User.findByIdAndUpdate(
           user_id,
            {
                start: req.body.start,
                stop: req.body.stop,
                routeID: req.body.routeID,
                waitAuto: true,
            });
	console.log(candidate);
        //мы вроде как нашли пользователя и изменили его данные. пробуем сохранить.
        try{
            await candidate.save();
	    res.json({
		"message": "Ваша заявка принята"});
        } catch (e) {
            //если сохранить всё же не удалось, вернём сообщение с ошибкой) мдя...
            res.json({
                "message": "Ошибка обработки заявки. Попробуйте снова",
            });
            console.log(e);
        }
        //res.json(candidate);
    } else {
        //иначе добавим в БД нового пользователя
        //await User.init();
        const newUser = new User({
            _id: require('mongoose').Types.ObjectId(),
            start: req.body.start,
            stop: req.body.stop,
            routeID: req.body.routeID,
            waitAuto: true,
        });
        try{
            await newUser.save();
            res.status(201).json({
		"message": newUser._id});
        } catch (e) {
            //если сохранить всё же не удалось, вернём сообщение с ошибкой) мдя...
            res.json({
                "message": "Ошибка обработки заявки. Попробуйте снова",
            });
            console.log(e);
        }

    }
}

//отлично! теперь представим, что пользователь передумал и отменил заявку.
module.exports.disableOrder = async function(req, res){
    const candidate = await User.findOneAndUpdate({_id: ObjectId(req.body._id)}, {waitAuto: false});
    //мы вроде как нашли пользователя и изменили его данные. пробуем сохранить.
    try{
        await candidate.save();
        res.status(200).json({
            "message": "Заявка была отменена.",
        })
    } catch (e) {
        //если сохранить всё же не удалось, вернём сообщение с ошибкой) мдя...
        res.json({
            "message": "Ошибка отмены заявки. Попробуйте снова",
        });
        console.log(e);
    }
}

module.exports.getallOrderByStop = async function (req, res){
    const requests_on_request = await User.find({routeID: req.body.routeID});
    res.status(200).json(requests_on_request)
}