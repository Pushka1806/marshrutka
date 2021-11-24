const Passenger = require('../models/User_passenger');

//просто получить ВСЕ остановки - правил
module.exports.AvailableZakaz = async function (req, res){
    const getZakaz = await Passenger.find();
   
    let sortedRoute = new Array();
    for(const zakaz of getZakaz){
        for (const route  of zakaz.routeID) {
            let startstop = new Array();
            if(route === req.query.routeID) {
               startstop.push({start:zakaz.start});
               startstop.push({stop:zakaz.stop});
               sortedRoute.push(startstop);
      
            }
           
        }
    }
    //console.log(sortedDrivers);
    const sortedRoute_res = {stops: sortedRoute}
    res.status(200).json(sortedRoute_res);
}
   
