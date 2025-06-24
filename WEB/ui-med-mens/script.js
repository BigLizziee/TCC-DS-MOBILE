const medico = JSON.parse(sessionStorage.getItem("medico"));

if (!medico) {
  window.location.href = "../login-med/index.html";
} else {
}  
   
   
const form = document.getElementById("mensagemForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("http://localhost:3000/mensmed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert("mensagem criada com sucesso!");
          form.reset();
        } else {
          const error = await response.json();
          alert("Erro: " + (error.message || "Não foi possível criar a mensagem."));
        }
      } catch (error) {
        console.error("Erro ao enviar:", error);
        alert("Erro ao conectar com o servidor.");
      }
    });