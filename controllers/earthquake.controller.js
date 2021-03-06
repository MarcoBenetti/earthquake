
let eathquakeDataAccess = require('../dataAccess/earthquake.dataAccess');
let axios = require('axios');

let saveEarthquake = async function(req, res) {

    let id = req.params.id;
    let date = req.body.date;
    let xAxis = req.body.xAxis;
    let yAxis = req.body.yAxis;
    let zAxis = req.body.zAxis;
    
    req.checkParams('id', 'Invalid ID as parameter').notEmpty().isInt();
    req.checkBody('date', 'Invalid date').notEmpty().isDate();
    req.checkBody('xAxis', 'Invalid x axis measure').notEmpty().isDecimal();
    req.checkBody('yAxis', 'Invalid y axis measure').notEmpty().isDecimal();
    req.checkBody('zAxis', 'Invalid z axis measure').notEmpty().isDecimal();

    let errors = req.validationErrors();

    if(errors) {
        res.status(400).send({success: false, statuscode: 400, message: errors});
        return;
    }

    try {
        //check sysmograph status
        let result = await axios({method:'get', url:'https://pw2017b.mvlabs.it/check/' + id});

        //sysmograph broken
        if(!result.data.working) {
            res.status(403).send({success: false, statuscode: 403, message: "Sensor not working, data will be lost"});
            return;
        }

        //sysmograph ok
        let dbResult = await eathquakeDataAccess.saveEarthquake(id, date, xAxis, yAxis, zAxis);
        res.status(204).send({success: true, statuscode: 204});

    } catch (err) {

        if(err.response.data === "Station Not Found") {
            res.status(404).send({success: false, statuscode: 404, message: "Sensor not found"});
            return;
        }
        
        res.status(500).send({success: false, statuscode: 500, message: "Internal server error"});
    }

};

module.exports = {
    saveEarthquake
};