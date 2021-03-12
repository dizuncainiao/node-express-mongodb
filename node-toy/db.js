const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/testNode';
const {v4: uuidV4} = require('uuid');

const getQueryTotal = function (whereInfo = {}) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbase = db.db("testNode");
            whereInfo = {userName: new RegExp(whereInfo.userName)}

            dbase.collection("users").countDocuments(whereInfo, {}, (err, result) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
                db.close();
            });
        });
    })
}
const findUser = function (whereInfo = {}) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbase = db.db("testNode");
            const {page, pageSize} = whereInfo
            const skipNum = (Number(page) - 1) * Number(pageSize)
            whereInfo = {userName: new RegExp(whereInfo.userName)}

            dbase.collection("users").find(whereInfo).skip(skipNum).limit(Number(pageSize)).toArray(function (err, result) {
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
                db.close();
            });
        });
    })
}

module.exports = {
    createCollection() {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            console.log('数据库已创建');
            const dbase = db.db("testNode");
            dbase.createCollection('users', function (err, res) {
                if (err) {
                    //console.log(err)    //可能会报：MongoError: Collection already exists. NS: testNode.users 后期优化吧
                }
                console.log("创建集合!");
                db.close();
            });
        });
    },
    insertOneUser(userData) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                const dbase = db.db("testNode");
                const record = {
                    ...userData,
                    id: uuidV4()
                }
                dbase.collection("users").insertOne(record, function (err, res) {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve()
                    db.close();
                });
            });
        })
    },
    findUser,
    // 获取查询的总条数
    getQueryTotal,
    queryUserListPage(condition) {
        return Promise.all([findUser(condition), getQueryTotal(condition)]).then(([records, total]) => {
            return {records, total}
        })
    },
    deleteUser(whereInfo) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                const dbase = db.db("testNode");
                dbase.collection("users").deleteOne(whereInfo, function (err, obj) {
                    if (err) {
                        reject(err)
                        return
                    }
                    console.log(obj, 'obj obj obj obj obj obj obj obj obj obj obj obj ');
                    resolve()
                    db.close();
                });
            });
        })
    }
}
