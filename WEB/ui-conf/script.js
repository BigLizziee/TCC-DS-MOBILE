const usuario = JSON.parse(sessionStorage.getItem("usuario"));

if (!usuario) {
  window.location.href = "../login/index.html";
} else {
  document.getElementById("nome").value = usuario.nome;
  document.getElementById("email").value = usuario.email;
}

document.getElementById("formConfiguracoes").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("http://localhost:3000/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: usuario.id, nome, email, senha }),
    });

    const result = await response.json();
    console.log(response);

    if (response.ok) {
      alert("Informações atualizadas com sucesso!");
      sessionStorage.setItem("usuario", JSON.stringify({ id: usuario.id, nome, email, senha }));
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