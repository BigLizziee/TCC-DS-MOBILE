const express = require('express');
const rota = express.Router();

const paciente = require('./controllers/paciente.js'); 
const enfermeiro = require('./controllers/enfermeiro.js'); 
const medico = require('./controllers/medico.js');
const func_med = require('./controllers/func_med.js');
const mens_med = require('./controllers/mens_med.js');

rota.get('/', (req, res) => {
    res.json({ titulo: 'API DD respondendo' });
});

//Rotas de paciente
rota.post('/cadastro', paciente.create); // Rota para cadastro de paciente
rota.post('/login', paciente.login); // Rota para login
rota.put('/update', paciente.update); // Rota para atualizar paciente
rota.get('/pacientes', paciente.read); // Rota para ler todos os pacientes
rota.get('/pacientes/:id', paciente.readOne); // Rota para ler paciente por ID
rota.delete('/deletar/:id', paciente.deletar); // Rota para deletar paciente por ID

// Rota de enfermeiro
rota.post('/cadastroenf', enfermeiro.create); // Rota para cadastro
rota.post('/loginenf', enfermeiro.login); // Rota para login
rota.put('/updateenf', enfermeiro.update); // Rota para update
rota.get('/enfermeiros', enfermeiro.read); // Rota para ler todos os enfermiros
rota.get('/enfermeiros/:id', enfermeiro.readOne); // Rota para ler enfermeiro por ID
rota.delete('/deletarenf/:id', enfermeiro.deletar); // Rota para deletar enfermeiro por ID

// Rota de medico
rota.post('/cadastromed', medico.create); // Rota para cadastro
rota.post('/loginmed', medico.login); // Rota para login
rota.put('/updatemed', medico.update); // Rota para update
rota.get('/medicos', medico.read); // Rota para ler todos os enfermiros
rota.get('/medicos/:id', medico.readOne); // Rota para ler medico por ID
rota.delete('/deletarmed/:id', medico.deletar); // Rota para deletar medico por ID

// Rota de atestado
rota.post('/funcmed', func_med.create); // Rota para criar atestado
rota.get('/funcmed', func_med.read); // Rota para ler todos os atestados
rota.get('/funcmed/paciente/:pacienteId', func_med.readOne);

// Rota de Mensagem de Médico
rota.post('/mensmed', mens_med.create); // Rota para criar mensagem
rota.get('/mensmed', mens_med.read); // Rota para ler todos os mensagens
rota.get('/mensmed/paciente/:pacienteId', mens_med.readOne);
rota.delete('/mensmed/:id', mens_med.deletar); // Rota para deletar mensagem por ID

module.exports = rota;