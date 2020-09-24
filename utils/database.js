const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://yusti:y1161544761c@cluster0.ej3hr.mongodb.net/rello?retryWrites=true&w=majority';
const client = new MongoClient(uri,{ useNewUrlParser: true});

let _db;

const mongoConnect = async (callback) => {
    try {
        const client = client.connect();
        _db = client.db();
        callback();
    } catch (error) {
        console.log(error);
    }
}

const getDb = () => {
    if(_db){
        return _db;
    } else {
        throw 'No database found';
    }
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;