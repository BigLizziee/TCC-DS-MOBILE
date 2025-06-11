const uri = 'http://localhost:3000'; 

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#senha");

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

                // Salva nome e email corretos vindos da API
                sessionStorage.setItem("usuario", JSON.stringify({
                    id: data.id, // Certifique-se de que o ID está sendo retornado pela API
                    nome: data.nome,
                    email: data.email,
                    senha: data.senha,
                    cpf: data.cpf,
                    telefone: data.telefone, 
                    data_nascimento: data.data_nascimento, 
                    endereco: data.endereco, // Armazena a senha para futuras requisições
                }));

                window.location.href = '../ui/index.html'; // Redireciona para o perfil
            } else {
                alert(data.message || 'Email ou senha inválidos.');
            }
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            alert('Erro ao fazer login.');
        }
    });
}



togglePassword.addEventListener("click", function (e) {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
});

document.addEventListener('DOMContentLoaded', login);