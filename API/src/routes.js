const express = require('express');
const rota = express.Router();

const cli = require('./controllers/dd');
const login = require('./controllers/login');

rota.post('/cli', cli.create);
rota.post('/login', login.create);

module.exports = rota;