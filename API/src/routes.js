const express = require('express');
const rota = express.Router();

const paciente = require('./controllers/paciente.js'); 

rota.post('/cadastro', paciente.create); // Rota para cadastro
rota.post('/login', paciente.login); // Rota para login
rota.put('/update', paciente.update); // Rota para login

module.exports = rota;