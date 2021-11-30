const Stops = require('../models/Stops');
const Driver_route = require('../models/Driver_routes');

//просто получить ВСЕ остановки - правил
module.exports.getAll = async function (req, res){
    const getStops = await Stops.find();
    const getNamesStops = getStops.map((names)=>{ return names._id; });
    //console.log(typeof (getStops));
    const getNamesStops_res = {
        names: getNamesStops
    };
    res.status(200).json(getNamesStops_res);
}

//красава. теперь по выбранной остановке получим те, до которых реально добраться - правил
module.exports.getAvailableStops = async function (req, res){
    const getStops = await Stops.findOne({_id: req.query._id});
    const getStops_res = { names: getStops.availableStops}
    res.status(200).json(getStops_res);
}

//запрос на получение существующих маршрутов - правил
module.exports.getRoutes = async function(req, res){
    const allRoutes = await Driver_route.find({existAuto: true});
    const routeNames = allRoutes.map(oneName => {return oneName._id});
    const routeNames_res = {names: routeNames}
    res.status(200).json(routeNames_res);
}
//теперь по указанному № маршрута получим его путь - правил
module.exports.getRouteById = async function(req, res) {
    //тут мы нашли общий объект
    const RouteById = await Driver_route.findOne({_id: req.query._id});
    //взяли из него этот самый массив с кучей "подобъектов"
    const RouteArray = RouteById.route;
    //методом map достали все имена
    const RouteNames = RouteArray.map(names => { return names.name});
    const RouteNames_res = {names: RouteNames};
    res.status(200).json(RouteNames_res);
}

//получим список походящих под выбранные остановки маршрутов - правил
module.exports.getRoutesByStops = async function(req, res) {
    //для этого сначала получим все маршруты, которые содержат в себе эти остановки
    const okDrivers = await Driver_route.find({"route.name": {$all: [req.query.start, req.query.stop]}});
    //класс. теперь нужно отфильтровать эти маршруты, отбросив те, в которых конечная, идет раньше начальной.
    let sortedDrivers = new Array();
    for(const driver_route of okDrivers){
        let findStart = false, findStop = false;
        for (let i = 0;;i++) {
            if(driver_route.route[i].name === req.query.start) {
                findStart = true;
                break;
            }
            if(driver_route.route[i].name === req.query.stop) {
                findStop = true;
                break;
            }
        }
        if(findStart && !findStop) {
            //console.log(driver_route._id);
            sortedDrivers.push(driver_route._id);
        } else {
        }
    }
    //console.log(sortedDrivers);
    if(sottedDrivers.size()>0){
         const sortedDrivers_res = {names: sortedDrivers,message:"OK"}
         res.json(sortedDrivers_res);
    }
    else{
        const sortedDrivers_res = {names:{}, message:"NO"}
        res.json(sortedDrivers_res);
    }
}
