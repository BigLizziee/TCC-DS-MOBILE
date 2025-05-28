const uri = 'http://localhost:3000';
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#senha");

togglePassword.addEventListener("click", function (e) {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
});

function cadastrar(){
const form = document.querySelector('#cadastro form')
form.addEventListener('submit', e => {
    e.preventDefault()
    const dados = {
        nome: form.nome.value,
        ecip: form.ecip.value,
        area: form.area.value,
        email: form.email.value,
        senha: form.senha.value,
    }
    fetch('http://localhost:3000/registroenf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 201)
                alert('Cadastro feito com sucesso!');
            else
                alert('Erro ao cadastrar!');
                window.location.reload();
        })
})
}