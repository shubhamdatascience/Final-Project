const router = require('express').Router();
var twitter=require('../config/twitter.json');
var Twit = require('twit');
var twitterService=require('../services/twitterService.js');

var mongo = require('../handlers/mongodbengine.js');
var mongoose = require('mongoose');
var dbModel=require('../modles/countries.js');

var mongoCon;
mongo.connect(twitter.db.mongo, function(err, mongoConnection) {
    if (err) {
        console.error(err);
        return;
    }
    mongoCon = mongoConnection;
});

var T = new Twit(twitter.tweetCredentials)

router.get('/', function(req, res) {
      console.log("works")
});

router.get('/start', function(req, res) {
  var feed;
  var stream = T.stream('statuses/filter', { track: '#FIFA', language: 'en' })
  var countryList=[];
  twitter.countries.map(function(i){
    countryList.push({countryName:i})
  });
  return mongoCon.fetchAll(dbModel.schema).then(function(data){
      if(data.length<countryList.length){
        twitterService.InitiateDB();
      }
      stream.on('message', function (tweet) {
        if(tweet.extended_tweet!=undefined){
          feed=tweet.extended_tweet.full_text;
        }else{
          feed=tweet.text;
        }
        twitterService.tweetProcessing(feed);
      })
      res.json({"status":"inProgress"})
  })
});
router.get('/topCountry', function(req, res) {
  return mongoCon.fetchOne(dbModel.schema).then(function(data){res.json({"success":true,"data":data[0]})});
});

module.exports = router;
