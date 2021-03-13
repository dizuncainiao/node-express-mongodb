const jwt = require('jsonwebtoken');
const signKey = 'dizuncainiao_hello_nodeJs_world';

// 根据用户的一些相关信息生成 token
const token = jwt.sign({
    name: 'dizuncainiao',
    id: '11-55-66-88-99'
}, signKey, {expiresIn: '0.01h'});

console.log(token);

// 根据生成的 token 解析出用户的信息
const info = jwt.verify(token, signKey);
console.log(info);
