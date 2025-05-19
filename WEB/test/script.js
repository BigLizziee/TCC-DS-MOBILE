const usuario = JSON.parse(sessionStorage.getItem("usuario"));

    if (!usuario) {
      window.location.href = "../login/index.html";
    } else {
      document.getElementById("nome").textContent = usuario.nome;
      document.getElementById("email").textContent = usuario.email;
    }
    function logout() {
      sessionStorage.removeItem("usuario");
      window.location.href = "../login/index.html";
    }