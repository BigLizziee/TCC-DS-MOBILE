const enfermeiro = JSON.parse(sessionStorage.getItem("enfermeiro"));

if (!enfermeiro) {
  window.location.href = "../login-enf/index.html";
} else {
  document.getElementById("nome").textContent = enfermeiro.nome;
}

function logout() {
  sessionStorage.removeItem("enfermeiro");
  window.location.href = "../home/index.html";
}
