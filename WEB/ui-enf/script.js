const enfermeiro = JSON.parse(sessionStorage.getItem("enfermeiro"));

if (!enfermeiro) {
  window.location.href = "../login-enf/index.html";
} else {
  document.getElementById("nome").textContent = enfermeiro.nome;
  document.getElementById("ecip").textContent = enfermeiro.ecip;
  document.getElementById("id").textContent = enfermeiro.id;
}

function logout() {
  sessionStorage.removeItem("enfermeiro");
  window.location.href = "../home/index.html";
}
