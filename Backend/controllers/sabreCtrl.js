const router = require('express').Router();
var mongo = require('../handlers/mongodbengine.js');
var twitter=require('../config/twitter.json');
var mongoose = require('mongoose');
var dbModel=require('../modles/countries.js');
var sabreService=require('../services/sabreService.js');

var mongoCon;
mongo.connect(twitter.db.mongo, function(err, mongoConnection) {
    if (err) {
        console.error(err);
        return;
    }
    mongoCon = mongoConnection;
});

router.get('/start', function(req, res) {
  mongoCon.fetchOne(dbModel.schema).then(function(data){
  sabreService.cheapestFlights(data[0].airportCodes,function(flightList) {
    res.json({"success":true,"data":flightList.FareInfo}) ;
  });
  });
});


module.exports = router;
