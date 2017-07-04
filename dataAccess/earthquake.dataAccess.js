
let db = require('../configs/postgresql.config').db;

let saveEarthquake = function(id, date, x_axis, y_axis, z_axis) {
    return new Promise(function(resolve, reject){
        
        let query = `INSERT INTO earthquake (sensor_id, date, x_axis, y_axis, z_axis) 
                     VALUES ($1, $2, $3, $4, $5)`;

        db.result(query, [id, date, x_axis, y_axis, z_axis])
            .then(function(result) {
                resolve(result);
            }).catch(function(err) {
                console.log(err);
                reject(err);
            });
    });
}

module.exports = {
    saveEarthquake
}