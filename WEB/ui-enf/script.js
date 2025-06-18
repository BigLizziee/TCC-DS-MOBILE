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
        const id = document.getElementById('searchIdPac').value;
        const resultadoDiv = document.getElementById('resultadoBuscaPac');
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


async function buscarMedicoPorId() {
        const id = document.getElementById('searchIdMed').value;
        const resultadoDiv = document.getElementById('resultadoBuscaMed');
        resultadoDiv.innerHTML = '';

        if (!id) {
            resultadoDiv.innerHTML = '<span class="erro">Informe um ID válido.</span>';
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/medicos/${id}`);
            if (!response.ok) {
                resultadoDiv.innerHTML = '<span class="erro">Médico não encontrado.</span>';
                return;
            }
            const medico = await response.json();
            resultadoDiv.innerHTML = `
                <div class="info-card">
                    <p><strong>Nome:</strong> ${medico.nome || '-'}</p>
                    <p><strong>CRM:</strong> ${medico.crm || '-'}</p>
                    <p><strong>Email:</strong> ${medico.email || '-'}</p>
                    <p><strong>CPF:</strong> ${medico.cpf || '-'}</p>
                    <p><strong>Especialidade:</strong> ${medico.especialidade || '-'}</p>
                    <p><strong>Endereço:</strong> ${medico.endereco || '-'}</p>
                    <p><strong>Telefone:</strong> ${medico.telefone || '-'}</p>
                    <p><strong>Data de Nascimento:</strong> ${medico.data_nascimento ? new Date(medico.data_nascimento).toLocaleDateString() : '-'}</p>
                </div>
            `;
        } catch (err) {
            resultadoDiv.innerHTML = '<span class="erro">Erro ao buscar médico.</span>';
        }
}