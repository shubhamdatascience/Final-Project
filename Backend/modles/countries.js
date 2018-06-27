const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countries = new Schema({
    countryName: { type: String },
    airportCodes: { type: String },
    count:{ type: Number, default: 0 }
}, { collection: 'countries' });

module.exports.schema = countries;
