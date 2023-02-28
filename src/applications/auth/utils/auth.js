const jwt = require('jsonwebtoken');
const config = require('../../../config/config')
const bcrypt = require('bcryptjs');

function generateToken(payload) {
    return jwt.sign(payload, config.SECRET_KEY, {'expiresIn': '1h'})
};

function verifyToken(req){
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, decoded) => {
            if(err){
                throw Error(err);
            }
            req.decoded = decoded;

        })
    }
}

function generateHash(plainPassword) {
    return bcrypt.hashSync(plainPassword, 11);
}  

function verifyHash(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}

module.exports = {
    generateToken,
    verifyToken,
    generateHash,
    verifyHash
}