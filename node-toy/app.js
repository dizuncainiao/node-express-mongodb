const express = require('express')
const app = express()
const {setResponse} = require('./utils')
const {createCollection, insertOneUser, findUser, deleteUser, queryUserListPage, updateUser} = require('./db')
const {setToken, verifyToken} = require('./tokenVerify')
const expressJwt = require('express-jwt');
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// 创建集合
createCollection()

//设置跨域访问
app.options("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// 解析token获取用户信息
app.use(function (req, res, next) {
    const token = req.headers['Authorization'];
    if (!token) {
        return next();
    } else {
        verifyToken(token).then((data) => {
            req.data = data;
            return next();
        }).catch(err => {
            return next();
        })
    }
})

//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
    secret: 'dizuncainiao_hello_nodeJs_world',
    algorithms: ['HS256']
}).unless({
    path: ['/login', '/register'] // 验证白名单
}));

//当token失效返回提示信息
app.use(function (err, req, res, next) {
    if (err.status === 401) {
        return res.status(401).send({msg: 'token失效'});
    }
});

// 登录
app.post('/login', async (req, res) => {
    console.log(req.body);
    const result = await findUser(req.body)
    if (result.length) {
        const {userName, userId} = result[0]
        setToken(userName, userId).then(tokenStr => {
            return res.json(setResponse({token: tokenStr}, '登录成功！'))
        })
    } else {
        return res.json(setResponse(null, '用户名或密码错误！', 4000))
    }
})

// 注册
app.post('/register', async (req, res) => {
    console.log(req.body);
    const {userName} = req.body
    // 查询用户名是否重复
    const result = await findUser({userName})
    if (result.length) {
        return res.json(setResponse(req.body, '用户名重复！', 4000))
    } else {
        req.body = {...req.body, createTime: new Date().getTime()}
        await insertOneUser(req.body)
        return res.json(setResponse(req.body, '注册成功！'))
    }
})

// 查询人员列表
app.post('/userList', async (req, res) => {
    const result = await findUser(req.body)
    console.log(result);
    const {records, total} = result
    return res.json(setResponse(result, '', 200))
})

// 删除人员
app.post('/deleteUser', async (req, res) => {
    const result = await deleteUser(req.body)
    console.log(result);
    return res.json(setResponse(result, '删除成功！', 200))
})

// 查询人员列表分页
app.post('/userListPage', async (req, res) => {
    const result = await queryUserListPage(req.body)
    console.log(result);
    return res.json(setResponse(result, '', 200))
})

// 更新人员
app.post('/updateUser', async (req, res) => {
    const result = await updateUser(req.body)
    console.log(result);
    return res.json(setResponse(null, '更新成功！', 200))
})

app.listen(8076)
console.log('http://localhost:8076')
