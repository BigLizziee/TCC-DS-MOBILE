const usuario = JSON.parse(sessionStorage.getItem("usuario"));
console.log(usuario);

if (!usuario) {
  window.location.href = "../login/index.html";
} else {
  document.getElementById("id").value = usuario.id;
  document.getElementById("nome").value = usuario.nome;
  document.getElementById("email").value = usuario.email;
  document.getElementById("senha").value = usuario.senha;
  document.getElementById("cpf").value = usuario.cpf;
  document.getElementById("datanasc").value = usuario.data_nascimento;
  document.getElementById("telefone").value = usuario.telefone;
  document.getElementById("endereco").value = usuario.endereco;
}

document.getElementById("formConfiguracoes").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const cpf = document.getElementById("cpf").value;
  const data_nascimento = document.getElementById("datanasc").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;

  try {
    const response = await fetch(`http://localhost:3000/pacientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: usuario.id, nome, email, senha, cpf, telefone, data_nascimento, endereco }),
    });

    const result = await response.json();
    console.log(response);

    if (response.ok) {
      alert("Informações atualizadas com sucesso!");
      sessionStorage.setItem("usuario", JSON.stringify({ id: usuario.id, nome, email, senha, cpf, telefone, data_nascimento, endereco }));
    } else {
      alert("Erro ao atualizar: " + result.message);
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao conectar ao servidor.");
  }
});

function deletar() {
  const id = usuario.id;
  if (!id || isNaN(Number(id))) {
    alert("ID inválido ou ausente");
    return;
  }

  fetch(`http://localhost:3000/pacientes/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Paciente excluído com sucesso") {
        alert("Conta excluída com sucesso!");
        sessionStorage.removeItem("usuario");
        window.location.href = "../home/index.html";
      } else {
        alert("Erro ao excluir conta: " + data.message);
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Erro ao conectar ao servidor.");
    });
}

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#senha");
togglePassword.addEventListener("click", function (e) {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
});