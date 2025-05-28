const prisma = require('../connect');

const create = async (req, res) => {
    const { nome, area, email, senha, ecip } = req.body;
    console.log('Dados recebidos:', req.body);

    try {
        const enfermeiro = await prisma.enfermeiro.create({
            data: { nome, area, email, senha, ecip },
        });
        console.log('Usuário criado:', enfermeiro);
        res.status(201).json(enfermeiro);
    } catch (err) {
        console.error('Erro ao criar usuário:', err);
        res.status(400).json(err);
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body; 
    console.log('Tentativa de login:', req.body);
    try {
        const enfermeiro = await prisma.enfermeiro.findUnique({
            where: { email },
        });
        if (enfermeiro) {
            if (enfermeiro.senha === senha) {
                console.log('Login bem-sucedido:', enfermeiro);
                res.status(200).json({
                    id: enfermeiro.id,
                    nome: enfermeiro.nome,
                    email: enfermeiro.email,
                    senha: enfermeiro.senha,
                    ecip: enfermeiro.ecip, // Incluindo a senha para futuras requisições
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

    // Validação do ID
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: 'ID inválido ou ausente' });
    }

    try {
        const enfermeiroExistente = await prisma.enfermeiro.findUnique({ where: { id: Number(id) } });

        if (!enfermeiroExistente) {
            console.log('enfermeiro não encontrado para atualização');
            return res.status(404).json({ message: 'enfermeiro não encontrado' });
        }

        const enfermeiroAtualizado = await prisma.enfermeiro.update({
            where: { id: Number(id) },
            data: { nome, area, email, senha },
        });

        console.log('enfermeiro atualizado com sucesso:', enfermeiroAtualizado);
        res.status(200).json(enfermeiroAtualizado);
    } catch (err) {
        console.error('Erro ao atualizar enfermeiro:', err);
        res.status(500).json({ message: 'Erro ao atualizar enfermeiro' });
    }
};



module.exports = {
    create,
    login,
    update
};