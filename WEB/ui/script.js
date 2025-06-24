const usuario = JSON.parse(sessionStorage.getItem("usuario"));

if (!usuario) {
  window.location.href = "../login/index.html";
} else {
  document.getElementById("nome").textContent = usuario.nome;
  document.getElementById("id").textContent = usuario.id;
  document.getElementById("email").textContent = usuario.email;
  document.getElementById("senha").textContent = usuario.senha;
}

function logout() {
  sessionStorage.removeItem("usuario");
  window.location.href = "../home/index.html";
}

atualizarQuantidade();
window.atualizarQuantidade = atualizarQuantidade;

document.addEventListener('DOMContentLoaded', () => {
  const contador = document.getElementById('contadorMensagens');
  const quantidade = sessionStorage.getItem('quantidadeMensagens');

  if (contador && quantidade !== null) {
    contador.textContent = quantidade;
  }
});