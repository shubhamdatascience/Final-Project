var mongo = require('../handlers/mongodbengine.js');
var mongoose = require('mongoose');
var twitter=require('../config/twitter.json');
var dbModel=require('../modles/countries.js');

var mongoCon;
var countries=twitter.countries;
var codes=twitter.codes;

mongo.connect(twitter.db.mongo, function(err, mongoConnection) {
    if (err) {
        console.error(err);
        return;
    }
    console.log("DB connected")
    mongoCon = mongoConnection;
});

function tweetProcessing(tweet){
  var tweet=tweet.toLowerCase()
  countries.map(function(country){
  if(tweet.indexOf(country)!=-1){
    return mongoCon.update(dbModel.schema, {countryName:country}).then(function(e){
      console.log("data updated",e)}).catch((err) => {
        console.log(err)});
  }
});

}

function InitiateDB(){
  var countryList=[];
  twitter.countries.map(function(data,i){
    countryList.push({countryName:data,airportCodes:codes[i]})
  });
  return mongoCon.insert(dbModel.schema, countryList);
}
module.exports = {
    InitiateDB:InitiateDB,
    tweetProcessing: tweetProcessing
};
