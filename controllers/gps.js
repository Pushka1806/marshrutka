const Passenger = require('../models/User_passenger');
const Driver_route = require('../models/Driver_routes');

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

module.exports.getJpsByStops = async function(req, res) {
    //для этого сначала получим все маршруты, которые содержат в себе эти остановки
    const driver_route = await Driver_route.findOne({"_id":req.query.route});
    let step_one = new Array;
    let step_two = new Array;
    let size = driver_route.lenght;
    let findStart = false, findStop = false;
    for (let i = 0;driver_route.length>i;i++) {
        if(driver_route.route[i].name === req.query.step_one) {
            findStart = true;
            step_one.push(driver_route.route[i].latitude)
            step_one.push(driver_route.route[i].longitude)
            continue;
        }
        if(driver_route.route[i].name === req.query.step_two) {
            findStop = true;
            step_two.push(driver_route.route[i].latitude)
            step_two.push(driver_route.route[i].longitude)
            break;
        }
    }
    if(findStart && findStop){
         const result= {step_one:step_one,step_two:step_two,message:"OK"}
         res.status(200).json(result);
    }
    else{
        const result = {step_one:"2",step_two:{}, message:"NO"}
        res.json(result);
    }
}
   
