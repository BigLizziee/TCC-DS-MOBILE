const express = require('express');
const rota = express.Router();

const paciente = require('./controllers/paciente.js'); 
const enfermeiro = require('./controllers/enfermeiro.js'); 

//Rotas de paciente
rota.post('/cadastro', paciente.create); // Rota para cadastro
rota.post('/login', paciente.login); // Rota para login
rota.put('/update', paciente.update); // Rota para login

// Rota de enfermeiro
rota.post('/cadastro', enfermeiro.create); // Rota para cadastro
rota.post('/login', enfermeiro.login); // Rota para login
rota.put('/update', enfermeiro.update); // Rota para login

module.exports = rota;