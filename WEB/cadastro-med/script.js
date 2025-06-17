const uri = 'http://localhost:3000';
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#senha");

togglePassword.addEventListener("click", function (e) {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
});

const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const dados = {
    nome: form.nome.value,
    crm: form.crm.value,
    email: form.email.value,
    senha: form.senha.value,
    cpf: form.cpf.value,
  };
  fetch(`${uri}/cadastromed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
    .then(resp => resp.status)
    .then(status => {
      if (status == 201)
        alert('Cadastro feito com sucesso!');
      else
        alert('Erro ao cadastrar!');
      window.location.reload();
    });
});