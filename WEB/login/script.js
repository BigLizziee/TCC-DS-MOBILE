const uri = 'http://localhost:3000'; // Certifique-se de que o endpoint está correto

function login() {
    const form = document.querySelector('#formLogin');
    if (!form) {
        console.error('Formulário com ID "formLogin" não encontrado.');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const dados = {
            email: form.email.value.trim(), // Remove espaços extras
            senha: form.senha.value.trim(),
        };

        if (!dados.email || !dados.senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch(`${uri}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login bem-sucedido!');
                window.location.href = '../chatbot/index.html'; // Redireciona para a página inicial
            } else {
                alert(data.message || 'Email ou senha inválidos.');
            }
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            alert('Erro ao conectar ao servidor. Verifique sua conexão.');
        }
    });
}

document.addEventListener('DOMContentLoaded', login);