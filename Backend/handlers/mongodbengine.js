var mongoose = require('mongoose');

function connect(url, callbackvalue) {
  mongoose.Promise = require('q').Promise;
    var db = mongoose.createConnection(url, {
        server: {
            auto_reconnect: true
        }
    });

    db.on('error', function() {
        console.log('Reconnecting from error');
        db = mongoose.createConnection(url, {
            server: {
                auto_reconnect: true
            }
        });
    });

    db.on('close', function() {
        console.log('Reconnecting from close');
        process.exit(1);
    });

    db.once('open', function() {
        function insert(schema, json) {
            var objmodel = db.model(schema.options.collection, schema);
            console.log('schema: ' + schema.options.collection + ' json: ' + JSON.stringify(json));
            return objmodel.create(json);
        }

        function update(schema, query) {
            var objmodel = db.model(schema.options.collection, schema);
            console.log('schema: ' + schema.options.collection  + ' query: ' + JSON.stringify(query));
            return objmodel.update(query,{ $inc: {"count": 1 } });
        }
        function fetchAll(schema, query, fields, options) {
            var objmodel = db.model(schema.options.collection, schema);
            return objmodel.find(query, fields, options);
        }
        function fetchOne(schema, query, fields) {
            var objmodel = db.model(schema.options.collection, schema);
            return objmodel.find(query, fields).sort({count:-1}).limit(1);
        }
        callbackvalue(null, {
            connect,
            insert,
            update,
            fetchOne,
            fetchAll
        });
    });
}

module.exports = {
    connect
};
