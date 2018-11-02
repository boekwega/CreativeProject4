var express = require('express');
var router = express.Router();
// var request = require('request');
var fs = require('fs');

var name_index = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('names.html', {root: 'public'});
});

/* get name route */
router.get('/getname', function(req, res, next){
    
    console.log("in getname route");
    
    fs.readFile(__dirname + '/names.dat.txt', function(err, data) {
        if(err) throw err;
        var names = data.toString().split("\n");
        var jsonresult = [];
        var result = names[name_index];
        name_index += 1;
        name_index = name_index % 124;
        if(result != -1) {
            jsonresult.push({name: result});
        }
        
        res.status(200).json(jsonresult);
    })
})

module.exports = router;
