const express = require('express');
const controller = require('../controller/user');

const app = express();

app.get('/',(req,res)=>{res.send("Home")})
app.get('/health', controller.getHealth)
app.get('/profile', controller.getProfile)
app.post('/verification', controller.verification)

module.exports = app