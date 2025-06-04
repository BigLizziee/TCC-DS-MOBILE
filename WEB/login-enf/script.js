const uri = 'http://localhost:3000'; 

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#senha");

function login() {
    const form = document.querySelector('#formLogin');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const dados = {
            ecip: form.ecip.value,
            senha: form.senha.value,
        };

        try {
            const response = await fetch(`${uri}/loginenf`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login bem-sucedido!');

                // Salva nome e email corretos vindos da API
                sessionStorage.setItem("enfermeiro", JSON.stringify({
                    ecip: data.ecip, // Certifique-se de que o ID está sendo retornado pela API
                    nome: data.nome,
                    area: data.area,
                    email: data.email,
                    senha: data.senha // Armazena a senha para futuras requisições
                }));

                window.location.href = '../ui-enf/index.html'; // Redireciona para o perfil
            } else {
                alert(data.message || 'e-CIP ou senha inválidos.');
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