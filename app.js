
//----------------------------MODULES---------------------------------------

//Npm modules
const express           = require('express');
const bodyParser        = require('body-parser');
const cors              = require('cors');
const morgan            = require('morgan');
const expressValidator  = require('express-validator');


//Custom modules
const earthquakeRoute        = require('./routes/earthquake.route');


//------------------------------NODE CONFIGS--------------------------------------------

let app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(expressValidator());

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(morgan('dev'));


//------------------------------API ROUTES--------------------------------------------

app.use('/measurement', earthquakeRoute); 

//-------------------------------------------------------------------------------------

app.use('', function(req, res, next) {
    res.status(404).send({success: false, statuscode: 404, message: 'Route unavailable'});
});



app.listen(port, function() {
    console.log('Server up and running at port ' + port);
});