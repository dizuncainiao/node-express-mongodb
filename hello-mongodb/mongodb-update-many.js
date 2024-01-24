const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const dbo = db.db("dizuncainiao");
    const whereStr = {"name": '菜鸟教程'};  // 查询条件
    const updateStr = {$set: {"url": "https://www.runoob.com"}};
    dbo.collection("site").updateMany(whereStr, updateStr, function (err, res) {
        if (err) throw err;
        console.log(res.result.nModified + " 条文档被更新");
        db.close();
    });
});
