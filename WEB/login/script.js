const uri = 'http://localhost:3000';

function logar(){
const form = document.querySelector('#formlogin')
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const dados = {
        email: form.email.value,
        senha: form.senha.value,
    }
    fetch(uri + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(resp => resp.status)
        .then(resp => {
            if (resp == 201)
                alert('Email ou senha incorretos!');
            else
                alert('Login feito com sucesso!');
                window.location.href = '../chatbot/index.html';
        })
})
}