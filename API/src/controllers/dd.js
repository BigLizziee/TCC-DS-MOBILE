const con = require('../connect')

const create = (req, res) => {
    const { nome, email, senha } = req.body;
    con.query('INSERT INTO paciente(nome, email, senha)VALUES(?,?,?)', [nome, email, senha], (err, result) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(result);
        }
    });
}
module.exports = {
    create
}