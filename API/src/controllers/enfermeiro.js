const prisma = require('../connect');

const create = async (req, res) => {
    const { nome, ecip, area, email, senha } = req.body;
    console.log('Dados recebidos:', req.body);

    try {
        const enfermeiro = await prisma.enfermeira.create({
            data: { nome, ecip, area, email, senha },
        });
        console.log('Enfermeiro criado:', enfermeiro);
        res.status(201).json(enfermeiro);
    } catch (err) {
        console.error('Erro ao criar enfermeiro:', err);
        res.status(400).json(err);
    }
};

const read = async (req, res) => {
    const enfermeiros = await prisma.enfermeira.findMany();
    res.json(enfermeiros);
}

const login = async (req, res) => {
    const { ecip, senha } = req.body; 
    console.log('Tentativa de login:', req.body);
    try {
        const enfermeiro = await prisma.enfermeira.findUnique({
            where: { ecip },
        });
        if (enfermeiro) {
            if (enfermeiro.senha === senha) {
                console.log('Login bem-sucedido:', enfermeiro);
                res.status(200).json({
                    ecip: enfermeiro.ecip,
                    area: enfermeiro.area,
                    nome: enfermeiro.nome,
                    email: enfermeiro.email,
                    senha: enfermeiro.senha, // Incluindo a senha para futuras requisições
                    message: 'Login bem-sucedido'
                });
            } else {
                console.log('e-CIP ou senha incorretas');
                res.status(401).json({ message: 'e-CIP ou senha incorretas' });
            }
        } else {
            console.log('Enfermeiro não encontrado');
            res.status(401).json({ message: 'Usuário não encontrado' });
        }
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
};

const update = async (req, res) => {
    const { ecip, area, nome, email, senha } = req.body;
    console.log('Requisição de atualização:', req.body);

    // Validação do ID
    if (!ecip || isNaN(Number(ecip))) {
        return res.status(400).json({ message: 'ID inválido ou ausente' });
    }

    try {
        const enfermeiroExistente = await prisma.enfermeira.findUnique({ where: { ecip: Number(ecip) } });

        if (!enfermeiroExistente) {
            console.log('Enfermeiro não encontrado para atualização');
            return res.status(404).json({ message: 'Enfermeiro não encontrado' });
        }

        const enfermeiroAtualizado = await prisma.enfermeira.update({
            where: { ecip: Number(ecip) },
            data: { nome, area, email, senha },
        });

        console.log('Enfermeiro atualizado com sucesso:', enfermeiroAtualizado);
        res.status(200).json(enfermeiroAtualizado);
    } catch (err) {
        console.error('Erro ao atualizar enfermeiro:', err);
        res.status(500).json({ message: 'Erro ao atualizar enfermeiro' });
    }
};



module.exports = {
    create,
    login,
    read,
    update
};