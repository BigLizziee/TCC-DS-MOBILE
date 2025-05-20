const usuario = JSON.parse(sessionStorage.getItem("usuario"));

if (!usuario) {
  window.location.href = "/WEB/login/index.html";
} else {
  document.getElementById("nome").value = usuario.nome;
  document.getElementById("email").value = usuario.email;
  document.getElementById("senha").value = usuario.senha;
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
