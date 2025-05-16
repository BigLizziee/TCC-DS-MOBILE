const uri = 'http://localhost:3000'; 

function login() {
    const form = document.querySelector('#formLogin');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const dados = {
            email: form.email.value,
            senha: form.senha.value,
        };

        try {
            const response = await fetch(`${uri}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login bem-sucedido!');
                sessionStorage.setItem("usuario", JSON.stringify(dados));
                window.location.href = '../test/index.html'; // Redireciona para a página inicial
            } else {
                alert(data.message || 'Email ou senha inválidos.');
            }
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            alert('Erro ao fazer login.');
        }
    });
}

document.addEventListener('DOMContentLoaded', login);