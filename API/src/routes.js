const express = require('express');
const rota = express.Router();

const paciente = require('./controllers/paciente.js'); 
const enfermeiro = require('./controllers/enfermeiro.js'); 

//Rotas de paciente
rota.get('/pacientes', paciente.read); // Rota para ler todos os pacientes
rota.post('/cadastro', paciente.create); // Rota para cadastro de paciente
rota.post('/login', paciente.login); // Rota para login
rota.put('/update', paciente.update); // Rota para atualizar paciente

// Rota de enfermeiro
rota.get('/enfermeiros', enfermeiro.read); // Rota para ler todos os enfermiros
rota.post('/cadastroenf', enfermeiro.create); // Rota para cadastro
rota.post('/loginenf', enfermeiro.login); // Rota para login
rota.put('/updateenf', enfermeiro.update); // Rota para update

module.exports = rota;