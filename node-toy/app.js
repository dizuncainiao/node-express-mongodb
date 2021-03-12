const express = require('express')
const app = express()
const {setResponse} = require('./utils')
const {createCollection, insertOneUser, findUser, deleteUser} = require('./db')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// 创建集合
createCollection()

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 登录
app.post('/login', async (req, res) => {
    console.log(req.body);
    const result = await findUser(req.body)
    if (result.length) {
        res.send(setResponse(null, '登录成功！'))
    } else {
        res.send(setResponse(null, '用户名或密码错误！', 4000))
    }
})

// 注册
app.post('/register', async (req, res) => {
    console.log(req.body);
    const {userName} = req.body
    // 查询用户名是否重复
    const result = await findUser({userName})
    if (result.length) {
        res.send(setResponse(req.body, '用户名重复！', 4000))
    } else {
        await insertOneUser(req.body)
        res.send(setResponse(req.body, '注册成功！'))
    }
})

// 查询人员列表
app.post('/userList', async (req, res) => {
    const result = await findUser(req.body)
    console.log(result);
    res.send(setResponse(result, '', 200))
})

// 删除人员
app.post('/deleteUser', async (req, res) => {
    const result = await deleteUser(req.body)
    console.log(result);
    res.send(setResponse(result, '删除成功！', 200))
})

app.listen(8076)
console.log('http://localhost:8076')
