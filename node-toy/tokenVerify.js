const jwt = require('jsonwebtoken');
const signKey = 'dizuncainiao_hello_nodeJs_world';

exports.setToken = function (userName, userId) {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            name: userName,
            _id: userId
        }, signKey, {expiresIn: '1h'});
        resolve(token);
    })
}

exports.verifyToken = function (token) {
    return new Promise((resolve, reject) => {
        const info = jwt.verify(token.split(' ')[1], signKey);
        resolve(info);
    })
}
