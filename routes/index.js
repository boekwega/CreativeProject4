var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');

/* Get dictionary definition route */
router.get('/owl', function(req, res) {
    
    console.log("in owlbot");
    
    var owlbot = "https://owlbot.info/api/v1/dictionary/";
    
    //we want a json return
    owlbot += req.query.q + "?format=json";
    request(owlbot).pipe(res);
})

/* GET home page route. */
router.get('/', function(req, res, next) {
    res.sendFile('weather.html', { root: 'public' });

});

/* New GET request route.*/
router.get('/getcity', function(req, res, next) {
    console.log("In getcity route");
    fs.readFile(__dirname + '/cities.dat.txt', function(err, data) {
        if (err) throw err;
        var cities = data.toString().split("\n");
        var myRe = new RegExp("^" + req.query.q);
        var jsonresult = [];
        for (var i = 0; i < cities.length; i++) {
            var result = cities[i].search(myRe);
            if (result != -1) {
                jsonresult.push({ city: cities[i] });
            }
        }
        res.status(200).json(jsonresult);
    });
});


module.exports = router;
