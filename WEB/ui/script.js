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

function atualizarQuantidade() {
  const atestados = JSON.parse(localStorage.getItem('atestados')) || [];
  const total = atestados.reduce((soma, item) => soma + item.quantidade, 0);
  document.getElementById('qtd').textContent = total;
}

atualizarQuantidade();
window.atualizarQuantidade = atualizarQuantidade;