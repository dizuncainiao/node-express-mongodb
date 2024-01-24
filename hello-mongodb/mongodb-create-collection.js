const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    const dbase = db.db("dizuncainiao");
    dbase.createCollection('site', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        db.close();
    });
});
