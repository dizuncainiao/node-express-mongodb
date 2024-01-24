const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("dizuncainiao");
    // 跳过前两条，往后读取（可用 limit() 控制读取几条）
    dbo.collection("site").find().skip(2).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});


