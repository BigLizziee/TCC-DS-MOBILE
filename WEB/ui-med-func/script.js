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
   
   
const form = document.getElementById("atestadoForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("http://localhost:3000/funcmed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert("Atestado criado com sucesso!");
          form.reset();
        } else {
          const error = await response.json();
          alert("Erro: " + (error.message || "Não foi possível criar o atestado."));
        }
      } catch (error) {
        console.error("Erro ao enviar:", error);
        alert("Erro ao conectar com o servidor.");
      }
    });