const enfermeiro = JSON.parse(sessionStorage.getItem("enfermeiro"));

if (!enfermeiro) {
  window.location.href = "../login-enf/index.html";
} else {
  document.getElementById("ecip").textContent = enfermeiro.ecip;
  document.getElementById("nome").textContent = enfermeiro.nome;
  document.getElementById("area").textContent = enfermeiro.area;
  document.getElementById("email").textContent = enfermeiro.email;
  document.getElementById("senha").textContent = enfermeiro.senha;
}

function logout() {
  sessionStorage.removeItem("enfermeiro");
  window.location.href = "../home/index.html";
}
