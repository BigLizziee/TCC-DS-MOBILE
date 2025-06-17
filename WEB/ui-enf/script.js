const enfermeiro = JSON.parse(sessionStorage.getItem("enfermeiro"));

if (!enfermeiro) {
  window.location.href = "../login-enf/index.html";
} else {
  document.getElementById("nome").textContent = enfermeiro.nome;
  document.getElementById("ecip").textContent = enfermeiro.ecip;
  document.getElementById("id").textContent = enfermeiro.id;
  document.getElementById("area").textContent = enfermeiro.area;
}

function logout() {
  sessionStorage.removeItem("enfermeiro");
  window.location.href = "../home/index.html";
}

async function buscarPacientePorId() {
        const id = document.getElementById('searchId').value;
        const resultadoDiv = document.getElementById('resultadoBusca');
        resultadoDiv.innerHTML = '';

        if (!id) {
            resultadoDiv.innerHTML = '<span class="erro">Informe um ID válido.</span>';
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/pacientes/${id}`);
            if (!response.ok) {
                resultadoDiv.innerHTML = '<span class="erro">Paciente não encontrado.</span>';
                return;
            }
            const paciente = await response.json();
            resultadoDiv.innerHTML = `
                <div class="info-card">
                    <p><strong>Nome:</strong> ${paciente.nome || '-'}</p>
                    <p><strong>Email:</strong> ${paciente.email || '-'}</p>
                    <p><strong>CPF:</strong> ${paciente.cpf || '-'}</p>
                    <p><strong>Telefone:</strong> ${paciente.telefone || '-'}</p>
                    <p><strong>Data de Nascimento:</strong> ${paciente.data_nascimento ? new Date(paciente.data_nascimento).toLocaleDateString() : '-'}</p>
                    <p><strong>Endereço:</strong> ${paciente.endereco || '-'}</p>
                </div>
            `;
        } catch (err) {
            resultadoDiv.innerHTML = '<span class="erro">Erro ao buscar paciente.</span>';
        }
}
