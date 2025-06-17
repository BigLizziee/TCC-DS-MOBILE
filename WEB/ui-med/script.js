const medico = JSON.parse(sessionStorage.getItem("medico"));

if (!medico) {
  window.location.href = "../login-med/index.html";
} else {
  document.getElementById("nome").textContent = medico.nome;
  document.getElementById("id").textContent = medico.id;
  document.getElementById("email").textContent = medico.email;
  document.getElementById("senha").textContent = medico.senha;
  document.getElementById("crm").textContent = medico.crm;
  document.getElementById("telefone").textContent = medico.telefone;
  document.getElementById("cpf").textContent = medico.cpf;
  document.getElementById("datanasc").textContent = medico.data_nascimento;
}

function logout() {
  sessionStorage.removeItem("medico");
  window.location.href = "../home/index.html";
}