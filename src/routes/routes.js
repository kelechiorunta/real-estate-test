const express = require('express');
const { getGreetings, registerUser, userStorage } = require('../controllers/controllers')

const route = express.Router();

route.use((req, res, next)=>{
    console.log(req.user);
    next();
})

route.get('/', getGreetings);
route.post('/', registerUser);

module.exports = route;