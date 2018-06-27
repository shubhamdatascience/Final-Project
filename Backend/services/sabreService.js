var SabreDevStudio = require('sabre-dev-studio');
var twitter=require('../config/twitter.json');
var sabre_dev_studio = new SabreDevStudio(twitter.saberCredentials);

function cheapestFlights(region,callback){
  var options = {};
  return sabre_dev_studio.get('/v1/shop/flights/cheapest/fares/'+region+'?pointofsalecountry=US', options,  function (err, data) {
      if (err) {
          console.log(err);
      } else {
          callback(JSON.parse(data));
      }
  });
}
module.exports = {
    cheapestFlights:cheapestFlights
};
