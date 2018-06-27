var router = require('express').Router();

module.exports.router = function(app) {
    app.use('/', router);
    router.use('/twitterstream', require('../controllers/twitterCtrl'));
    router.use('/sabre', require('../controllers/sabreCtrl'));
};
