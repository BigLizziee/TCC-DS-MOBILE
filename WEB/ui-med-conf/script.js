const medico = JSON.parse(sessionStorage.getItem("medico"));
console.log(medico);

if (!medico) {
  window.location.href = "../login-med/index.html";
} else {
  document.getElementById("crm").value = medico.crm;
  document.getElementById("id").value = medico.id;
  document.getElementById("nome").value = medico.nome;
  document.getElementById("email").value = medico.email;
  document.getElementById("senha").value = medico.senha;
  document.getElementById("cpf").value = medico.cpf;
  document.getElementById("telefone").value = medico.telefone;
  document.getElementById("datanasc").value = medico.data_nascimento;
  document.getElementById("endereco").value = medico.endereco;
  document.getElementById("especialidade").value = medico.especialidade;
}

document.getElementById("formConfiguracoes").addEventListener("submit", async function (e) {
  e.preventDefault();
  
  const nome = document.getElementById("nome").value;
  const crm = document.getElementById("crm").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const cpf = document.getElementById("cpf").value;
  const telefone = document.getElementById("telefone").value;
  const data_nascimento = document.getElementById("datanasc").value;
  const endereco = document.getElementById("endereco").value;
  const especialidade = document.getElementById("especialidade").value;

  try {
    const response = await fetch(`http://localhost:3000/medicos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: medico.id, crm, nome, email, senha, cpf, telefone, data_nascimento, endereco, especialidade  }),
    });

    const result = await response.json();
    console.log(response);

    if (response.ok) {
      alert("Informações atualizadas com sucesso!");
      sessionStorage.setItem("medico", JSON.stringify({ id: medico.id, crm, nome, email, senha, cpf, telefone, data_nascimento, endereco, especialidade }));
    } else {
      alert("Erro ao atualizar: " + result.message);
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao conectar ao servidor.");
  }
});

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#senha");
togglePassword.addEventListener("click", function (e) {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
});