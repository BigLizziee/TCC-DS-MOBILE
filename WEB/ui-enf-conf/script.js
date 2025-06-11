const enfermeiro = JSON.parse(sessionStorage.getItem("enfermeiro"));
console.log(enfermeiro);

if (!enfermeiro) {
  window.location.href = "../login-enf/index.html";
} else {
  document.getElementById("ecip").value = enfermeiro.ecip;
  document.getElementById("id").value = enfermeiro.id;
  document.getElementById("nome").value = enfermeiro.nome;
  document.getElementById("senha").value = enfermeiro.senha;
  document.getElementById("area").value = enfermeiro.area;
  document.getElementById("email").value = enfermeiro.email;
}

document.getElementById("formConfiguracoes").addEventListener("submit", async function (e) {
  e.preventDefault();
  
  const nome = document.getElementById("nome").value;
  const area = document.getElementById("area").value;
  const ecip = document.getElementById("ecip").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("http://localhost:3000/updateenf", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: enfermeiro.id, ecip, nome, email, senha, area }),
    });

    const result = await response.json();
    console.log(response);

    if (response.ok) {
      alert("Informações atualizadas com sucesso!");
      sessionStorage.setItem("enfermeiro", JSON.stringify({ id: enfermeiro.id, ecip, nome, email, senha, area }));
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