const medico = JSON.parse(sessionStorage.getItem("medico"));

if (!medico) {
  window.location.href = "../login-med/index.html";
} else {
  document.getElementById("id").value = medico.id;
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
          document.getElementById('loginError').style.color = 'green';
          document.getElementById('loginError').textContent = 'Mensagem enviada com sucesso!';
          form.reset();
        } else {
          const error = await response.json();
          document.getElementById('loginError').style.color = 'red';
          document.getElementById('loginError').textContent = "Erro: " + (error.message || "Não foi possível criar a mensagem.");
        }
      } catch (error) {
        console.error("Erro ao enviar:", error);
        document.getElementById('loginError').style.color = 'red';
        document.getElementById('loginError').textContent = "Erro ao conectar com o servidor.";
      }
    });