const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("runoob");
    const myobj =  [
        { name: '菜鸟工具1', url: 'https://c.runoob.com', type: '1'},
        { name: '菜鸟工具2', url: 'https://c.runoob.com', type: '2'},
        { name: '菜鸟工具3', url: 'https://c.runoob.com', type: '3'},
    ];
    dbo.collection("site").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        db.close();
    });
});
