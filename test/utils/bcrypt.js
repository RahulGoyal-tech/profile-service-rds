const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

const rand = (strLen) => {
    var salt = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i=0; i<strLen; i++){
        salt += characters.charAt(Math.floor(Math.random()*charactersLength));
    }
    return salt;
}

const getSalt = () => {
    const salt = "$2b$10$" + rand(21) + ".";
    return salt;
}

const getHash = async () => {
    const cryptingToken = getSalt();
    const hash = await bcrypt.hash(process.env.CHAIN_CODE,cryptingToken);
    return hash;
}

module.exports = {
    getSalt,
    getHash
}