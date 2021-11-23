const Passenger = require('../models/User_passenger');

//просто получить ВСЕ остановки - правил
module.exports.driverRouteID = async function (req, res){
    const getZakaz = await Passenger.find();
    let sortedRoute = new Array();
    for(const zakaz of getZakaz){
        for (let i = 0;zakaz.routeID.length;i++) {
            if(zakaz.routeID.i === req.query.routeID) {
               sortedRoute.push(zakaz._id);   
            }
        }
    }
    //console.log(sortedDrivers);
    const sortedRoute_res = {names: sortedRoute}
    res.status(200).json(sortedRoute_res);
}
   
