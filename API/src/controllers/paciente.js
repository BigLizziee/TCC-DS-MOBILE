const prisma = require('../connect');

const create = async (req, res) => {
    const { nome, email, senha } = req.body;
    console.log('Dados recebidos:', req.body);

    try {
        const paciente = await prisma.paciente.create({
            data: { nome, email, senha },
        });
        console.log('Usuário criado:', paciente);
        res.status(201).json(paciente);
    } catch (err) {
        console.error('Erro ao criar usuário:', err);
        res.status(400).json(err);
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body; 
    console.log('Tentativa de login:', req.body);
    try {
        const paciente = await prisma.paciente.findUnique({
            where: { email },
        });
        if (paciente) {
            if (paciente.senha === senha) {
                console.log('Login bem-sucedido:', paciente);
                res.status(200).json({
                    nome: paciente.nome,
                    email: paciente.email,
                    message: 'Login bem-sucedido'
                });
            } else {
                console.log('Senha incorreta');
                res.status(401).json({ message: 'Senha incorreta' });
            }
        } else {
            console.log('Usuário não encontrado');
            res.status(401).json({ message: 'Usuário não encontrado' });
        }
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
};

const update = async (req, res) => {
    const { id, nome, email, senha } = req.body;
    console.log('Requisição de atualização:', req.body);

    try {
        const pacienteExistente = await prisma.paciente.findUnique({ where: { id: Number(id) } });

        if (!pacienteExistente) {
            console.log('Paciente não encontrado para atualização');
            return res.status(404).json({ message: 'Paciente não encontrado' });
        }

        const pacienteAtualizado = await prisma.paciente.update({
            where: { id: Number(id) },
            data: { nome, email, senha },
        });

        console.log('Paciente atualizado com sucesso:', pacienteAtualizado);
        res.status(200).json(pacienteAtualizado);
    } catch (err) {
        console.error('Erro ao atualizar paciente:', err);
        res.status(500).json({ message: 'Erro ao atualizar paciente' });
    }
};



module.exports = {
    create,
    login,
    update
};