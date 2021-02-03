const MongoClient = require("mongodb").MongoClient;
const config = require('../config.json');

let connection = null;
let url = config.mongodbConnection
console.log('url: ' + url);

module.exports.connect = () => new Promise((resolve, reject) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if (err) { 
            console.log('Unable to connect to mongodb!');
            console.log(e);
            reject(err); 
            return; 
        };
        console.log('Connected to mongodb!');
        resolve(db);        
        connection = db;
    });
});

module.exports.get = () => {
    if(!connection) {
        throw new Error('Call connect first!');
    }
    return connection;
}

module.exports.getDB = () => {
    if(!connection) {
        throw new Error('Call connect first!');
    }
    return connection.db(config.dbName)
}