const con = require('../connect')

const create = ('/login', (req, res) => {
    const { email, senha } = req.body;
  
    con.query('SELECT * FROM paciente WHERE email = ?', [email], (err, results) => {
      if (err || results.length === 0) {
        return res.status(400).json({ message: 'Email ou senha incorretos' });
      }
  
      const pacientes = results[0];
  
      if (senha !== pacientes.senha) {
        return res.status(400).json({ message: 'Email ou senha incorretos' });
      }
  
      res.status(200).json({ message: 'Login bem-sucedido' });
    });
  });
  
  module.exports = {
    create
}