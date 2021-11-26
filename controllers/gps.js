const Passenger = require('../models/User_passenger');

//просто получить ВСЕ остановки - правил
module.exports.AvailableZakaz = async function (req, res){
    const getZakaz = await Passenger.find();
   
    let sortedRoute = new Array();
    for(const zakaz of getZakaz){
        for (const route  of zakaz.routeID) {
            if(route === req.query.routeID) {
               sortedRoute.push({start:zakaz.start, stop:zakaz.stop});
               
      
            }
           
        }
    }
    //console.log(sortedDrivers);
   // const sortedRouteRoute = {stops: sortedRoute}
    res.status(200).json(sortedRoute);
}
   
