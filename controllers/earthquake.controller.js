
let eathquakeDataAccess = require('../dataAccess/earthquake.dataAccess');
let axios = require('axios');

let saveEarthquake = async function(req, res) {

    let id = req.params.id;
    let date = req.body.date;
    let xAxis = req.body.xAxis;
    let yAxis = req.body.yAxis;
    let zAxis = req.body.zAxis;
    
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
        res.status(500).send({success: false, statuscode: 500, message: "Internal server error"});
        console.log(err);
    }

};

module.exports = {
    saveEarthquake
};