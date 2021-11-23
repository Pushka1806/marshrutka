const Passenger = require('../models/User_passenger');

//просто получить ВСЕ остановки - правил
module.exports.driverRouteID = async function (req, res){
    const getZakaz = await Passenger.find();
   
    let sortedRoute = new Array();
    for(const zakaz of getZakaz){
        for (const route  of zakaz.routeID) {
            if(route === req.query.routeID) {
               sortedRoute.push(zakaz._id);   
            }
        }
    }
    //console.log(sortedDrivers);
    const sortedRoute_res = {names: sortedRoute}
    res.status(200).json(sortedRoute);
}
   
